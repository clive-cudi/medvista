import styles from "@styles/components/forms/loginForm.module.scss";
import { InputDiv, RegularBtn, PasswordInput, PopupModal } from "../reusable";
import { MdOutlineMail } from "react-icons/md";
import React, { useState } from "react";
import { checkFormInputs } from "@/utils";
import { useModal } from "@/hooks";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";

export const LoginForm = (): JSX.Element => {
    const [loginData, setLoginData] = useState<{
        id: string
        password: string
    }>({
        id: "",
        password: ""
    });
    const { openModal } = useModal();
    const router = useRouter();
	const [isFormLoading, setIsFormLoading] = useState<boolean>(false);

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
			setIsFormLoading(true);
            console.log(loginData);
            console.log("Submitting");
            signIn("credentials_id_password", {
                id: loginData.id,
                password: loginData.password,
                redirect: false
            }).then(async (res) => {
				setIsFormLoading(false);
                console.log(res);
                if (res?.error) {
                    openModal(<PopupModal message={JSON.parse(res.error).message ?? "Invalid ID or Password"} />);
                    return;
                }

                const session = await getSession();

                if (session?.user.usertype === "doctor") {
                    router.push("/doctor");
                } else if (session?.user.usertype === "patient") {
                    router.push("/patient");
                } else {
                    router.push("/");
                }
            }).catch((err) => {
				setIsFormLoading(false);
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
			<RegularBtn type="submit" isLoading={{status: isFormLoading}} onClick={submitLogin}>Login</RegularBtn>
        </form>
    )
}
