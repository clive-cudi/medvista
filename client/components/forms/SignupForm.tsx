import styles from "@styles/components/forms/loginForm.module.scss";
import { InputDiv, RegularBtn, PasswordInput, PopupModal } from "../reusable";
import { MdOutlineMail } from "react-icons/md";
import React, { useState } from "react";
import { checkFormInputs } from "@/utils";
import { AiOutlineUser } from "react-icons/ai";
import { HiOutlineIdentification } from "react-icons/hi";
import { EMAIL_REGEX, PASSWORD_REGEX, FULLNAME_SPACED_REGEX, ALL_INTEGERS_REGEX } from "@/utils";
import { useModal } from "@/hooks";

interface signupFormData_types {
    name: string,
    id: string,
    email: string,
    password: string,
    confirmPassword: string
}

export const SignupForm = (): JSX.Element => {
    const [signupData, setSignupData] = useState<signupFormData_types>({
        name: "",
        id: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const { openModal } = useModal();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value;

        const name = e.target.name;

        setSignupData((prevSignupData) => {
            return {
                ...prevSignupData,
                [name]: value
            }
        })
    }

    function verifyRegisterInputs(): boolean {
        if (FULLNAME_SPACED_REGEX.test(signupData.name)) {
            // name is valid
            if (ALL_INTEGERS_REGEX.test(signupData.id)) {
                // id is all integers
                if (EMAIL_REGEX.test(signupData.email)) {
                    // email is of valid format
                    if (signupData.confirmPassword === signupData.password) {
                        // passwords match
                        if (PASSWORD_REGEX.test(signupData.password)) {
                            // password format valid
                            return true;
                        } else {
                            openModal(<PopupModal message={"Password should contain at least one number and one special character with a minimum of six characters"} />)
                        }
                    } else {
                        openModal(<PopupModal message={"Please enter matching passwords"} />)
                    }
                } else {
                    openModal(<PopupModal message={"Please enter your email in a valid format: `email@domain.com`"} />)
                }
            } else {
                openModal(<PopupModal message={"ID Number should only contain number characters"} />)
            }
        } else {
            // raise error
            openModal(<PopupModal message="First and Last Name should be separated by a space." />)
        }

        return false;
    }

    function submitLogin(): void {
        if (checkFormInputs({data: signupData, exclude: []})) {
            console.log(signupData);
            console.log("Submitting");
            // check for input errors
            if (verifyRegisterInputs()) {
                // info ready for submission
            }
        } else {
            console.log("Input Error!!");
            openModal(<PopupModal message={`Please fill in all fields!`} />)
        }
    }

    return (
        <form className={styles.login_form} onSubmit={(e) => {e.preventDefault()}}>
            <InputDiv type={`text`} placeholder={"Enter First and Last Name"} icon={<AiOutlineUser />} inputArgs={{name: "name"}} onChange={handleChange} />
            <InputDiv type={`number`} placeholder={"Enter ID no."} icon={<HiOutlineIdentification />} inputArgs={{name: "id"}} onChange={handleChange} />
            <InputDiv type={`text`} placeholder={`Enter Email`} icon={<MdOutlineMail />} inputArgs={{name: "email"}} onChange={handleChange} />
            <PasswordInput placeholder={"Enter Password"} inputArgs={{name: "password"}} onChange={handleChange} />
            <PasswordInput placeholder={"Confirm Password"} inputArgs={{name: "confirmPassword"}} onChange={handleChange} />
            <RegularBtn type="submit" onClick={submitLogin}>Register</RegularBtn>
        </form>
    )
}