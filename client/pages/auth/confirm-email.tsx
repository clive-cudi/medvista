import { useEffect } from "react";
import { Header, PageWrapper } from "@/components";
import { useRouter } from "next/router";
import axios from "axios";

export default function ConfirmEmail() {
    const router = useRouter();

    // get email from query
    const { email } = router.query;

    useEffect(() => {
        if (email) {
            // send email to backend
            axios.post(`${process.env.BACKEND_URL}/auth/confirm-email`, {
                email
            }).then((res) => {
                console.log(res);
            }).catch((err) => {
                console.log(err);
            })
        }
    }, [email]);


    return (
        <>
            <Header title={"MedVista | Confirm Email"} />
            <PageWrapper>
                <h1>Confirm Email</h1>
                <p>Check your inbox at {email} for confirmation link</p>
            </PageWrapper>
        </>
    )
}