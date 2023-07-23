import type { Config } from "drizzle-kit";
import { env } from "~/env.mjs";

export default {
  schema: "./src/database/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    connectionString: `mysql://${env.MYSQL_USER}:${env.MYSQL_PASSWORD}@${env.MYSQL_HOST}/${env.MYSQL_DATABASE}?ssl={"rejectUnauthorized":true}`,
  },
  breakpoints: false,
  driver: "mysql2",
} satisfies Config;
