import styles from "@styles/components/reusable/modals/doctorInfoPopup.module.scss";
import { HiArchive } from "react-icons/hi";
import { BsEyeSlashFill, BsEyeFill } from "react-icons/bs";
import { MdBlock } from "react-icons/md";
import { Doctor, Patient } from "@/types";

interface PatientInfoPopupProps {
  patient: Patient | null;
  onClose: () => void;
}

export const PatientInfoPopup = ({
  patient,
  onClose,
}: PatientInfoPopupProps): JSX.Element => {
  return (
    <div className={styles.doctorInfoPopup}>
      <div className={styles.dip_content}>
        <div
          className={`${styles.dip_info_strip} ${styles.dip_info_strip_row}`}
        >
          <div className={styles.dip_info_strip_col}>
            {/* data label */}
            <h4>Name: </h4>
          </div>
          <div className={styles.dip_info_strip_col}>
            {/* data */}
            <span>{patient?.name}</span>
          </div>
        </div>
        <div
          className={`${styles.dip_info_strip} ${styles.dip_info_strip_row}`}
        >
          <div className={styles.dip_info_strip_col}>
            {/* data label */}
            <h4>Email: </h4>
          </div>
          <div className={styles.dip_info_strip_col}>
            {/* data */}
            <span>{patient?.email}</span>
          </div>
        </div>
        <div
          className={`${styles.dip_info_strip} ${styles.dip_info_strip_row}`}
        >
          <div className={styles.dip_info_strip_col}>
            {/* data label */}
            <h4>Phone: </h4>
          </div>
          <div className={styles.dip_info_strip_col}>
            {/* data */}
            <span>{patient?.phoneNumber}</span>
          </div>
        </div>
        <div
          className={`${styles.dip_info_strip} ${styles.dip_info_strip_column}`}
        >
          <div className={styles.dip_info_strip_col}>
            {/* data label */}
            <h4>Location: </h4>
          </div>
          <div className={styles.dip_info_strip_col}>
            {/* data */}
            <span>{patient?.location}</span>
          </div>
        </div>
        <div
          className={`${styles.dip_info_strip} ${styles.dip_info_strip_row}`}
        >
          <div className={styles.dip_info_strip_col}>
            {/* data label */}
            <h4>Status: </h4>
          </div>
          <div className={styles.dip_info_strip_col}>
            {/* data */}
            <span>{patient?.status}</span>
          </div>
        </div>
        <div
          className={`${styles.dip_info_strip} ${styles.dip_info_strip_row} ${styles.dip_info_strip_btns}`}
        >
          <div
            className={`${styles.dip_info_strip_col} ${styles.dip_info_strip_col_btns}`}
          >
            {/* data label */}
            {/* thinking of yellow-ish accent */}
            <button data-elm-type={"archive_btn"}>
              <HiArchive />{" "}
              {patient?.status === "archived" ? "Unarchive" : "Archive"}
            </button>
          </div>
          <div
            className={`${styles.dip_info_strip_col} ${styles.dip_info_strip_col_btns}`}
          >
            {/* data */}
            <button data-elm-type={"remove_btn"}>
              <MdBlock /> Remove patient
            </button>
          </div>
        </div>
        <div
          className={`${styles.dip_info_strip} ${styles.dip_info_strip_column} ${styles.dip_info_strip_btns}`}
        >
          <div
            className={`${styles.dip_info_strip_col} ${styles.dip_info_strip_col_btns}`}
          >
            {/* data label */}
            <button data-elm-type={"revoke_btn"}>
              {patient?.status === "inactive" ? (
                <BsEyeFill />
              ) : (
                <BsEyeSlashFill />
              )}{" "}
              {patient?.status === "inactive"
                ? "Request Medical glimpse"
                : "Cancel Medical glimpse request"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
