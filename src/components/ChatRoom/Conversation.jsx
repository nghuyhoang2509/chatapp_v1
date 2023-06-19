import { useEffect, useState, useContext } from "react";
import UserCard from "./UserCard";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { ChatContext } from ".";

export default function Conversation({ conversation }) {
  const [userToChat, setUserToChat] = useContext(ChatContext);
  const navigate = useNavigate();
  const [infoUser, setInfoUser] = useState({});
  const queryUser = query(
    collection(db, "users"),
    where("email", "==", conversation.users)
  );
  async function fetchData() {
    try {
      const snapshot = await getDocs(queryUser);
      snapshot.forEach((doc) => setInfoUser(doc.data()));
    } catch {}
  }
  let callApi = true;
  useEffect(() => {
    if (callApi) {
      fetchData();
    }
    return () => {
      callApi = false;
    };
  }, []);

  return (
    <span
      onClick={() => {
        setUserToChat({ ...infoUser, email: conversation.users });
        navigate(`/${conversation._id}`);
      }}
    >
      <UserCard
        displayName={infoUser?.displayName || ""}
        email={conversation.users}
        photoURL={infoUser?.photoURL || ""}
        details={infoUser?.lastSeen || ""}
      />
    </span>
  );
}
