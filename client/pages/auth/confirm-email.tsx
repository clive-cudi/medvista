import { useEffect } from "react";
import { Header, PageWrapper } from "@/components";
import { useRouter } from "next/router";
import axios from "axios";
import styles from "@/styles/pages/auth/confirmEmail.module.scss";
import Image from "next/image";

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
            <PageWrapper className={styles.confirm_email_page}>
                <div className={styles.confirm_email_page_logo}>
                    <Image src={"/logos/medvista_logo.png"} alt={"@medvista_logo"} fill />
                </div>
                <h1>Confirm Email</h1>
                <p>Check your inbox at {email} for confirmation link</p>
                {email && <p>Didn&apos;t get an email? <a href={`/auth/confirm-email?email=${email}`}>Resend confirmation email</a></p>}
            </PageWrapper>
        </>
    )
}