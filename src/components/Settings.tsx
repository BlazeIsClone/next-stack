"use client";

import { env } from "~/env.mjs";
import { Health } from "~/http/resources/health";

export default async function Settings() {
  const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/api`);

  const data = Health.parse(await response.json());

  return (
    <div>
      <h3 className="text-sm tracking-tight text-white sm:text-[2rem]">
        {data.key}: {data.value}
      </h3>
    </div>
  );
}
