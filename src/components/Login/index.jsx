import React from "react";
import { auth } from "../../firebase";
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { FacebookOutlined, GoogleOutlined } from "@ant-design/icons";
const fbProvider = new FacebookAuthProvider();
const ggProvider = new GoogleAuthProvider();

export default function Login() {
  const handleLoginWithFb = () => {
    signInWithPopup(auth, fbProvider);
  };
  const handleLoginWithGg = () => {
    signInWithPopup(auth, ggProvider);
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="flex flex-col items-center">
        <span className="text-4xl font-bold mb-16">Chat App</span>
        <button
          className="bg-red-600 text-white font-normal text-2xl py-4 px-2 rounded-lg w-full mb-8 flex items-center"
          onClick={handleLoginWithGg}
        >
          <GoogleOutlined />
          <span className="ml-4">Đăng nhập bằng Google</span>
        </button>
        {/* <button
          className="bg-blue-600 text-white text-4xl font-normal py-6 px-4 rounded-lg w-full flex items-center"
          onClick={handleLoginWithFb}
        >
          <FacebookOutlined />
          <span className="ml-4">Đăng nhập bằng Facebook</span>
        </button> */}
      </div>
    </div>
  );
}
