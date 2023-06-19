import { useEffect, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { db } from "../firebase";
import {
  setDoc,
  doc,
  serverTimestamp,
  query,
  collection,
  getDocs,
  where,
} from "firebase/firestore";
import { checkUserIsAnother } from "../utils/checkUserIsAnother";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const { displayName, email, photoURL, uid } = user;
        let conversations = [];
        try {
          await setDoc(
            doc(db, "users", user?.email),
            {
              email,
              lastSeen: serverTimestamp(),
              photoURL,
              displayName,
            },
            { merge: true }
          );
          const queryGetConversationCurrentUser = query(
            collection(db, "conversations"),
            where("users", "array-contains", user.email)
          );
          const querySnapshot = await getDocs(queryGetConversationCurrentUser);
          querySnapshot.forEach((doc) => {
            let result = doc.data();
            conversations.unshift({
              ...result,
              _id: doc.id,
              users: checkUserIsAnother(user.email, result.users),
            });
          });
        } catch (error) {
          alert(error.message);
        }
        setUser({ displayName, email, photoURL, uid, conversations });
        navigate("/");
      }
      setIsLoading(false);
    });
    navigate("/login");

    return () => unsub();
  }, []);

  return (
    <AuthContext.Provider value={user}>
      {isLoading ? (
        <div className="w-full flex h-full justify-center items-center">
          <h2 className="text-6xl font-bold">loading...</h2>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}
