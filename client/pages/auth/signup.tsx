import { FormWrapper, Header, PageWrapper, SignupForm } from "@/components";
import styles from "@/styles/pages/auth/login.module.scss";
import Image from "next/image";

export default function Signup() {
    return (
        <>
            <Header title={"MedVista | Signup"} />
            <PageWrapper className={styles.login_page}>
                <div className={styles.login_page_logo}>
                    <Image src={"/logos/medvista_logo.png"} alt={"@medvista_logo"} fill />
                </div>
                <FormWrapper form={<SignupForm />} variant={"authSignup"} enableSocials />
            </PageWrapper>
        </>
    )
}