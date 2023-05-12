import { useState } from "react";
import { InputDiv, PasswordInput, RegularBtn, InputSelect } from "../reusable";
import styles from "@styles/components/forms/loginForm.module.scss";
import axios from "axios";
import { API_res_model } from "@/types";
import { EMAIL_REGEX } from "@/utils";

export const MockDiagnosisForm = (): JSX.Element => {
    const [mockData, setMockData] = useState({
        name: "",
        id: "",
        phone: "",
        location: "",
        email: "",
        speciality: ""
    });
    const [message, setMessage] = useState<{message: string, type: "info" | "error"}>({"message": "", type: "info"});
    

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
        const value = e.target.value;

        const name = e.target.name;

        console.log(name, value);

        setMockData((prevSignupData) => {
            return {
                ...prevSignupData,
                [name]: value
            }
        })
    };

    function submitMockData() {
        setMessage({message: "", type: "info"});
        if (!EMAIL_REGEX.test(mockData.email)) {
            setMessage({message: "Invalid email", type: "error"})
            return;
        } 
        if ([...Object.values(mockData)].every(Boolean)) {
            axios.post<API_res_model>(`${process.env.BACKEND_URL}/doctor/mock`, {
                ...mockData
            }).then((res)=> {
                console.log(res);
                if (res.data.success) {
                    // success
                    setMessage({message: res.data.message ?? "Doctor created successfully", type: "info"})
                } else {
                    // error
                    setMessage({message: res.data.message ?? "An error occurred while trying to register. Please try again later.", type: "error"})
                }
            }).catch((signup_err) => {
                console.log(signup_err);
                setMessage({message: signup_err?.response?.data?.message ?? "An error occurred while trying to register. Please try again later.", type: "error"});
            })
        } else {
            // invalid inputs
            setMessage({message: "Please enter all inputs", type: "error"})
        }
    }

    return (
        <form className={styles.login_form} onSubmit={(e) => {
            e.preventDefault();
        }}>
            
            <span data-elm-type={`tag_${message.type}`}>*{message.message}</span>
            <RegularBtn type={"submit"} onClick={submitMockData}>Mock Diagnosis</RegularBtn>
        </form>
    )
}