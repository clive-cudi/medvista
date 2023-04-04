import { FormWrapper, Header, PageWrapper, LoginForm } from "@/components";
import styles from "@/styles/pages/auth/login.module.scss";
import Image from "next/image";
import { getSession } from "next-auth/react";

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

Login.getInitialProps = async (ctx: {req: any, res: any}) => {
    const { req, res } = ctx;
    const session = await getSession({ req });

    if ((session)?.user && res) {
        res.writeHead(302, {
            Location: (session)?.user.userType === 'patient' ? '/patient' : '/doctor',
        });

        res.end();

        return {
            props: {},
        };
    }

    return {
        props: {},
    };
}