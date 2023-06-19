import React, { useEffect, useState, useContext } from "react";
import UserCard from "./UserCard";
import { ArrowLeftOutlined, SendOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import {
  collection,
  orderBy,
  query,
  where,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firebase";
import { AuthContext } from "../../Context/AuthProvider";
import { ChatContext } from ".";
import Message from "./Message";

export default function ChatWindow() {
  const user = useContext(AuthContext);
  const [userToChat, setUserToChat] = useContext(ChatContext);
  const [messages, setMessages] = useState([]);
  const [sendMessage, setSendMessage] = useState("");
  const params = useParams();
  const queryMessage = query(
    collection(db, "messages"),
    where("conversation_id", "==", params?.id ?? ""),
    orderBy("conversation_id"),
    orderBy("sent_at", "asc")
  );
  function onSendMessage() {
    if (!sendMessage?.trim()) {
      return alert("Không được để trống nôi dung");
    }
    addDoc(collection(db, "messages"), {
      conversation_id: params.id,
      text: sendMessage,
      user_send: user.email,
      sent_at: serverTimestamp(),
    });
    setSendMessage("");
  }
  useEffect(() => {
    setMessages([]);
    const unsub = onSnapshot(queryMessage, (querySnapShot) => {
      let messages = [];
      querySnapShot.forEach((doc) => messages.push(doc.data()));
      setMessages(messages);
    });

    return () => {
      unsub();
    };
  }, [params]);
  return (
    <div className="flex flex-col h-full">
      <div className="w-full border-b-2 border-slate_custom flex flex-row items-center">
        <p
          onClick={() => setUserToChat("")}
          className="hidden cursor-pointer ml-5 max-lg:flex"
        >
          <ArrowLeftOutlined className="text-4xl" />
        </p>
        <UserCard
          displayName={userToChat?.displayName || ""}
          email={userToChat?.email}
          photoURL={userToChat?.photoURL || ""}
          details={userToChat?.lastSeen || ""}
        />
      </div>
      <div className="flex-1 bg-slate_custom h-full w-full overflow-y-auto hide-scrollbar">
        <div className="w-full flex-col p-4">
          {messages.map((message, index) => (
            <span key={index}>
              <Message
                type={user.email == message.user_send && "user_send"}
                text={message.text}
                sent_at={message.sent_at}
              />
            </span>
          ))}
        </div>
      </div>
      <div className="flex flex-row p-6">
        <input
          disabled={!params?.id}
          type="text"
          value={sendMessage}
          onChange={(e) => setSendMessage(e.target.value)}
          placeholder="Type a message"
          className="flex-1 h-14 px-4 bg-slate_custom rounded-lg outline-none focus:border-2"
        />
        <span
          onClick={() => onSendMessage()}
          className="ml-8 flex items-center"
        >
          <SendOutlined className="text-3xl text-gray-700 cursor-pointer" />
        </span>
      </div>
    </div>
  );
}
