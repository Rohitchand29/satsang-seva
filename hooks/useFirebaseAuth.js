import { app } from "@/firebase-config";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";

export default function useFirebaseAuth() {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(null);
  const auth = getAuth(app);

  const authStateChanged = async (authState) => {
    if (!authState) {
      setAuthUser(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setAuthUser(authState);
    setLoading(false);
  }
  useEffect(() => {
    const auth = getAuth(app)
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user)
        // console.log(user)
      } else {
        setUser(null)
      }
    })
    return () => unsubscribe()
  }, []);

  return {
    authUser,
    loading
  }
}