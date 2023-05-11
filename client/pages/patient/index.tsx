import React, { useState, ReactNode } from "react";
import { Header, PageWrapper, RegularBtn, SideNav, PatientPageCurrentTab, SideNavBtn } from "@/components";
import styles from "@styles/pages/patient/patientHomepage.module.scss";
import { MdDashboard } from "react-icons/md";
import { BsFillFileEarmarkTextFill } from "react-icons/bs";
import { FaUserMd } from "react-icons/fa";
import { HiCog6Tooth } from "react-icons/hi2";
import { useTabs } from "@/hooks/useTabs";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { PatientQueries } from "@/utils";
import { useDoctorStore, useAppointmentStore } from "@/hooks";

export default function PatientHomePage() {
    const { initialTab: currentTab, switchTab } = useTabs();
    const [navMin, setNavMin] = useState(false);
    const switchBtns: {btnComponent: JSX.Element | ReactNode}[] = [
        {
            btnComponent: <SideNavBtn variant={"primary"} isActive={currentTab.currentTab === "dashboard"} onClick={() => {
                switchTab("dashboard");
            }} withIcon={{status: true, icon: <MdDashboard fontSize={20} />}}>{navMin ? null  :"Dashboard"}</SideNavBtn>
        },
        {
            btnComponent: <SideNavBtn variant={"primary"} isActive={currentTab.currentTab === "myDoctors"} onClick={() => {
                switchTab("myDoctors");
            }} withIcon={{status: true, icon: <FaUserMd fontSize={20} />}}>{navMin ? null  :"My Doctors" }</SideNavBtn>
        },
        {
            btnComponent: <SideNavBtn variant={"primary"} isActive={currentTab.currentTab === "myRecords"} onClick={() => {
                switchTab("myRecords");
            }} withIcon={{status: true, icon: <BsFillFileEarmarkTextFill fontSize={20} />}}>{navMin ? null  :"My Records" }</SideNavBtn>
        },
        {
            btnComponent: <SideNavBtn variant={"primary"} isActive={currentTab.currentTab === "settings"} onClick={() => {
                switchTab("settings");
            }} withIcon={{status: true, icon: <HiCog6Tooth fontSize={20} />}}>{navMin ? null : "Settings" }</SideNavBtn>
        }
    ];
    const session = useSession();
    const { getMyDoctors, getAllAppointments } = PatientQueries(session);
    const { addBulk: addMultipleDoctorsToStore } = useDoctorStore();
    const { addBulk: addMultipleAppointmentsToStore } = useAppointmentStore();

    useEffect(() => {
        getMyDoctors().then((res) => {
            const { active, inactive, archived } = res.doctors;
            addMultipleDoctorsToStore(active, "active");
            addMultipleDoctorsToStore(inactive, "inactive");
            addMultipleDoctorsToStore(archived, "archived");
        }).catch((err) => {
            console.log(err);
        });
        getAllAppointments().then((res) => {
            addMultipleAppointmentsToStore(res.appointments)
        }).catch((err) => {
            console.log(err);
        });
    }, [])

    return (
        <>
            <Header title={"Medvista | Patient Dashboard"}></Header>
            <PageWrapper>
                <SideNav switchBtns={switchBtns ?? []} isMinNav={(isMin) => {setNavMin(!isMin)}} />
                <div className={styles.content_view}>
                    <PatientPageCurrentTab />
                </div>
            </PageWrapper>
        </>
    )
}

PatientHomePage.requireAuth = {
    userType: 'patient'
}