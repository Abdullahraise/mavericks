import { useState } from "react";
import SkillChart from "./SkillChart";
import SkillAssessment from "./SkillAssessment";
import LearningPathTable from "./LearningPathTable";

export default function ResumeUploader() {
  const [files, setFiles] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [weakSkills, setWeakSkills] = useState([]);

  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
    setProfiles([]);
    setWeakSkills([]);
  };

  const handleUpload = async () => {
    if (files.length === 0) return alert("Please select files first!");
    setLoading(true);

    try {
      const profilesData = [];

      for (const file of files) {
        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("https://mavericks-api-g8px.onrender.com/upload", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();
        const safeSkills = Array.isArray(data.skills) ? data.skills : [];
        profilesData.push({ filename: file.name, skills: safeSkills });
      }

      setProfiles(profilesData);
    } catch (err) {
      alert("Upload failed, check console");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const generateChart = (idx) => {
    setProfiles((prev) =>
      prev.map((p, i) => {
        if (i !== idx) return p;

        const baseSkills = Array.isArray(p.skills) ? p.skills : [];

        const scored = baseSkills.map((skill) => ({
          name: skill,
          score: Math.floor(Math.random() * 10) + 1,
        }));

        const weak = scored.filter((s) => s.score <= 5).map((s) => s.name);
        setWeakSkills(weak);

        return { ...p, skillScores: scored };
      })
    );
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg max-w-3xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4 text-center">Resume Upload</h2>

      <input
        type="file"
        multiple
        accept=".pdf,.doc,.docx,.txt"
        onChange={handleFileChange}
        className="mb-4 w-full"
      />

      <button
        onClick={handleUpload}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
      >
        {loading ? "Uploading..." : "Upload & Extract Skills"}
      </button>

      {profiles.length > 0 && (
        <div className="mt-6 space-y-6">
          <h3 className="text-xl font-semibold mb-2">Extracted Profiles</h3>
          {profiles.map((p, idx) => (
            <div
              key={idx}
              className="border border-gray-200 p-4 rounded-lg shadow-sm bg-gray-50"
            >
              <p className="font-medium mb-2">📄 {p.filename}</p>

              <ul className="list-disc list-inside mb-2">
                {Array.isArray(p.skills) &&
                  p.skills.map((skill, i) => <li key={i}>{skill}</li>)}
              </ul>

              {!p.skillScores && (
                <button
                  onClick={() => generateChart(idx)}
                  className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                >
                  Generate Skill Chart
                </button>
              )}

              {p.skillScores && (
                <>
                  <SkillChart skills={p.skillScores} />
                  <SkillAssessment skills={p.skills} />
                </>
              )}
            </div>
          ))}
        </div>
      )}

      {weakSkills.length > 0 && (
        <LearningPathTable weakSkills={weakSkills} />
      )}
    </div>
  );
}
