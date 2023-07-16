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
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        type User = InferModel<typeof users>;

        const user: User[] = await db
          .select()
          .from(users)
          .where(eq(users.email, credentials?.email))
          .limit(1);

        if (user.length) {
          return user[0];
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

          const row = rows[0];
          if (!row) throw new Error("User not found");
          return row;
        }
      },
    }),
  ],
};
