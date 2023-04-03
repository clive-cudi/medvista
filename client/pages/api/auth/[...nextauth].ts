import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";

export default NextAuth({
    // Configure one or more authentication providers
    providers: [
        Credentials({
            id: "credentials_id_password",
            name: "Credentials",
            credentials: {
                id: {
                    label: "id",
                    type: "text",
                    placeholder: "Enter ID no."
                },
                password: {
                    label: "password",
                    type: "password",
                    placeholder: "Enter Password"
                }
            },
            async authorize(credentials) {
                // handle login

                return null;
            }
        })
    ],
    callbacks: {
        async jwt({token}) {
            return token
        },
        async session({session}) {
            return session
        },
    },
    pages: {
        signIn: "/login"
    },
    secret: `${process.env.NEXTAUTH_SECRET} ?? "gycw$ytgf.c9weyfius$dgugew"`
})