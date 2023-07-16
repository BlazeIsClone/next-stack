"use client";

import { signIn } from "next-auth/react";

export const SignIn = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <button
        className="rounded-full border-2 border-solid border-blue-500 bg-white/10 px-10 py-3 font-semibold text-blue-500 no-underline transition hover:bg-white/20"
        onClick={() => void signIn()}
      >
        Sign In
      </button>
    </div>
  );
};
