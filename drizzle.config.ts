import type { Config } from 'drizzle-kit';
import { env } from '~/utils/env.mjs';

export default {
  schema: './src/database/schema.ts',
  out: './src/database/migrations',
  dbCredentials: {
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'nextjs',
    port: 3306,
  },
  breakpoints: false,
  driver: 'mysql2',
} satisfies Config;
