import styles from "@styles/components/reusable/modals/doctorInfoPopup.module.scss";
import { HiArchive } from "react-icons/hi";
import { BsEyeSlashFill, BsEyeFill } from "react-icons/bs";
import { MdBlock } from "react-icons/md";

export interface Diagnosis {
    diagnosisId: string;
    diagnosis: string;
    doctor: string;
    date: string;
    symptoms: string;
    treatment: string;
    isApproved: boolean;
    idPendingDelete: boolean;
}

interface DiagnosisInfoPopupProps {
    diagnosis: Diagnosis
    onClose: () => void
}

export const DiagnosisInfoPopup = ({ diagnosis, onClose }: DiagnosisInfoPopupProps): JSX.Element => {
    return (
        <div className={styles.doctorInfoPopup}>
            <div className={styles.dip_content}>
                <div className={`${styles.dip_info_strip} ${styles.dip_info_strip_row}`}>
                    <div className={styles.dip_info_strip_col}>
                        {/* data label */}
                        <h4>Diagnosis: </h4>
                    </div>
                    <div className={styles.dip_info_strip_col}>
                        {/* data */}
                        <span>{diagnosis.diagnosis}</span>
                    </div>
                </div>
                <div className={`${styles.dip_info_strip} ${styles.dip_info_strip_row}`}>
                    <div className={styles.dip_info_strip_col}>
                        {/* data label */}
                        <h4>Doctor: </h4>
                    </div>
                    <div className={styles.dip_info_strip_col}>
                        {/* data */}
                        <span>{diagnosis.doctor}</span>
                    </div>
                </div>
                <div className={`${styles.dip_info_strip} ${styles.dip_info_strip_row}`}>
                    <div className={styles.dip_info_strip_col}>
                        {/* data label */}
                        <h4>Date: </h4>
                    </div>
                    <div className={styles.dip_info_strip_col}>
                        {/* data */}
                        <span>{diagnosis.date}</span>
                    </div>
                </div>
                <div className={`${styles.dip_info_strip} ${styles.dip_info_strip_row}`}>
                    <div className={styles.dip_info_strip_col}>
                        {/* data label */}
                        <h4>Symptoms: </h4>
                    </div>
                    <div className={styles.dip_info_strip_col}>
                        {/* data */}
                        <span>{diagnosis.symptoms}</span>
                    </div>
                </div>
                <div className={`${styles.dip_info_strip} ${styles.dip_info_strip_row}`}>
                    <div className={styles.dip_info_strip_col}>
                        {/* data label */}
                        <h4>Treatment: </h4>
                    </div>
                    <div className={styles.dip_info_strip_col}>
                        {/* data */}
                        <span>{diagnosis.treatment}</span>
                    </div>
                </div>
                <div className={`${styles.dip_info_strip} ${styles.dip_info_strip_row}`}>
                    <div className={styles.dip_info_strip_col}>
                        {/* data label */}
                        <h4>Approved: </h4>
                    </div>
                    <div className={styles.dip_info_strip_col}>
                        {/* data */}
                        <span>{diagnosis.isApproved ? "Yes" : "No"}</span>
                    </div>
                </div>
                <div className={`${styles.dip_info_strip} ${styles.dip_info_strip_row} ${styles.dip_info_strip_btns}`}>
                    <div className={`${styles.dip_info_strip_col} ${styles.dip_info_strip_col_btns}`}>
                        {/* data label */}
                        {/* thinking of yellow-ish accent */}
                        <button data-elm-type={"archive_btn"}><HiArchive /> Request update </button>
                    </div>
                    <div className={`${styles.dip_info_strip_col} ${styles.dip_info_strip_col_btns}`}>
                        {/* data */}
                        <button data-elm-type={"remove_btn"}><MdBlock /> Request removal</button>
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