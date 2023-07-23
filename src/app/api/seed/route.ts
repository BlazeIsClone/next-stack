import { NextResponse } from "next/server";
import { seedDatabase } from "~/database/seeder";

export async function GET() {
  let payload = {};

  try {
    await seedDatabase();
  } catch (error) {
    payload = { message: "Failed to seed the database." };

    throw new Error(`Failed to seed the database.`);
  }

  payload = { message: "Success seeding the database." };

  return NextResponse.json(payload);
}
