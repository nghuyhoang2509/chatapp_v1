import { useState, useContext } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import Conversation from "./Conversation";
export default function ConversationList() {
  const user = useContext(AuthContext);
  const [conversations] = useState(user.conversations);
  return (
    <div className="flex flex-col ">
      {conversations.map((conversation) => (
        <span
          key={conversation._id}
          className="border-b border-slate_custom cursor-pointer hover:bg-slate_custom transition-all ease-linear"
        >
          <Conversation conversation={conversation} />
        </span>
      ))}
    </div>
  );
}
