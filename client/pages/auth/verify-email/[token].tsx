import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Header, PageWrapper, RegularBtn, SocialAuthBtn } from '@/components';
import styles from "@/styles/pages/auth/confirmEmail.module.scss";
import Image from "next/image";
import { Modal } from '@/components';
import { useModal } from '@/hooks';
import { PopupModal } from '@/components';
import { MdOutlineMail } from "react-icons/md";
import { InputDiv } from '@/components';
import { validateEmail } from '@/utils';

export default function VerifyEmail() {
    const router = useRouter();
    // get token from url
    const { token } = router.query;
    const { modal, openModal } = useModal();
    const [currentVerificationStatus, setCurrentVerificationStatus] = useState("pending");
    const [showEmailInput, setShowEmailInput] = useState(false);
    const [email, setEmail] = useState("");

    useEffect(() => {
        if (token) {
            // send email to backend
            openModal(<PopupModal type={"info"} title={"Verifying Email"} message={`Please wait while we verify your email\n`} show_btn={false} />)
            axios.post(`${process.env.BACKEND_URL}/auth/verify-email`, {
                token
            }).then((res) => {
                if (res.data.success === true) {
                    setCurrentVerificationStatus("success");
                    openModal(<PopupModal type={"success"} title={"Email Verified"} message={"Email Verification successful!"} btn_label={"Go to Login"} />)
                    router.push("/auth/login");
                } else {
                    setCurrentVerificationStatus("error");
                    openModal(<PopupModal type={"error"} title={"Email Verification Failed"} message={res.data.message} />)
                }
                console.log(res);
            }).catch((err) => {
                console.log(err);
                setCurrentVerificationStatus("error");
                openModal(<PopupModal type={"error"} title={"Email Verification Failed"} message={"An error occured while verifying your email"} />)
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    function toggleShowEmailInput() {
        console.log("toggle");
        setShowEmailInput(!showEmailInput);
    }

    function handleEmailResend() {
        // prompt for email
        if (validateEmail(email)) {
            // route to /confirm-email?email=email
            router.push(`/auth/confirm-email?email=${email}`);
        } else {
            openModal(<PopupModal type={"error"} title={"Invalid Email"} message={"Please enter a valid email"} />)
        }
    }

    return (
        <>
            <Header></Header>
            <PageWrapper className={styles.confirm_email_page}>
                <div className={styles.confirm_email_page_logo}>
                    <Image src={"/logos/medvista_logo.png"} alt={"@medvista_logo"} fill />
                </div>
                <h1>Email Verification</h1>
                {currentVerificationStatus === "pending" && <p>Verifying your email...</p>}
                {currentVerificationStatus === "success" && <p>Email verified successfully!</p>}
                {currentVerificationStatus === "error" && 
                <>
                    <p>There was an error verifying your email!</p>
                    <RegularBtn onClick={() => {router.reload()}}>Retry</RegularBtn>
                    <p>OR</p>
                    <SocialAuthBtn variant={"github"} iconMod={<MdOutlineMail />} onClickHandler={toggleShowEmailInput}>{showEmailInput ? "Cancel" : "Try"} Resending verification email</SocialAuthBtn>
                </>}
                {showEmailInput ? <form className={styles.resend_email_form} onSubmit={(e) => {e.preventDefault()}}>
                    <InputDiv placeholder={"Enter your email"} type={"email"} onChange={(e) => {
                        setEmail(e.target.value);
                    }} icon={<MdOutlineMail />} />
                    <RegularBtn type={"submit"} onClick={handleEmailResend}>Re-send Email</RegularBtn>
                </form>: null}
            </PageWrapper>
        </>
    )
}