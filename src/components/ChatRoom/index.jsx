import { useState, createContext } from "react";
import Sidebar from "./Sidebar";
import ChatWindow from "./ChatWindow";

export const ChatContext = createContext();
export default function ChatRoom() {
  const [userToChat, setUserToChat] = useState();
  return (
    <ChatContext.Provider value={[userToChat, setUserToChat]}>
      <div className="flex w-full h-full flex-row">
        <div
          className={`w-3/12 max-lg:w-full ${userToChat && "max-lg:hidden"}`}
        >
          <Sidebar />
        </div>
        <div className={`flex-1 ${!userToChat && "max-lg:hidden"} `}>
          <ChatWindow />
        </div>
      </div>
    </ChatContext.Provider>
  );
}
