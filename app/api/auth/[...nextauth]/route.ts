import { mongooseConnection } from "@/lib/mongooseConnection";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Explicitly define User type
interface IUser {
    _id: string;
    email: string;
    firstName: string;
    password: string;
}

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {},

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
                        id: user._id.toString(), // Ensure _id is converted to string
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
                token.firstName = (user as any).firstName; // Ensure firstName is stored in JWT
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.name = token.firstName as string; // Ensure firstName is attached
            }
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/",
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
