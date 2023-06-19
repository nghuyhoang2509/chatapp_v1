import UserInfo from "./UserInfo";
import ConversationList from "./ConversationList";

export default function Sidebar() {
  return (
    <div className="w-full flex flex-col h-full border-r-slate_custom border-r-4">
      <div>
        <UserInfo />
      </div>
      <div className="flex-1 overflow-y-auto hide-scrollbar">
        <ConversationList />
      </div>
    </div>
  );
}
