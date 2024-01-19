import { useState, useEffect } from "react";
import { FIREBASE_AUTH } from "../../FirebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

export const useFirebaseAuth = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const signUp = (email, password) => {
    return createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
  };

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
  };

  const signOutUser = () => {
    return signOut(FIREBASE_AUTH);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return {
    setCurrentUser,
    currentUser,
    loading,
    signUp,
    signIn,
    signOutUser,
  };
};
