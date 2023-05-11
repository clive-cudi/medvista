import { useState } from "react";
import { InputDiv, PasswordInput, RegularBtn } from "../reusable";
import styles from "@styles/components/forms/loginForm.module.scss";
import axios from "axios";
import { API_res_model } from "@/types";
import { EMAIL_REGEX } from "@/utils";

export const MockDoctorsForm = (): JSX.Element => {
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
            <InputDiv type={"text"} placeholder={"Enter Name"} inputArgs={{name: "name"}} onChange={handleChange} />
            <InputDiv type={"number"} placeholder={"ID"} inputArgs={{name: "id"}} onChange={handleChange} />
            <InputDiv type={"email"} placeholder={"Enter Email"} inputArgs={{name: "email"}} onChange={handleChange} />
            <InputDiv type={"text"} placeholder={"Enter Location"} inputArgs={{name: "location"}} onChange={handleChange} />
            <InputDiv type={"tel"} placeholder={"Phone Number"} inputArgs={{name: "phone"}} onChange={handleChange} />
            <InputDiv type={"text"} placeholder={"Specialty"} inputArgs={{name: "speciality"}} onChange={handleChange} />
            <span data-elm-type={`tag_${message.type}`}>*{message.message}</span>
            <RegularBtn type={"submit"} onClick={submitMockData}>Mock Doctor</RegularBtn>
        </form>
    )
}