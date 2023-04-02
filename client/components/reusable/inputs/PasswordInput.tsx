import React, { useState } from "react";
import styles from "../../../styles/components/reusable/inputs/inputDiv.module.scss";
import type { InputDiv_Props } from "./InputDiv";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { BsKey } from "react-icons/bs";

export interface PasswordInput_Props extends Omit<InputDiv_Props, "type"> {
    enablePasswordPreview?: boolean
    initialPasswordPreviewState?: "show" | "hide"
    includeIcon?: boolean
}


export const PasswordInput = ({placeholder, icon, styling, onChange, variant, inputArgs, enablePasswordPreview, initialPasswordPreviewState, includeIcon}: PasswordInput_Props): JSX.Element => {
    const [showPassword, setShowPassword] = useState<boolean>(initialPasswordPreviewState === "show" ? true : false);

    function togglePasswordPreviewState() {
        if (showPassword === true) {
            setShowPassword(false);
        } else {
            setShowPassword(true);
        }
    }

    return (
        <div className={`${styles.input_div_wrapper} ${styles[`input_div_wrapper_${variant ?? "default"}`]}`} style={styling} data-elm-type={"input"}>
            {includeIcon === false ? null : <span data-elm-type={"input-icon"}>{icon ?? <BsKey />}</span>}
            <input type={showPassword === true ? `text` : `password`} placeholder={placeholder ?? `Password`} onChange={onChange} {...inputArgs} />
            {/* password preview enabled by default */}
            {enablePasswordPreview === false ? null : <span onClick={togglePasswordPreviewState} data-elm-type={"password-preview-icon"}>{showPassword === true ? <AiFillEyeInvisible /> : <AiFillEye />}</span>}
        </div>
    )
}