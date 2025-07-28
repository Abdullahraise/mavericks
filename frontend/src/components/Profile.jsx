// src/components/Profile.jsx
import { auth } from "../services/firebase";

export default function Profile({ user }) {
  return (
    <div className="card">
      <h2 className="text-2xl font-semibold text-center mb-4">👤 Your Profile</h2>
      <div className="space-y-2">
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>User ID:</strong> {user.uid}</p>
        <button onClick={() => auth.signOut()} className="bg-red-600 hover:bg-red-700 mt-4">
          Logout
        </button>
      </div>
    </div>
  );
}
