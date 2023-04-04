import React, { SelectHTMLAttributes } from "react";
import styles from "@/styles/components/reusable/inputs/inputDiv.module.scss";

export interface InputSelect_Props extends SelectHTMLAttributes<HTMLSelectElement> {
    options: {
        label: string,
        value: string
    }[]
    withIcon?: {
        status: boolean
        icon: React.ReactNode | JSX.Element
    },
    defaultOption?: {
        label: string,
        value: string
    }
}

export const InputSelect = ({options, withIcon, defaultOption, ...otherProps}: InputSelect_Props): JSX.Element => {
    return (
        <div className={`${styles.input_div_wrapper} ${styles.input_select}`} data-elm-type={"input"}>
            {withIcon?.status === true && <span className={styles.input_select_icon}>{withIcon.icon}</span>}
            <select {...otherProps}>
                {
                    defaultOption && <option value={defaultOption?.value}>{defaultOption?.label}</option>
                }
                {
                    options.map((opt, index)=>{
                        return <option key={index} value={opt.value}>{opt.label}</option>
                    })
                }
            </select>
        </div>
    )
}