import styles from "@styles/components/reusable/nav/sideNav.module.scss";
import Image from "next/image";
import React, { ReactNode, useState } from "react";
import { BsChevronRight, BsChevronLeft } from "react-icons/bs";
import { SideNavBtn } from "../buttons";
import { IoLogOut } from "react-icons/io5"
import { signOut } from "next-auth/react";

export interface SideNavProps {
    switchBtns?: {
        btnComponent: JSX.Element | ReactNode;
    }[]
    isMinNav?: (isMin: boolean) => void;
}

export const SideNav = ({ switchBtns, isMinNav }: SideNavProps) => {
    const [isMin, setIsMin] = useState<boolean>(false);

    function toggleNavMin() {
        setIsMin(!isMin);
    }

    return (
        <nav className={`${styles.sideNav} ${isMin ? styles._isMin : ""}`}>
            <div className={styles.sn_content}>
                <div className={styles.sn_header}>
                    <div className={styles.sn_logo}>
                        <Image src="/logos/medvista_logo.png" alt="@Medvista_Logo" fill />
                    </div>
                    <div className={styles.sn_links}>
                        <ul>
                            {
                                switchBtns?.map((btn, index) => {
                                    return (
                                        <li key={index}>
                                            {btn.btnComponent}
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
                <div className={styles.sn_logout}>
                    <div className={styles.sn_minimize}>
                        <SideNavBtn variant={"navMin"} isActive={false} onClick={() => {
                            toggleNavMin();
                            isMinNav && isMinNav(isMin);
                        }}>{isMin ? <BsChevronRight /> : <BsChevronLeft />}</SideNavBtn>
                    </div>
                    <div className={styles.sn_logout}>
                        <SideNavBtn variant={"navMin"} isActive={false} onClick={() => {
                            signOut({
                                callbackUrl: "/"
                            })
                        }}>{<IoLogOut />}</SideNavBtn>
                    </div>
                </div>
            </div>
        </nav>
    )
}