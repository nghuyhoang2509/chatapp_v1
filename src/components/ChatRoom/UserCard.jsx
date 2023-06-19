import React from "react";
import { format } from "date-fns";

export default function UserCard({
  displayName,
  email,
  photoURL,
  details,
  short,
}) {
  return (
    <div className="p-8 flex flex-row items-center">
      <div className="w-16 flex h-16 bg-gray-600 rounded-full mr-4">
        {photoURL ? (
          <img className="rounded-full min-w-16" src={photoURL} alt="" />
        ) : (
          <span className="font-medium min-w-full w-16 h-16 text-white text-2xl flex justify-center items-center flex-1">
            {email && email[0].toUpperCase()}
          </span>
        )}
      </div>
      <span className={`${short && "invisible"} flex flex-col break-all`}>
        <span className="flex-1 text-2xl font-medium break-all">
          {displayName || email || "undefined"}
        </span>
        <span className="mt-2 font-medium break-all text-gray-500">
          {details
            ? format(
                new Date(details?.seconds ? details.seconds * 1000 : 0),
                "dd/MM/yyyy hh:mm:ss aaaaa'm'"
              )
            : "No active"}
        </span>
      </span>
    </div>
  );
}
