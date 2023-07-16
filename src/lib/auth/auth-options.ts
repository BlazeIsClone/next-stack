import { type InferModel, eq } from "drizzle-orm";
import { DrizzleAdapter } from "./drizzle-adapter";
import type { NextAuthOptions } from "next-auth";
import { db } from "~/database";
import { users } from "~/database/schema";
import Credentials from "next-auth/providers/credentials";
import { env } from "~/env.mjs";
import { createId } from "@paralleldrive/cuid2";

export const authOptions: NextAuthOptions = {
  adapter: DrizzleAdapter(db),
  session: {
    strategy: "jwt",
  },
  secret: env.NEXTAUTH_SECRET,
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        name: {
          label: "Name",
          type: "text",
          placeholder: "john",
        },
        email: {
          label: "Email",
          type: "text",
          placeholder: "sandev123@gmail.com",
        },
        password: {
          label: "Password",
          type: "text",
        },
      },
      async authorize(credentials) {
        type User = InferModel<typeof users>;

        if (!credentials) return;

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
            email: credentials?.email,
            name: credentials?.name,
            password: credentials?.password,
          });

          const rows: User[] = await db
            .select()
            .from(users)
            .where(eq(users.email, credentials?.email))
            .limit(1);

          if (!rows[0]) return;

          return {
            id: rows[0]?.id,
            name: rows[0]?.name,
            email: rows[0]?.email,
            password: rows[0]?.password,
          };
        }
      },
    }),
  ],
};
