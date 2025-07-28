import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

export default function SkillChart({ skills }) {
  if (!Array.isArray(skills) || skills.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-4">
        No skills to display.
      </div>
    );
  }

  const data = skills.map((skill) => ({
    subject: skill.name,
    A: skill.score,
    fullMark: 10,
  }));

  return (
    <div className="bg-white p-6 rounded-xl shadow-md mt-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Skill Assessment</h2>
      <div style={{ width: "100%", height: 400 }}>
        <ResponsiveContainer>
          <RadarChart data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis angle={30} domain={[0, 10]} />
            <Radar
              name="Score"
              dataKey="A"
              stroke="#2563eb"
              fill="#2563eb"
              fillOpacity={0.6}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
