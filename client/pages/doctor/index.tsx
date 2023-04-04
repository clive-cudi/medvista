import { DoctorPageCurrentTab, Header, PageWrapper, RegularBtn, SideNav } from "@/components";
import { signOut } from "next-auth/react";
import styles from "@styles/pages/doctor/doctorHomepage.module.scss"

export default function DoctorHomePage() {
    return (
        <>
            <Header title={"Medvista | Doctor Dashboard"}></Header>
            <PageWrapper>
                <SideNav />
                <div className={styles.content_view}>
                    <DoctorPageCurrentTab />
                </div>
            </PageWrapper>
        </>
    )
}