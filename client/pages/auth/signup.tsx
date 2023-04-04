import { FormWrapper, Header, PageWrapper, SignupForm } from "@/components";
import styles from "@/styles/pages/auth/login.module.scss";
import Image from "next/image";
import { getSession } from "next-auth/react";

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

Signup.getInitialProps = async (ctx: {req: any, res: any}) => {
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