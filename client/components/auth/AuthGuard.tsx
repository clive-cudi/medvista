import React, { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

interface AuthGuardProps {
    usertype: "doctor" | "patient"
    children: React.ReactNode
}

export const AuthGuard = ({ usertype, children }: AuthGuardProps) => {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/auth/login');
        }

        if (status === 'authenticated' && session.user.usertype !== usertype) {
            // route to home page of the user's usertype
            router.push(`/${session.user.usertype}`);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [session, status]);

    if (status === 'loading') {
        return <div>Loading...</div>
    }

    return (
        <>
            {children}
        </>
    )
}