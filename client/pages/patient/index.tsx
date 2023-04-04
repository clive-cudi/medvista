import { ReactNode } from "react";
import { Header, PageWrapper, RegularBtn, SideNav, PatientPageCurrentTab, SideNavBtn } from "@/components";
import styles from "@styles/pages/patient/patientHomepage.module.scss";
import { MdDashboard } from "react-icons/md";
import { BsFillFileEarmarkTextFill } from "react-icons/bs";
import { FaHospitalUser } from "react-icons/fa";
import { HiCog6Tooth } from "react-icons/hi2";
import { useTabs } from "@/hooks/useTabs";

export default function PatientHomePage() {
    const { initialTab: currentTab, switchTab } = useTabs();
    const switchBtns: {btnComponent: JSX.Element | ReactNode;}[] = [
        {
            btnComponent: <SideNavBtn variant={"primary"} isActive={currentTab.currentTab === "dashboard"} onClick={() => {
                switchTab("dashboard");
            }} withIcon={{status: true, icon: <MdDashboard fontSize={20} />}}>Dashboard</SideNavBtn>
        },
        {
            btnComponent: <SideNavBtn variant={"primary"} isActive={currentTab.currentTab === "myDoctors"} onClick={() => {
                switchTab("myDoctors");
            }} withIcon={{status: true, icon: <FaHospitalUser fontSize={20} />}}>My Doctors</SideNavBtn>
        },
        {
            btnComponent: <SideNavBtn variant={"primary"} isActive={currentTab.currentTab === "myRecords"} onClick={() => {
                switchTab("myRecords");
            }} withIcon={{status: true, icon: <BsFillFileEarmarkTextFill fontSize={20} />}}>My Records</SideNavBtn>
        },
        {
            btnComponent: <SideNavBtn variant={"primary"} isActive={currentTab.currentTab === "settings"} onClick={() => {
                switchTab("settings");
            }} withIcon={{status: true, icon: <HiCog6Tooth fontSize={20} />}}>Settings</SideNavBtn>
        }
    ];
    return (
        <>
            <Header title={"Medvista | Patient Dashboard"}></Header>
            <PageWrapper>
                <SideNav switchBtns={switchBtns ?? []} />
                <div className={styles.content_view}>
                    <PatientPageCurrentTab />
                </div>
            </PageWrapper>
        </>
    )
}