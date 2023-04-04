import { Header, PageWrapper, RegularBtn } from "@/components";
import { signOut } from "next-auth/react";

export default function PatientHomePage() {
    return (
        <>
            <Header title={"Medvista | Patient Dashboard"}></Header>
            <PageWrapper>
                <h1>Patient Home Page</h1>
                <RegularBtn onClick={() => {
                    signOut({
                        callbackUrl: "/"
                    });
                }} >Signout</RegularBtn>
            </PageWrapper>
        </>
    )
}