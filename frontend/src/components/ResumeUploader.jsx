import { useState } from "react";
import SkillChart from "./SkillChart";

export default function ResumeUploader() {
  const [files, setFiles] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };

  const handleUpload = async () => {
    if (files.length === 0) return alert("Please select files first!");
    setLoading(true);

    try {
    const profilesData = [];
for (const file of files) {
const text = await file.text();
const res = await fetch("https://mavericks-api-g8px.onrender.com/upload", {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({ resume: text }),
});
const data = await res.json();
profilesData.push({ filename: file.name, skills: data.skills });
}
setProfiles(profilesData);
    } catch (err) {
      alert("Upload failed, check console");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>Resume Upload</h2>
      <input type="file" multiple accept=".txt" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Uploading..." : "Upload"}
      </button>

      {profiles.length > 0 && (
        <div>
          <h3>Extracted Skills</h3>
          {profiles.map((p, idx) => (
            <div key={idx}>
              <p className="font-medium">{p.filename}</p>
              <ul>
                {p.skills.map((skill, i) => (
                  <li key={i}>{skill}</li>
                ))}
              </ul>
              <button
                onClick={() =>
                  setProfiles((prev) =>
                    prev.map((profile, profileIndex) =>
                      profileIndex === idx
                        ? {
                            ...profile,
                            skillScores: profile.skills.map((s) => ({
                              name: s,
                              score: Math.floor(Math.random() * 10) + 1,
                            })),
                          }
                        : profile
                    )
                  )
                }
              >
                Generate Skill Chart
              </button>
              {p.skillScores && <SkillChart skills={p.skillScores} />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
