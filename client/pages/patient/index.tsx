import { Header, PageWrapper, RegularBtn, SideNav, PatientPageCurrentTab } from "@/components";
import { signOut } from "next-auth/react";
import styles from "@styles/pages/patient/patientHomepage.module.scss"

export default function PatientHomePage() {
    return (
        <>
            <Header title={"Medvista | Patient Dashboard"}></Header>
            <PageWrapper>
                <SideNav />
                <div className={styles.content_view}>
                    <PatientPageCurrentTab />
                </div>
            </PageWrapper>
        </>
    )
}