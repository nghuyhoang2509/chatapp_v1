import React from "react";
import { format } from "date-fns";

export default function Message({ type, text, sent_at }) {
  return (
    <div
      className={`flex-1 my-1 flex ${
        type == "user_send" ? "justify-end text-right" : "justify-start"
      }`}
    >
      <div
        className={`p-2 text-sm rounded-lg font-medium ${
          type == "user_send" ? "bg-blue-500 text-white " : "bg-white"
        } break-all max-w-[40%] w-fit`}
      >
        <span>{text}</span>
        <div className="mt-1 text-xs text-right opacity-60">
          {format(
            new Date(sent_at?.seconds ? sent_at.seconds * 1000 : 0),
            "dd/MM/yyyy hh:mm:ss aaaaa'm'"
          )}
        </div>
      </div>
    </div>
  );
}
