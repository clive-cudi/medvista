import styles from "@styles/components/reusable/modals/doctorInfoPopup.module.scss";
import { HiArchive } from "react-icons/hi";
import { BsEyeSlashFill, BsEyeFill } from "react-icons/bs";
import { MdBlock } from "react-icons/md";
import { Doctor } from "@/types";

// export interface Doctor {
//     name: string
//     specialty: string
//     location: string
//     phone: string
//     email: string
//     id: string
//     status: "active" | "inactive" | "archived"
// }

interface DoctorInfoPopupProps {
    doctor: Doctor | null
    onClose: () => void
}

export const DoctorInfoPopup = ({ doctor, onClose }: DoctorInfoPopupProps): JSX.Element => {
    return (
        <div className={styles.doctorInfoPopup}>
            <div className={styles.dip_content}>
                <div className={`${styles.dip_info_strip} ${styles.dip_info_strip_row}`}>
                    <div className={styles.dip_info_strip_col}>
                        {/* data label */}
                        <h4>Name: </h4>
                    </div>
                    <div className={styles.dip_info_strip_col}>
                        {/* data */}
                        <span>{doctor?.name}</span>
                    </div>
                </div>
                <div className={`${styles.dip_info_strip} ${styles.dip_info_strip_row}`}>
                    <div className={styles.dip_info_strip_col}>
                        {/* data label */}
                        <h4>Specialty: </h4>
                    </div>
                    <div className={styles.dip_info_strip_col}>
                        {/* data */}
                        <span>{doctor?.specialty}</span>
                    </div>
                </div>
                <div className={`${styles.dip_info_strip} ${styles.dip_info_strip_row}`}>
                    <div className={styles.dip_info_strip_col}>
                        {/* data label */}
                        <h4>Email: </h4>
                    </div>
                    <div className={styles.dip_info_strip_col}>
                        {/* data */}
                        <span>{doctor?.email}</span>
                    </div>
                </div>
                <div className={`${styles.dip_info_strip} ${styles.dip_info_strip_row}`}>
                    <div className={styles.dip_info_strip_col}>
                        {/* data label */} 
                        <h4>Phone: </h4>
                    </div>
                    <div className={styles.dip_info_strip_col}>
                        {/* data */}
                        <span>{doctor?.phoneNumber}</span>
                    </div>
                </div>
                <div className={`${styles.dip_info_strip} ${styles.dip_info_strip_column}`}>
                    <div className={styles.dip_info_strip_col}>
                        {/* data label */}
                        <h4>Location: </h4>
                    </div>
                    <div className={styles.dip_info_strip_col}>
                        {/* data */}
                        <span>{doctor?.location}</span>
                    </div>
                </div>
                <div className={`${styles.dip_info_strip} ${styles.dip_info_strip_row}`}>
                    <div className={styles.dip_info_strip_col}>
                        {/* data label */}
                        <h4>Status: </h4>
                    </div>
                    <div className={styles.dip_info_strip_col}>
                        {/* data */}
                        <span>{doctor?.status}</span>
                    </div>
                </div>
                <div className={`${styles.dip_info_strip} ${styles.dip_info_strip_row} ${styles.dip_info_strip_btns}`}>
                    <div className={`${styles.dip_info_strip_col} ${styles.dip_info_strip_col_btns}`}>
                        {/* data label */}
                        {/* thinking of yellow-ish accent */}
                        <button data-elm-type={"archive_btn"}><HiArchive /> {doctor?.status === "archived" ? "Unarchive" : "Archive"}</button>
                    </div>
                    <div className={`${styles.dip_info_strip_col} ${styles.dip_info_strip_col_btns}`}>
                        {/* data */}
                        <button data-elm-type={"remove_btn"}><MdBlock /> Remove Doctor</button>
                    </div>
                </div>
                <div className={`${styles.dip_info_strip} ${styles.dip_info_strip_column} ${styles.dip_info_strip_btns}`}>
                    <div className={`${styles.dip_info_strip_col} ${styles.dip_info_strip_col_btns}`}>
                        {/* data label */}
                        <button data-elm-type={"revoke_btn"}>{doctor?.status === "inactive" ? <BsEyeFill /> :<BsEyeSlashFill />} {doctor?.status === "inactive" ? "Enable Medical glimpse" : "Revoke Medical glimpse"}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}