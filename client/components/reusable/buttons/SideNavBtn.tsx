import React, { DetailedHTMLProps, ButtonHTMLAttributes } from 'react';
import styles from "@styles/components/reusable/buttons/buttons.module.scss";

interface SideNavBtn_Props extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    isActive: boolean
    withIcon?: {
        status: boolean,
        icon: JSX.Element | React.ReactNode
    }
    className?: string
    variant?: "primary" | "secondary" | "navMin"
}

export const SideNavBtn = ({isActive, withIcon, className, variant, children, ...utilProps}: SideNavBtn_Props): JSX.Element => {
    return (
        <button className={`${styles.side_nav_btn} ${styles[`btn_${variant ?? "primary"}`]} ${className ?? ""}`} data-active={isActive} {...utilProps}>
            {withIcon?.status === true && <span>{withIcon.icon}</span>}
            {children}
        </button>
    )
}