import { Doctor } from "@/types";
import styles from "@styles/components/reusable/modals/doctorInfoPopup.module.scss";
import { InputDiv, InputSelect, InputSelect_Props } from "../inputs";
import { useState } from "react";
import { PatientQueries } from "@/utils";
import { useSession } from "next-auth/react";

interface UpdateAppointmentPopup_Props {
    appointment_id: string;
    initialValues: {
        title: string;
        date: Date;
        time: string;
        note: string;
    };
    targetDoctor: Doctor | null
}

interface appointment_ {
    date: string;
    time: string;
    note: string;
}

export const UpdateAppointmentPopup = ({appointment_id, initialValues, targetDoctor }: UpdateAppointmentPopup_Props): JSX.Element => {
    const [appointment, setAppointment] = useState<{
        title: string;
        date: Date;
        time: string;
        note: string;
    }>({
        date: initialValues.date,
        time: "",
        note: "",
        title: ""
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
    const session = useSession();
    const { updateAppointment } = PatientQueries(session);

    function updateInputs(key: keyof appointment_, value: string) {
        if (key && value) {
            setAppointment((prev) => ({
                ...prev,
                [key]: value
            }));
        }
    }

    function handleSubmit() {
        console.log(appointment);
        // clear message
        setMessage({message: "", type: "info"});
        // submit
        console.log(appointment);
        updateAppointment(appointment_id, appointment).then((res) => {
            console.log(res);
            if (res.success === true) {
                // successfully updated appointment
                setMessage({message: res.message, type: "info"});
                
            } else {
                setMessage({message: res.message, type: "error"})
            }
        }).catch((err) => {
            console.log(err);
            setMessage({message: err?.response?.data?.message ?? "An error occurred while updating the appointment. Please try again...", type: "error"})
        })
    }

    return (
        <div className={styles.doctorInfoPopup}>
            <div className={styles.dip_content}>
                <div className={styles.dip_info_strip}>
                    <div className={styles.dip_info_strip_col}>
                        <h4>Update appointment</h4>
                    </div>
                </div>
                <form onSubmit={(e) => {e.preventDefault()}}>
                    <div className={styles.dip_info_strip}>
                        <div className={styles.dip_info_strip_col}>
                            <h4>Doctor: </h4>
                        </div>
                        <div className={styles.dip_info_strip_col}>
                            <InputDiv type="text" onChange={(e) => {}} placeholder="Doctor's name" inputArgs={{disabled: true, value: targetDoctor?.name}} />
                        </div>
                    </div>
                    <div className={styles.dip_info_strip}>
                        <div className={styles.dip_info_strip_col}>
                            <h4>Title: </h4>
                        </div>
                        <div className={styles.dip_info_strip_col}>
                            <InputDiv type="text" onChange={(e) => {}} placeholder="Appointment title" inputArgs={{disabled: false, defaultValue: initialValues.title}} />
                        </div>
                    </div>
                    <div className={styles.dip_info_strip}>
                        <div className={styles.dip_info_strip_col}>
                            <h4>Date: </h4>
                        </div>
                        <div className={styles.dip_info_strip_col}>
                            <InputDiv type="date" onChange={(e) => {updateInputs("date", e.target.value)}} inputArgs={{defaultValue: new Date(initialValues.date).toISOString()}} placeholder="Appointment date" />
                        </div>
                    </div>
                    <div className={styles.dip_info_strip}>
                        <div className={styles.dip_info_strip_col}>
                            <h4>Time: </h4>
                        </div>
                        <div className={styles.dip_info_strip_col}>
                            {/* <InputDiv type="text" onChange={(e) => {updateInputs("time", e.target.value)}} placeholder="Appointment time" /> */}
                            {/* <InputTime /> */}
                            <InputSelect options={appointment_time_slots} defaultOption={appointment_time_slots.find((slot) => slot.value === initialValues.time)} onChange={(e) => {updateInputs("time", e.target.value)}} />
                        </div>
                    </div>
                    <div className={`${styles.dip_info_strip} ${styles.dip_info_strip_column}`}>
                        <div className={styles.dip_info_strip_col}>
                            <h4>Doctors note: </h4>
                        </div>
                        <div className={styles.dip_info_strip_col}>
                            <textarea onChange={(e) => {updateInputs("note", e.target.value)}} defaultValue={initialValues.note} placeholder="Note to pass to the doctor..." />
                        </div>
                    </div>
                    <div className={`${styles.dip_info_strip} ${styles.dip_info_strip_column} ${styles.dip_info_strip_btns}`}>
                        <span data-elm-type={`tag_${message.type}`}>*{message.message}</span>
                    </div>
                    <div className={`${styles.dip_info_strip} ${styles.dip_info_strip_column} ${styles.dip_info_strip_btns}`}>
                        <div className={`${styles.dip_info_strip_col} ${styles.dip_info_strip_col_btns}`}>
                            {/* data */}
                            <button data-elm-type={"add_btn"} type="submit" onClick={handleSubmit}>Update Appointment</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}