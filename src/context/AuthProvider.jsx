import React, { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendEmailVerification,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import { AuthContext } from "./AuthContext";

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const createUserWithEmailAndPasswordFunc = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const updateProfileFunc = (displayName, photoURL) => {
    return updateProfile(auth.currentUser, { displayName, photoURL });
  };

  const sendEmailVerificationFunc = () =>
    sendEmailVerification(auth.currentUser);
  const signInWithEmailAndPasswordFunc = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);
  const signInWithGoogleFunc = () => signInWithPopup(auth, googleProvider);
  const signInWithGithubFunc = () => signInWithPopup(auth, githubProvider);
  const signOutFunc = () => signOut(auth);
  const sendPassResetEmailFunc = (email) => sendPasswordResetEmail(auth, email);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        setLoading,
        createUserWithEmailAndPasswordFunc,
        updateProfileFunc,
        sendEmailVerificationFunc,
        signInWithEmailAndPasswordFunc,
        signInWithGoogleFunc,
        signInWithGithubFunc,
        signOutFunc,
        sendPassResetEmailFunc,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
