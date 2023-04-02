import React, { HTMLInputTypeAttribute } from "react";
import styles from "../../../styles/components/reusable/inputs/inputDiv.module.scss";

export interface InputDiv_Props {
    type: HTMLInputTypeAttribute
    placeholder?: string
    icon?: JSX.Element | React.ReactNode
    styling?: React.CSSProperties
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    inputArgs?: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
    variant?: "default" | "util" | "primary" | "secondary"
}

export const InputDiv = ({type, placeholder, icon, styling, onChange, variant, inputArgs}: InputDiv_Props): JSX.Element => {
    return (
        <div className={`${styles.input_div_wrapper} ${styles[`input_div_wrapper_${variant ?? "default"}`]}`} style={styling} data-elm-type={"input"}>
            {icon && <span data-elm-type={"input-icon"}>{icon}</span>}
            <input type={type} placeholder={placeholder} onChange={onChange} {...inputArgs} />
        </div>
    )
}