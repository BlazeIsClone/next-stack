import { db } from ".";
import { settings } from "./schema";

export const seedDatabase = async () => {
  return await db.insert(settings).values({
    key: "site_name",
    value: "Next Stack",
  });
};
