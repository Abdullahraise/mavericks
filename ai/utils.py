import re
import json
from typing import List

SKILL_SET = {
    "python", "java", "javascript", "react", "node.js",
    "flask", "django", "sql", "aws", "docker"
}

def extract_skills_rule_based(text: str) -> List[str]:
    text_lower = text.lower()
    found = {skill for skill in SKILL_SET if re.search(rf"\b{re.escape(skill)}\b", text_lower)}
    return list(found)

async def extract_skills(text: str, openai_client) -> List[str]:
    try:
        resp = await openai_client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a skill extraction assistant. Only return a JSON array of skill names."},
                {"role": "user", "content": f"Extract a list of programming, data, and tech-related skills from this resume:\n\n{text}"}
            ],
            temperature=0
        )
        raw = resp.choices[0].message.content
        print("🔍 GPT Raw Output:", raw)

        # Extract first JSON array found in the response
        start = raw.find("[")
        end = raw.rfind("]") + 1
        json_chunk = raw[start:end]

        skills = json.loads(json_chunk)
        return skills if isinstance(skills, list) else []
    except Exception as e:
        print("⚠️ Falling back to rule-based. Reason:", str(e))
        return extract_skills_rule_based(text)
