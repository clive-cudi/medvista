import { Doctor } from "@/types";
import styles from "@styles/components/reusable/modals/doctorInfoPopup.module.scss";
import { InputDiv, InputSelect, InputSelect_Props } from "../inputs";
import { useState } from "react";

interface BookAppointmentPopup {
    targetDoctor: Doctor
}

interface appointment_ {
    doctorID: string;
    date: string;
    time: string;
    note: string;
}

export const BookAppointmentPopup = ({ targetDoctor }: BookAppointmentPopup): JSX.Element => {
    const [appointment, setAppointment] = useState<appointment_>({
        doctorID: targetDoctor.id,
        date: "",
        time: "",
        note: ""
    });
    const appointment_time_slots: {
        label: string,
        value: string
     }[] = [
        {
            "label": "8:00am - 10:00am",
            value: "8_10"
        },
        {
            label: "10:00am - 12:00pm",
            value: "10_12"
        },
        {
            label: "12:00pm - 2:00pm",
            value: "12_14"
        },
        {
            label: "2:00pm - 4:00pm",
            value: "14_16"
        }
    ];
    const [message, setMessage] = useState<{message: string, type: "info" | "error"}>({"message": "", type: "info"});

    function updateInputs(key: keyof appointment_, value: string) {
        if (key && value) {
            setAppointment((prev) => ({
                ...prev,
                [key]: value
            }));
        }
    }

    function handleSubmit() {
        if ([...Object.values(appointment)].every(Boolean)) {
            // submit
            console.log(appointment);
        }
    }

    return (
        <div className={styles.doctorInfoPopup}>
            <div className={styles.dip_content}>
                <div className={styles.dip_info_strip}>
                    <div className={styles.dip_info_strip_col}>
                        <h4>Book appointment</h4>
                    </div>
                </div>
                <form onSubmit={(e) => {e.preventDefault()}}>
                    <div className={styles.dip_info_strip}>
                        <div className={styles.dip_info_strip_col}>
                            <h4>Doctor: </h4>
                        </div>
                        <div className={styles.dip_info_strip_col}>
                            <InputDiv type="text" onChange={(e) => {}} placeholder="Doctor's name" inputArgs={{disabled: true, value: targetDoctor.name}} />
                        </div>
                    </div>
                    <div className={styles.dip_info_strip}>
                        <div className={styles.dip_info_strip_col}>
                            <h4>Date: </h4>
                        </div>
                        <div className={styles.dip_info_strip_col}>
                            <InputDiv type="date" onChange={(e) => {updateInputs("date", e.target.value)}} placeholder="Appointment date" />
                        </div>
                    </div>
                    <div className={styles.dip_info_strip}>
                        <div className={styles.dip_info_strip_col}>
                            <button data-elm-type={"view_available_dates_btn"}>See available dates</button>
                        </div>
                    </div>
                    <div className={styles.dip_info_strip}>
                        <div className={styles.dip_info_strip_col}>
                            <h4>Time: </h4>
                        </div>
                        <div className={styles.dip_info_strip_col}>
                            {/* <InputDiv type="text" onChange={(e) => {updateInputs("time", e.target.value)}} placeholder="Appointment time" /> */}
                            {/* <InputTime /> */}
                            <InputSelect options={appointment_time_slots} onChange={(e) => {updateInputs("time", e.target.value)}} />
                        </div>
                    </div>
                    <div className={`${styles.dip_info_strip} ${styles.dip_info_strip_column}`}>
                        <div className={styles.dip_info_strip_col}>
                            <h4>Doctors note: </h4>
                        </div>
                        <div className={styles.dip_info_strip_col}>
                            <textarea onChange={(e) => {updateInputs("note", e.target.value)}} placeholder="Note to pass to the doctor..." />
                        </div>
                    </div>
                    <div className={`${styles.dip_info_strip} ${styles.dip_info_strip_column} ${styles.dip_info_strip_btns}`}>
                        <span data-elm-type={`${message.type}`}>{message.message}</span>
                    </div>
                    <div className={`${styles.dip_info_strip} ${styles.dip_info_strip_column} ${styles.dip_info_strip_btns}`}>
                        <div className={`${styles.dip_info_strip_col} ${styles.dip_info_strip_col_btns}`}>
                            {/* data */}
                            <button data-elm-type={"add_btn"} type="submit" onClick={handleSubmit}>Book Appointment</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}