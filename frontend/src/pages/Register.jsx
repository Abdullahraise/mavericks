import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebase";

export default function Register({ onSuccess }) {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const handleRegister = async (e) => {
e.preventDefault();
try {
await createUserWithEmailAndPassword(auth, email, password);
alert("Registered successfully");
onSuccess();
} catch (error) {
alert(error.message);
}
};

return (
<form onSubmit={handleRegister} className="space-y-4 p-4">
<h2 className="text-xl font-bold">Register</h2>
<input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} className="border p-2 w-full" />
<input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} className="border p-2 w-full" />
<button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Register</button>
</form>
);
}