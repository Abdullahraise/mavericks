// src/components/LearningPathTable.jsx
import { useEffect, useState } from "react";
import { getUserLearningPath, saveUserLearningPath } from "../services/firestoreService";
import { auth } from "../services/firebase";

export default function LearningPathTable() {
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);

  const uid = auth.currentUser?.uid;

  useEffect(() => {
    const fetchModules = async () => {
      if (!uid) return;
      const userModules = await getUserLearningPath(uid);
      setModules(userModules || []);
      setLoading(false);
    };

    fetchModules();
  }, [uid]);

  const handleMarkDone = async (index) => {
    const updated = [...modules];
    updated[index].status = "done";
    setModules(updated);
    await saveUserLearningPath(uid, updated);
  };

  if (loading) return <p className="text-center mt-6">Loading learning path...</p>;

  if (modules.length === 0)
    return <p className="text-center mt-6">No modules assigned yet. 🚧</p>;

  return (
    <div className="mt-6 max-w-3xl mx-auto bg-white rounded shadow p-4">
      <h3 className="text-xl font-semibold mb-4">📚 Your Learning Modules</h3>
      <table className="w-full table-auto border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left">Module</th>
            <th className="p-2 text-left">Status</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {modules.map((mod, i) => (
            <tr key={i} className="border-t">
              <td className="p-2">{mod.name}</td>
              <td className="p-2 capitalize">{mod.status || "pending"}</td>
              <td className="p-2 text-center">
                {mod.status !== "done" && (
                  <button
                    onClick={() => handleMarkDone(i)}
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                  >
                    Mark as Done
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
