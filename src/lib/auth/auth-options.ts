import { type InferModel, eq } from 'drizzle-orm';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import type { AuthOptions } from 'next-auth';
import { db } from '~/database';
import { users } from '~/database/schema';
import Credentials from 'next-auth/providers/credentials';
import { env } from '~/utils/env.mjs';
import { createId } from '@paralleldrive/cuid2';

export const authOptions: AuthOptions = {
  adapter: DrizzleAdapter(db),
  session: {
    strategy: 'jwt',
  },
  secret: env.NEXTAUTH_SECRET,
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        name: { label: 'Name', type: 'text' },
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        type User = InferModel<typeof users>;

        if (!credentials) return null;

        const user: User[] = await db
          .select()
          .from(users)
          .where(eq(users.email, credentials?.email))
          .limit(1);

        if (user[0]) {
          return {
            id: user[0].id,
            name: user[0].name,
            email: user[0].email,
          };
        } else {
          await db.insert(users).values({
            id: createId(),
            name: credentials.name,
            email: credentials.email,
          });

          const rows: User[] = await db
            .select()
            .from(users)
            .where(eq(users.email, credentials?.email))
            .limit(1);

          if (!rows[0]) return null;

          return {
            id: rows[0].id,
            name: rows[0].name,
            email: rows[0].email,
          };
        }
      },
    }),
  ],
};
