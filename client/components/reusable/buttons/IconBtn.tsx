import React, { ButtonHTMLAttributes } from "react";
import styles from "@styles/components/reusable/buttons/buttons.module.scss";

interface IconBtn_Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "text" | "contained" | "outlined" | "gradient" | "nav"
    // other?: DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
    isLoading?: {
        status: boolean,
        iconAlt?: JSX.Element | React.ReactNode
    }
    className?: string
    children?: any;
}

export const IconBtn = ({ variant, isLoading, className, children, ...utilProps }: IconBtn_Props): JSX.Element => {
    return (
        <button className={`${styles.icon_btn} ${styles[`icon_btn_${variant ?? "_"}`]} ${className}`} {...utilProps}>{children ?? null}</button>
    )
}