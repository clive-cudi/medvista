import axios, { AxiosResponse } from "axios";
import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";
import { Api_User_res, API_res_model } from "@/types";
import { User } from "next-auth";

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
                console.log(credentials);
                
                const login_response: AxiosResponse<API_res_model> = await axios.post(`${process.env.BACKEND_URL}/auth/login`, {...credentials});

                if (login_response.data.success === true) {
                    const user: User = {
                        user: login_response.data.usertoken?.user as Api_User_res,
                        token: login_response.data.usertoken?.token as string,
                        name: login_response.data.usertoken?.user?.name as string,
                        id: login_response.data.usertoken?.user?.id as number,
                        usertype: login_response.data.usertoken?.user?.usertype as "doctor" | "patient"
                    }

                    return user;
                }

                if (login_response.data.success === false) {
                    console.log(login_response.data.error);
                    throw new Error(JSON.stringify({...login_response.data?.error, message: login_response.data.message}))
                }

                return null;
            }
        })
    ],
    callbacks: {
        async jwt({token, user}) {
            if (user) {
                console.log(user);
                token = {
                    ...token,
                    name: user.user.name,
                    email: user.user.email,
                    usertype: user.user.usertype,
                    id: user.user.id,
                    token: user.token
                }
            }

            return token
        },
        async session({session, token, user}) {
            console.log(token)
            Object.keys(token).forEach(key => {
                session.user[key] = token[key];
            });

            return session;
        },
    },
    pages: {
        signIn: "/login"
    },
    secret: `${process.env.NEXTAUTH_SECRET} ?? "gycw$ytgf.c9weyfius$dgugew"`
})