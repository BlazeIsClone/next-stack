import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

const connection = await mysql.createConnection({
  host: "localhost",
  user: "db_user",
  password: "db_password",
  database: "db",
});

export const db = drizzle(connection);
