// src/components/SkillAssessment.jsx
import { useState } from "react";

const mockAssessments = {
  Python: ["OOP Basics", "Data Structures", "File Handling"],
  JavaScript: ["DOM Manipulation", "Async/Await", "ES6 Basics"],
  Java: ["Collections", "OOP", "Multithreading"],
};

export default function SkillAssessment({ skills }) {
  const [completed, setCompleted] = useState([]);

  if (!skills?.length) return null;

  const handleComplete = (skill, topic) => {
    setCompleted([...completed, `${skill}-${topic}`]);
  };

  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-2 text-center">📊 Skill-Based Assessments</h2>
      {skills.map((skill, idx) => (
        <div key={idx} className="mb-4">
          <h3 className="font-bold">{skill}</h3>
          <ul className="list-disc list-inside">
            {(mockAssessments[skill] || ["Basics"]).map((topic) => (
              <li key={topic} className="flex justify-between items-center">
                <span>{topic}</span>
                <button
                  onClick={() => handleComplete(skill, topic)}
                  disabled={completed.includes(`${skill}-${topic}`)}
                >
                  {completed.includes(`${skill}-${topic}`) ? "✅ Done" : "Take Test"}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
