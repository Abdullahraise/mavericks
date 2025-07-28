import { useState, useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import { useAuth } from "../hooks/useAuth";

const sampleQuestions = [
  {
    id: 1,
    question: "What is the output of 2 + '2' in JavaScript?",
    options: ["22", "4", "NaN", "Error"],
    answer: "22",
  },
  {
    id: 2,
    question: "Which keyword declares a constant in JavaScript?",
    options: ["let", "var", "const", "define"],
    answer: "const",
  },
  {
    id: 3,
    question: "What is the time complexity of Array.prototype.push()?",
    options: ["O(1)", "O(n)", "O(log n)", "O(n log n)"],
    answer: "O(1)",
  },
];

export default function AssessmentAgent() {
  const { user } = useAuth();
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(null);

  const handleChange = (questionId, value) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = async () => {
    let points = 0;
    sampleQuestions.forEach((q) => {
      if (answers[q.id] === q.answer) points++;
    });
    const percent = Math.round((points / sampleQuestions.length) * 100);
    setScore(percent);
    setSubmitted(true);

    const userRef = doc(db, "users", user.uid);
    await setDoc(userRef, {
      assessment: {
        score: percent,
        completedAt: new Date().toISOString(),
      },
    }, { merge: true });
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">🧠 Skill Assessment</h2>
      {!submitted ? (
        <div className="space-y-6">
          {sampleQuestions.map((q) => (
            <div key={q.id}>
              <p className="font-semibold">{q.question}</p>
              <div className="space-y-1 mt-1">
                {q.options.map((opt) => (
                  <label key={opt} className="block">
                    <input
                      type="radio"
                      name={`q-${q.id}`}
                      value={opt}
                      onChange={(e) => handleChange(q.id, e.target.value)}
                      className="mr-2"
                    />
                    {opt}
                  </label>
                ))}
              </div>
            </div>
          ))}
          <button
            onClick={handleSubmit}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Submit Assessment
          </button>
        </div>
      ) : (
        <div>
          <p className="text-lg font-semibold">✅ Assessment Completed</p>
          <p className="text-green-600 mt-2">Your Score: {score}%</p>
        </div>
      )}
    </div>
  );
}