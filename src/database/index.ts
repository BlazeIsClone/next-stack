import { drizzle } from "drizzle-orm/planetscale-serverless";
import { connect } from "@planetscale/database";
import { env } from "~/env.mjs";

let connection;

try {
  connection = connect({
    host: env.MYSQL_HOST,
    username: env.MYSQL_USER,
    password: env.MYSQL_PASSWORD,
  });
} catch (error) {
  throw new Error(`Failed to establish a database connection.`);
}

export const db = drizzle(connection);
