import { useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Header, PageWrapper } from '@/components';

export default function VerifyEmail() {
    const router = useRouter();
    // get email from query
    const { email } = router.query;

    useEffect(() => {
        if (email) {
            // send email to backend
            axios.post(`${process.env.BACKEND_URL}/auth/verify-email`, {
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
            <Header></Header>
            <PageWrapper>
                <h1>Verify Email</h1>
                <p>Check your inbox at {email} for verification link</p>
            </PageWrapper>
        </>
    )
}