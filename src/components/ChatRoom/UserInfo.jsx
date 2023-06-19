import { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import { auth, db } from "../../firebase";
import { signOut } from "firebase/auth";
import { LogoutOutlined, UserAddOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import UserCard from "./UserCard";
import { addDoc, collection } from "firebase/firestore";
export default function UserInfo() {
  const user = useContext(AuthContext);
  const [showAddConversation, setShowAddConversation] = useState(false);
  const [emailAddConversation, setEmailAddConversation] = useState("");
  const isUserExistConversation = () =>
    user.conversations.find(({ users }) => users[1] == emailAddConversation);
  const onAddConversation = async () => {
    try {
      if (emailAddConversation != user.email && !isUserExistConversation()) {
        await addDoc(collection(db, "conversations"), {
          users: [user.email, emailAddConversation],
        });
      } else {
        throw new Error("Email này là của bạn hoặc bạn đã add rồi");
      }
    } catch (error) {
      alert(error.message || "có lỗi");
    }
    setEmailAddConversation("");
    setShowAddConversation(false);
  };
  const navigate = useNavigate();
  return (
    <div className="border-b-4 border-slate_custom flex flex-row items-center ">
      {showAddConversation && (
        <div className="absolute shadow-lg bg-opacity-50 bg-white top-0 bottom-0 left-0 right-0 flex justify-center items-center">
          <div className="flex flex-col relative bg-white py-4 rounded-lg p-4">
            <span className="mr-12 mb-6 text-3xl font-semibold text-black">
              New Conversation
            </span>
            <span className="text-gray-700 mb-1">
              Please enter an email address for the user you wish to chat with{" "}
            </span>
            <label htmlFor="email" className="text-blue-600 font-medium">
              Email address
            </label>
            <input
              id="email"
              value={emailAddConversation}
              className="outline-none px-4 py-2 border-b-2 border-black focus:border-blue-600"
              type="email"
              placeholder="Type a email"
              onChange={(e) => setEmailAddConversation(e.target.value)}
            />
            <div className="mt-8 flex flex-row justify-end font-bold">
              <button
                onClick={() => {
                  setShowAddConversation(false);
                  setEmailAddConversation("");
                }}
                className="mr-8 text-blue-600"
              >
                CANCEL
              </button>
              <button
                onClick={onAddConversation}
                disabled={emailAddConversation.trim() ? false : true}
                className={`${
                  emailAddConversation.trim()
                    ? "text-blue-600"
                    : "text-gray-500"
                }`}
              >
                ADD
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="flex-1">
        <UserCard photoURL={user.photoURL} short />
      </div>
      <div className="flex flex-row justify-end items-center ">
        <span
          onClick={() => {
            signOut(auth);
            navigate("/login");
          }}
          className="cursor-pointer whitespace-nowrap text-4xl mx-4 text-blue-600 flex items-center "
        >
          <LogoutOutlined />
        </span>
        <span className="cursor-pointer whitespace-nowrap text-4xl mx-4 text-blue-600 flex items-center">
          <UserAddOutlined onClick={() => setShowAddConversation(true)} />
        </span>
      </div>
    </div>
  );
}
