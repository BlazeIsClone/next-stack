import { type InferModel, eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { type z } from "zod";
import { db } from "~/database";
import { settings } from "~/database/schema";
import { type Health } from "~/http/resources/health";

export async function GET() {
  type ApiRequest = z.infer<typeof Health>;

  type Setting = InferModel<typeof settings>;
  const setting: Setting[] = await db
    .select()
    .from(settings)
    .where(eq(settings.key, "site_name"));

  const payload: ApiRequest = {
    key: setting[0]?.key ?? "error",
    value: setting[0]?.value ?? "error",
  };

  return NextResponse.json(payload);
}
