"use client";

import { signOut } from "next-auth/react";

export const SignOut = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <button
        className="rounded-full border-2  border-solid border-red-500 bg-white/10 px-10 py-3 font-semibold text-red-500 no-underline transition hover:bg-red-950"
        onClick={() => void signOut()}
      >
        Sign Out
      </button>
    </div>
  );
};
