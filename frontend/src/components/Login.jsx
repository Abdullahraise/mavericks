import { useState } from "react";
import { auth } from "../services/firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../services/firebase";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);

  const saveUserProfile = async (user) => {
    const ref = doc(db, "users", user.uid, "profile", "info");
    await setDoc(ref, {
      email: user.email,
      uid: user.uid,
      lastLogin: serverTimestamp(),
    });
  };

  const handleAuth = async () => {
    try {
      let userCred;
      if (isRegister) {
        userCred = await createUserWithEmailAndPassword(auth, email, password);
      } else {
        userCred = await signInWithEmailAndPassword(auth, email, password);
      }

      await saveUserProfile(userCred.user); // Save login info to Firestore
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4 text-center">
          {isRegister ? "Register" : "Login"}
        </h2>
        <input
          className="border p-2 w-full mb-2"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="border p-2 w-full mb-4"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white w-full p-2 rounded"
          onClick={handleAuth}
        >
          {isRegister ? "Register" : "Login"}
        </button>
        <p className="mt-4 text-sm text-center">
          {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            className="text-blue-600 underline"
            onClick={() => setIsRegister(!isRegister)}
          >
            {isRegister ? "Login" : "Register"}
          </button>
        </p>
      </div>
    </div>
  );
}
