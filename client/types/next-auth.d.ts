import { Api_User_res } from ".";
import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: User
  }

  interface User {
    user: Api_User_res,
    token: string,
    name: string,
    id: number,
    usertype: "doctor" | "patient",
    [key: string]: any
  }
}

declare module "next-auth/jwt" {
    interface JWT {
        name: string,
        email: string,
        usertype: "doctor" | "patient"
        id: number,
        token: string
    }
}