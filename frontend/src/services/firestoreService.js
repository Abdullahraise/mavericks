// src/services/firestoreService.js

import { db } from "./firebase";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  arrayUnion
} from "firebase/firestore";

// ✅ Fetch all users with their UID and data
export async function getAllUsers() {
  const usersRef = collection(db, "users");
  const snapshot = await getDocs(usersRef);
  return snapshot.docs.map(doc => ({ uid: doc.id, ...doc.data() }));
}

// ✅ Get the role of a specific user
export async function getUserRole(uid) {
  const userRef = doc(db, "users", uid);
  const docSnap = await getDoc(userRef);
  return docSnap.exists() ? docSnap.data().role : null;
}

// ✅ Get the learning path of a user
export async function getUserLearningPath(uid) {
  const userRef = doc(db, "users", uid);
  const docSnap = await getDoc(userRef);
  return docSnap.exists() ? docSnap.data().learningPath : [];
}

// ✅ Save the complete learning path
export async function saveUserLearningPath(uid, path) {
  const userRef = doc(db, "users", uid);
  await updateDoc(userRef, { learningPath: path });
}

// ✅ Add a new module to the learning path (non-duplicate)
export async function addModuleToUser(uid, module) {
  const userRef = doc(db, "users", uid);
  await updateDoc(userRef, {
    learningPath: arrayUnion(module)
  });
}
