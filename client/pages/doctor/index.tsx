import React, { ReactNode } from "react";
import { DoctorPageCurrentTab, Header, PageWrapper, RegularBtn, SideNav, SideNavBtn } from "@/components";
import styles from "@styles/pages/doctor/doctorHomepage.module.scss";
import { useTabs } from "@/hooks/useTabs";
import { MdDashboard } from "react-icons/md";
import { FaHospitalUser } from "react-icons/fa";
import { BsFillFileEarmarkTextFill } from "react-icons/bs";
import { HiCog6Tooth } from "react-icons/hi2";

export default function DoctorHomePage() {
    const { initialTab: currentTab, switchTab } = useTabs();
    const [navMin, setNavMin] = React.useState(false);
    const switchBtns: {btnComponent: JSX.Element | ReactNode}[] = [
        {
            btnComponent: <SideNavBtn variant={"primary"} isActive={currentTab.currentTab === "dashboard"} onClick={() => {
                switchTab("dashboard");
            }} withIcon={{status: true, icon: <MdDashboard fontSize={20} />}}>Dashboard</SideNavBtn>
        },
        {
            btnComponent: <SideNavBtn variant={"primary"} isActive={currentTab.currentTab === "myDoctors"} onClick={() => {
                switchTab("myDoctors");
            }} withIcon={{status: true, icon: <FaHospitalUser fontSize={20} />}}>My Patients</SideNavBtn>
        },
        {
            btnComponent: <SideNavBtn variant={"primary"} isActive={currentTab.currentTab === "settings"} onClick={() => {
                switchTab("settings");
            }} withIcon={{status: true, icon: <HiCog6Tooth fontSize={20} />}}>Settings</SideNavBtn>
        }
    ];

    return (
        <>
            <Header title={"Medvista | Doctor Dashboard"}></Header>
            <PageWrapper>
                <SideNav switchBtns={switchBtns ?? []} isMinNav={(isMin) => {
                    setNavMin(isMin);
                }} />
                <div className={styles.content_view}>
                    <DoctorPageCurrentTab />
                </div>
            </PageWrapper>
        </>
    )
}

DoctorHomePage.requireAuth = {
    userType: 'doctor'
}