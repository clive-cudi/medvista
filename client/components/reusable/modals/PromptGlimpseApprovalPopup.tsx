import { useDoctorStore, useModal } from "@/hooks";
import { Doctor } from "@/types";
import { PatientQueries } from "@/utils";
import styles from "@styles/components/reusable/modals/doctorInfoPopup.module.scss";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { BsEyeSlashFill, BsEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { RegularBtn } from "../buttons";

interface IPromptGlimpseApprovalPopupProps {
  doctor: Doctor;
}

export const PromptGlimpseApprovalPopup = ({
  doctor,
}: IPromptGlimpseApprovalPopupProps) => {
  const session = useSession();
  const { approveGlimpse } = PatientQueries(session);
  const { closeModal } = useModal();
  const [message, setMessage] = useState<{
    message: string;
    type: "info" | "error";
  }>({ message: "", type: "info" });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { doctors } = useDoctorStore();
  const [isActive, setIsActive] = useState(false);

  function resetMessage() {
    setMessage({ message: "", type: "info" });
  }

  function handleApprove() {
    setIsLoading(true);
    resetMessage();
    approveGlimpse(doctor.id)
      .then((res) => {
        setIsLoading(false);
        console.log(res);
        if (res.success) {
          closeModal();
        } else {
          setMessage({ message: res.message, type: "error" });
        }
        return;
      })
      .catch((err) => {
        setIsLoading(false);
        setMessage({
          type: "error",
          message: err?.response?.data?.message ?? "An error occurred",
        });
        console.log(err);
        return;
      });
  }

  function handleRevoke() {}

  useEffect(() => {
    // check if the doctor is already active
    const activeDoctorIds = doctors.active.map((dc) => dc.id);
    if (activeDoctorIds.includes(doctor.id)) {
      // the doctor is already active
      setIsActive(true);
    }
  }, []);
  return (
    <div className={styles.doctorInfoPopup}>
      <div className={styles.dip_content}>
        <div className={`${styles.dip_info_strip}`}>
          <div className={styles.dip_info_strip_col}>
            <h4>Consent</h4>
          </div>
        </div>
        <div className={`${styles.dip_info_strip}`}>
          <div className={styles.dip_info_strip_col}>
            <p>
              {isActive
                ? "Revoke approval for medical glimpse"
                : "Confirm approval for medical glimpse"}
            </p>
          </div>
        </div>
        <div
          className={`${styles.dip_info_strip} ${styles.dip_info_strip_row}`}
        >
          <div className={styles.dip_info_strip_col}>
            {/* data label */}
            <h4>Name: </h4>
          </div>
          <div className={styles.dip_info_strip_col}>
            {/* data */}
            <span>{doctor?.name}</span>
          </div>
        </div>
        <div
          className={`${styles.dip_info_strip} ${styles.dip_info_strip_row}`}
        >
          <div className={styles.dip_info_strip_col}>
            {/* data label */}
            <h4>Specialty: </h4>
          </div>
          <div className={styles.dip_info_strip_col}>
            {/* data */}
            <span>{doctor?.speciality}</span>
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
            <span>{doctor?.email}</span>
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
            <span>{doctor?.phoneNumber}</span>
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
            <span>{doctor?.location}</span>
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
            <span>{doctor?.status}</span>
          </div>
        </div>
        <div
          className={`${styles.dip_info_strip} ${styles.dip_info_strip_column} ${styles.dip_info_strip_btns}`}
        >
          <span data-elm-type={`tag_${message.type}`}>*{message.message}</span>
          {isActive ? (
            <span data-elm-type={`tag_info`}>
              *[Note] This doctor already has approval for medical glimpse.
            </span>
          ) : null}
        </div>
        <div
          className={`${styles.dip_info_strip} ${styles.dip_info_strip_column} ${styles.dip_info_strip_btns}`}
        >
          <div
            className={`${styles.dip_info_strip_col} ${styles.dip_info_strip_col_btns}`}
            style={{ justifyContent: "center" }}
          >
            {/* data label */}
            {/* <button data-elm-type={"revoke_btn"} onClick={handleApprove}>
              <BsEyeFill />
              Approve Medical glimpse
            </button> */}
            <RegularBtn
              variant={isActive ? "red" : "gradient_dark"}
              isLoading={{ status: isLoading }}
              onClick={isActive ? handleRevoke : handleApprove}
              style={{ justifySelf: "center" }}
            >
              {isActive ? (
                <>
                  <BsFillEyeSlashFill />
                  Revoke Medical glimpse
                </>
              ) : (
                <>
                  <BsEyeFill />
                  Approve Medical glimpse
                </>
              )}
            </RegularBtn>
          </div>
        </div>
      </div>
    </div>
  );
};
