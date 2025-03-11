import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import { mongooseConnection } from "@/lib/mongooseConnection";
import User from "@/models/User";
import bcrypt from "bcryptjs";

interface IUser {
    _id: string;
    email: string;
    firstName: string;
    password: string;
}

export const authOptions: NextAuthOptions = {
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
                    const user = await User.findOne({ email }) as IUser | null;;

                    if (!user) return null;

                    const pwdMatch = await bcrypt.compare(password, user.password);
                    if (!pwdMatch) return null;

                    return { id: user._id.toString(), email: user.email, name: user.firstName };
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
    secret: process.env.NEXTAUTH_SECRET,
    pages: { signIn: "/" },
};
