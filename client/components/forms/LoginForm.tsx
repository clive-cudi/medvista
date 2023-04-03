import styles from "@styles/components/forms/loginForm.module.scss";
import { InputDiv, RegularBtn, PasswordInput, PopupModal } from "../reusable";
import { MdOutlineMail } from "react-icons/md";
import React, { useState } from "react";
import { checkFormInputs } from "@/utils";
import { useModal } from "@/hooks";
import { signIn } from "next-auth/react";

export const LoginForm = (): JSX.Element => {
    const [loginData, setLoginData] = useState<{
        id: string
        password: string
    }>({
        id: "",
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
            signIn("credentials_id_password", {
                id: loginData.id,
                password: loginData.password,
                redirect: false
            }).then((res) => {
                console.log(res);
                if (res?.error) {
                    openModal(<PopupModal message={JSON.parse(res.error).message ?? "Invalid ID or Password"} />)
                }
            }).catch((err) => {
                console.log(err);
                openModal(<PopupModal message="Invalid ID or Password"/>)
            })
        } else {
            console.log("Input Error!!");
            openModal(<PopupModal message="Please fill in all fields"/>)
        }
    }

    return (
        <form className={styles.login_form} onSubmit={(e) => {e.preventDefault()}}>
            <InputDiv type={`text`} placeholder={`Enter ID`} icon={<MdOutlineMail />} inputArgs={{name: "id"}} onChange={handleChange} />
            <PasswordInput placeholder={"Enter Password"} inputArgs={{name: "password"}} onChange={handleChange} />
            <RegularBtn type="submit" onClick={submitLogin}>Login</RegularBtn>
        </form>
    )
}