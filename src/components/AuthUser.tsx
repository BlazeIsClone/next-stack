"use client";

import { useSession } from "next-auth/react";

export default function AuthUser() {
  const session = useSession();

  return (
    <div>
      <h3 className="text-sm tracking-tight text-white sm:text-[2rem]">
        {session.status === "authenticated" ? (
          <>User: {session.data.user?.name}</>
        ) : (
          <>{session.status}</>
        )}
      </h3>
    </div>
  );
}
