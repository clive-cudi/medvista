import { useMemo } from "react";
import styles from "@/styles/components/layout/formWrapper.module.scss";
import { SocialAuthBtn } from "../reusable";
import Link from "next/link";

interface FormWrapper_Props {
    form: JSX.Element,
    children?: any,
    title?: string
    footer?: JSX.Element
    variant?: "authLogin" | "authSignup"
    enableSocials?: boolean
}

export const FormWrapper = ({ form, children, title, variant, enableSocials }: FormWrapper_Props):JSX.Element => {
    const loginProviders = useMemo<{provider: string;
        triggerElm: JSX.Element}[]>
        (() => [
        {
            provider: "google",
            triggerElm: <SocialAuthBtn key={1} variant={"google"} onClickHandler={() => {}}>Google</SocialAuthBtn>,
        },
        {
            provider: "github",
            triggerElm: <SocialAuthBtn key={2} variant={"github"} onClickHandler={() => {}}>Github</SocialAuthBtn>
        }
    ], [])

    function renderVariant() {
        switch (variant) {
            case "authLogin":
                return (
                    <div className={styles.form_social_auth}>
                        <div className={styles.strike_or}>
                            <span>or</span>
                        </div>
                        {loginProviders.map((provider) => provider.triggerElm)}
                        <div className={styles.forgot_link}>
                            <Link href={"#"}>Forgot Password?</Link>
                        </div>
                    </div>
                );
            case "authSignup":
                return (
                    <div className={styles.form_social_auth}>
                        <div className={styles.strike_or}>
                            <span>or</span>
                        </div>
                        
                    </div>
                )
            default:
                null;
        }
    }

    return (
        <div className={styles.form_wrapper}>
            <div className={styles.form_wrapper_content}>
                {title ? <div className={styles.form_wrapper_title_block}>
                    <h2>{title}</h2>
                </div> : null}
                {form ? form : (children || null)}
                {enableSocials === false ? null : renderVariant()}
            </div>
        </div>
    )
}