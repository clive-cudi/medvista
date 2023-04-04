import { Header, PageWrapper, RegularBtn } from "@/components";
import { signOut } from "next-auth/react";

export default function DoctorHomePage() {
    return (
        <>
            <Header title={"Medvista | Doctor Dashboard"}></Header>
            <PageWrapper>
                <h1>Doctor Home Page</h1>
                <RegularBtn onClick={() => {
                    signOut({
                        callbackUrl: "/"
                    });
                }} >Signout</RegularBtn>
            </PageWrapper>
        </>
    )
}