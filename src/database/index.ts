import { drizzle } from 'drizzle-orm/mysql2';
import { createConnection } from 'mysql2/promise';
import { env } from '~/utils/env.mjs';

let connection;

try {
  connection = await createConnection({
    host: env.MYSQL_HOST,
    user: env.MYSQL_USER,
    password: env.MYSQL_PASSWORD,
    database: env.MYSQL_DATABASE,
  });
} catch (error) {
  throw new Error(`Failed to establish a database connection.`);
}

export const db = drizzle(connection);
