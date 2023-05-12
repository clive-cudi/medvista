import styles from "@styles/components/reusable/modals/doctorInfoPopup.module.scss";
import { HiArchive } from "react-icons/hi";
import { BsEyeSlashFill, BsEyeFill } from "react-icons/bs";
import { MdBlock } from "react-icons/md";
import { Appointment, Diagnosis } from "@/types";
import { parseTimeString, PatientQueries } from "@/utils";
import { useModal } from "@/hooks";
import { UpdateAppointmentPopup } from "./UpdateAppointmentPopup";
import { useDoctorStore, useAppointmentStore } from "@/hooks";
import { useSession } from "next-auth/react";
import { PopupModal } from "./PopupModal";

interface AppointmentInfoPopupProps {
    appointment: Appointment | null
    onClose: () => void
}

export const AppointmentInfoPopup = ({ appointment, onClose }: AppointmentInfoPopupProps): JSX.Element => {
    const { openModal } = useModal();
    const { doctors } = useDoctorStore();
    const session = useSession();
    const { deleteAppointment } = PatientQueries(session);
    const { remove: removeAppointmentFromStore } = useAppointmentStore();


    function handleAppointmentDelete() {
        if (appointment) {
            deleteAppointment(appointment.appointmentId).then((res) => {
                if (res.success === true) {
                    // deleted
                    openModal(<PopupModal message={res.message ?? "Successfully deleted appointment"} type={"success"} />);
                    removeAppointmentFromStore(appointment.appointmentId);
                } else {
                    openModal(<PopupModal message={res.message ?? "Failed to delete appointment"} type="error" />);
                }
            }).catch((err) => {
                console.log(err);
                openModal(<PopupModal message={err?.response?.data?.message ?? "An error occurred while deleting the appointment"} type={"error"} />);
            })
        }
    }

    return (
        <div className={styles.doctorInfoPopup}>
            <div className={styles.dip_content}>
                <div className={`${styles.dip_info_strip} ${styles.dip_info_strip_row}`}>
                    <div className={styles.dip_info_strip_col}>
                        {/* data label */}
                        <h4>appointment: </h4>
                    </div>
                    <div className={styles.dip_info_strip_col}>
                        {/* data */}
                        <span>{appointment?.title}</span>
                    </div>
                </div>
                <div className={`${styles.dip_info_strip} ${styles.dip_info_strip_row}`}>
                    <div className={styles.dip_info_strip_col}>
                        {/* data label */}
                        <h4>Doctor: </h4>
                    </div>
                    <div className={styles.dip_info_strip_col}>
                        {/* data */}
                        <span>{appointment?.doctor}</span>
                    </div>
                </div>
                <div className={`${styles.dip_info_strip} ${styles.dip_info_strip_row}`}>
                    <div className={styles.dip_info_strip_col}>
                        {/* data label */}
                        <h4>Date: </h4>
                    </div>
                    <div className={styles.dip_info_strip_col}>
                        {/* data */}
                        <span>{new Date(appointment?.date ?? "").toLocaleDateString()}</span>
                    </div>
                </div>
                <div className={`${styles.dip_info_strip} ${styles.dip_info_strip_row}`}>
                    <div className={styles.dip_info_strip_col}>
                        {/* data label */}
                        <h4>Time: </h4>
                    </div>
                    <div className={styles.dip_info_strip_col}>
                        {/* data */}
                        <span>{parseTimeString(appointment?.time ?? "")}</span>
                    </div>
                </div>
                <div className={`${styles.dip_info_strip} ${styles.dip_info_strip_row} ${styles.dip_info_strip_btns}`}>
                    <div className={`${styles.dip_info_strip_col} ${styles.dip_info_strip_col_btns}`}>
                        {/* data label */}
                        {/* thinking of yellow-ish accent */}
                        <button data-elm-type={"archive_btn"} onClick={() => {
                            openModal(<UpdateAppointmentPopup appointment_id={appointment?.appointmentId ?? ""} initialValues={{
                                date: appointment?.date ?? new Date(),
                                note: appointment?.note ?? '',
                                time: appointment?.time ?? '',
                                title: appointment?.title ?? ''
                            }} targetDoctor={[...doctors.active, ...doctors.archived, ...doctors.inactive].find((doc) => doc.id === appointment?.doctor) ?? null} />)
                        }}><HiArchive />Update </button>
                    </div>
                    <div className={`${styles.dip_info_strip_col} ${styles.dip_info_strip_col_btns}`}>
                        {/* data */}
                        <button data-elm-type={"remove_btn"} onClick={() => {handleAppointmentDelete()}}><MdBlock />Delete</button>
                    </div>
                </div>
                {/* <div className={`${styles.dip_info_strip} ${styles.dip_info_strip_column} ${styles.dip_info_strip_btns}`}>
                    <div className={`${styles.dip_info_strip_col} ${styles.dip_info_strip_col_btns}`}>
                        data label
                        <button data-elm-type={"revoke_btn"}>{doctor.status === "inactive" ? <BsEyeFill /> :<BsEyeSlashFill />} {doctor.status === "inactive" ? "Enable Medical glimpse" : "Revoke Medical glimpse"}</button>
                    </div>
                </div> */}
            </div>
        </div>
    )
}