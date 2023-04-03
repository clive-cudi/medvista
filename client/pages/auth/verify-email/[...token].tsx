import { useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Header, PageWrapper } from '@/components';

export default function VerifyEmail() {
    const router = useRouter();
    // get token from url
    const { token } = router.query;

    useEffect(() => {
        if (token) {
            // send email to backend
            axios.post(`${process.env.BACKEND_URL}/auth/verify-email`, {
                token
            }).then((res) => {
                console.log(res);
            }).catch((err) => {
                console.log(err);
            })
        }
    }, [token]);

    return (
        <>
            <Header></Header>
            <PageWrapper>
                <h1>Verify Email</h1>
                <p>Check your inbox at {token} for verification link</p>
            </PageWrapper>
        </>
    )
}