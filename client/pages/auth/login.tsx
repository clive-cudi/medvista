import { FormWrapper, Header, PageWrapper, LoginForm } from "@/components";
import styles from "@/styles/pages/auth/login.module.scss";
import Image from "next/image";

export default function Login() {
    return (
        <>
            <Header title={"MedVista | Login"} />
            <PageWrapper className={styles.login_page}>
                <div className={styles.login_page_logo}>
                    <Image src={"/logos/medvista_logo.png"} alt={"@medvista_logo"} fill />
                </div>
                <FormWrapper form={<LoginForm />} variant={"authLogin"} enableSocials />
            </PageWrapper>
        </>
    )
}