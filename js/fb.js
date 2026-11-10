// ربط Firebase (نسخة الويب من CDN، بدون أي تثبيت)
export { initializeApp, deleteApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
export {
  getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut,
  createUserWithEmailAndPassword, sendPasswordResetEmail, updatePassword
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
export {
  getFirestore, collection, doc, getDoc, getDocs, setDoc, updateDoc, deleteDoc,
  query, where, writeBatch, increment, deleteField, getCountFromServer
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
