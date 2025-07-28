import React, { useEffect, useState } from "react";
import { getAllUsers } from "../services/firestoreService";
import { Card, CardContent } from "@/components/ui/card";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getAllUsers();
      setUsers(data);
    }
    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome Admin 👨‍💻</h1>

      {users.length === 0 ? (
        <p>Loading user data...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {users.map((user) => (
            <Card key={user.uid} className="rounded-2xl shadow-md">
              <CardContent className="p-4">
                <h2 className="text-lg font-semibold mb-2">UID: {user.uid}</h2>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Role:</strong> {user.role || "N/A"}
                </p>
                <p className="text-sm text-gray-600 mb-3">
                  <strong>Modules:</strong>{" "}
                  {user.learningPath && user.learningPath.length > 0
                    ? user.learningPath.join(", ")
                    : "None"}
                </p>

                {/* Simple Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-blue-600 h-3 rounded-full"
                    style={{
                      width: `${
                        (user.learningPath?.length || 0) * 20 > 100
                          ? 100
                          : (user.learningPath?.length || 0) * 20
                      }%`,
                    }}
                  ></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
