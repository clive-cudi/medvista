import React, { DetailedHTMLProps, ButtonHTMLAttributes } from "react";
import styles from "../../../styles/components/reusable/buttons/socialAuthbtn.module.scss";
import { MouseEventHandler } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { AiFillGitlab } from "react-icons/ai";

type social_variant_ =  "google" | "github" | "gitlab" | "facebook";

interface SocialAuthBtn_Props extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    children?: any
    label?: string
    variant: social_variant_
    onClickHandler?: MouseEventHandler<HTMLButtonElement>
    iconMod?: JSX.Element
    iconOrientation?: "end" | "start"
    className?: string
}

export const SocialAuthBtn = ({ label, children, variant, onClickHandler, iconMod, iconOrientation, className }: SocialAuthBtn_Props): JSX.Element => {

    const renderSocialVariant = (social_variant: social_variant_) => {
        switch (social_variant) {
            case "google":
                return {
                    label: "Google",
                    icon: <FcGoogle />,
                    onClickHandler: onClickHandler
                };
            case "github":
                return {
                    label: "Github",
                    icon: <FaGithub />,
                    onClickHandler: onClickHandler
                };
            case "gitlab":
                return {
                    label: "Gitlab",
                    icon: <AiFillGitlab />,
                    onClickHandler: onClickHandler
                }
        }
    }

    return (
        <button className={`${styles.social_auth_btn} ${styles[`social_auth_btn_variant_${variant}`]} ${styles[`social_auth_btn_orientation_${iconOrientation ?? "start"}`]}`} onClick={renderSocialVariant(variant)?.onClickHandler}>
            <span className={styles.social_auth_btn_icon}>{iconMod ?? renderSocialVariant(variant)?.icon}</span>
            {label || children }
        </button>
    )
}