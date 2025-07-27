# backend/ai/utils.py
import re
from typing import List

# ① Your curated skill set
SKILL_SET = {
    "python", "java", "javascript", "react", "node.js",
    "flask", "django", "sql", "aws", "docker"
}

# ② Rule‑based extractor (fallback)
def extract_skills_rule_based(text: str) -> List[str]:
    text_lower = text.lower()
    found = {skill for skill in SKILL_SET if re.search(rf"\b{re.escape(skill)}\b", text_lower)}
    return list(found)

# ③ GenAI wrapper with fallback
async def extract_skills(text: str, openai_client) -> List[str]:
    try:
        resp = await openai_client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "system", "content": "Extract a JSON array of skills from this text."},
                      {"role": "user", "content": text}],
            temperature=0
        )
        content = resp.choices[0].message.content
        # Expect JSON array: ["Python","Flask",…]
        skills = eval(content) if content.startswith("[") else []
        return skills
    except Exception:
        return extract_skills_rule_based(text)
