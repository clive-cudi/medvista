import styles from "@styles/components/forms/loginForm.module.scss";
import { InputDiv, RegularBtn, PasswordInput, PopupModal } from "../reusable";
import { MdOutlineMail } from "react-icons/md";
import React, { useState } from "react";
import { checkFormInputs } from "@/utils";
import { useModal } from "@/hooks";

export const LoginForm = (): JSX.Element => {
    const [loginData, setLoginData] = useState<{
        email: string
        password: string
    }>({
        email: "",
        password: ""
    });
    const { openModal } = useModal();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value;

        const name = e.target.name;

        setLoginData((prevLoginData) => {
            return {
                ...prevLoginData,
                [name]: value
            }
        })
    }

    function submitLogin(): void {
        if (checkFormInputs({data: loginData, exclude: []})) {
            console.log(loginData);
            console.log("Submitting");
        } else {
            console.log("Input Error!!");
            openModal(<PopupModal message="Please fill in all fields"/>)
        }
    }

    return (
        <form className={styles.login_form} onSubmit={(e) => {e.preventDefault()}}>
            <InputDiv type={`text`} placeholder={`Enter Email`} icon={<MdOutlineMail />} inputArgs={{name: "email"}} onChange={handleChange} />
            <PasswordInput placeholder={"Enter Password"} inputArgs={{name: "password"}} onChange={handleChange} />
            <RegularBtn type="submit" onClick={submitLogin}>Login</RegularBtn>
        </form>
    )
}