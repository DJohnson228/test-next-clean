// src/components/ProfileCard.jsx

import Image from "next/image";
import { UserCircle2, LogOut } from "lucide-react";

export default function ProfileCard({ user, onLogout }) {
  return (
    <div className="p-5 bg-white dark:bg-gray-900 border rounded-2xl shadow flex flex-col items-center gap-2 w-full max-w-xs">
      {user?.image ? (
        <Image
          src={user.image}
          alt={user.name || "User"}
          width={72}
          height={72}
          className="rounded-full border-2 border-cyan-200 dark:border-cyan-800"
        />
      ) : (
        <UserCircle2 className="w-20 h-20 text-cyan-300 dark:text-cyan-800" />
      )}
      <div className="text-lg font-bold text-cyan-900 dark:text-cyan-100 mt-2">
        {user?.name || "Anonymous"}
      </div>
      <div className="text-sm text-gray-500 dark:text-gray-300">{user?.email}</div>
      <button
        onClick={onLogout}
        className="mt-3 px-4 py-2 bg-cyan-700 hover:bg-cyan-900 text-white rounded-xl font-medium flex items-center gap-2 transition"
        type="button"
      >
        <LogOut className="w-5 h-5" /> Log out
      </button>
    </div>
  );
}

