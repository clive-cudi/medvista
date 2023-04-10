import axios from "axios";
import { getSession } from "next-auth/react";

async function getToken() {
    return (await getSession())?.user.token ?? "";
}

export const api = axios.create({
    baseURL: `${process.env.BACKEND_URL}`,
    headers: {
        "Content-Type": "application/json"
    },
});