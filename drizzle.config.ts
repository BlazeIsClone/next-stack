import type { Config } from "drizzle-kit";

export default {
  schema: "./src/database/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    host: "localhost",
    user: "db_user",
    password: "db_password",
    database: "db",
    port: 3306,
  },
  breakpoints: false,
  driver: "mysql2",
} satisfies Config;
