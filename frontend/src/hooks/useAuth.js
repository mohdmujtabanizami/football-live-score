import { useEffect, useState } from "react";

import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import {
  auth,
  provider,
} from "../firebase";

export default function useAuth() {
  const [user, setUser] =
    useState(null);

  useEffect(() => {
    const unsubscribe =
      onAuthStateChanged(
        auth,
        (currentUser) => {
          setUser(currentUser);
        }
      );

    return () => unsubscribe();
  }, []);

  const handleLogin =
    async () => {
      try {
        await signInWithPopup(
          auth,
          provider
        );
      } catch (error) {
        console.log(error);
      }
    };

  const handleLogout =
    async () => {
      try {
        await signOut(auth);
      } catch (error) {
        console.log(error);
      }
    };

  return {
    user,
    handleLogin,
    handleLogout,
  };
}