import { useState } from "react";
import { InputDiv, PasswordInput, RegularBtn, InputSelect } from "../reusable";
import styles from "@styles/components/forms/loginForm.module.scss";
import axios from "axios";
import { API_res_model, Doctor, Patient } from "@/types";
import { EMAIL_REGEX } from "@/utils";

interface MockDignosisForm_props {
    doctors: Doctor[];
    patients: Patient[];
}

export const MockDiagnosisForm = ({ doctors, patients }: MockDignosisForm_props): JSX.Element => {
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
            <span>Choose Patient:</span>
            <InputSelect options={patients?.map((patient_) => ({label: patient_.name, value: patient_.id})) ?? []} name={"patient"} />
            <span>Choose Doctor:</span>
            <InputSelect options={doctors?.map((doctor_) => ({label: doctor_.name, value: doctor_.id})) ?? []} name={"doctor"} />
            <InputDiv type={"date"} inputArgs={{name: "date"}} onChange={(e) => {}} />
            <textarea placeholder={"Enter Symptoms"} name="symptoms" onChange={(e) => {}}></textarea>
            <InputDiv type={"text"} placeholder={"Enter diagnosis"} inputArgs={{name: "diagnosis"}} onChange={(e) => {}} />
            <textarea placeholder={"Enter treatment"} name="treatment"></textarea>
            <span data-elm-type={`tag_${message.type}`}>*{message.message}</span>
            <RegularBtn type={"submit"} onClick={submitMockData}>Mock Diagnosis</RegularBtn>
        </form>
    )
}