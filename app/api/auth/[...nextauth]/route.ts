import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { mongooseConnection } from "@/lib/mongooseConnection";
import User from "@/models/User";
import bcrypt from "bcryptjs";

// Explicitly define User type
interface IUser {
    _id: string;
    email: string;
    firstName: string;
    password: string;
}

// Define the NextAuth configuration inside the handler
const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },

            async authorize(credentials) {
                const { email, password } = credentials as { email: string; password: string };

                try {
                    await mongooseConnection();
                    const user = await User.findOne({ email }) as IUser | null;

                    if (!user) {
                        return null;
                    }

                    const pwdMatch = await bcrypt.compare(password, user.password);

                    if (!pwdMatch) {
                        return null;
                    }

                    return {
                        id: user._id.toString(),
                        email: user.email,
                        firstName: user.firstName,
                    };
                } catch (error) {
                    console.error("Authorization error:", error);
                    return null;
                }
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.firstName = (user as any).firstName;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.name = token.firstName as string;
            }
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/",
    },
});

export { handler as GET, handler as POST };
