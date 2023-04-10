import { DashboardTopNav, Table, DiagnosisInfoPopup } from "@/components/reusable";
import styles from "@styles/components/views/patient/myDoctors.module.scss";
import type { Diagnosis } from "@/components/reusable";
import { useModal } from "@/hooks";

export const MyRecords = (): JSX.Element => {
    const tableConfig = {
        headers: ["Diagnosis", "Date", "Doctor", "isApproved"],
        data: [
            ["Diagnosis 1", "01/01/2021", "Dr. John Doe", "true"],
            ["Diagnosis 2", "01/01/2021", "Dr. Jane Doe", "false"],
            ["Diagnosis 3", "01/01/2021", "Dr. John Doe", "true"],
            ["Diagnosis 4", "01/01/2021", "Dr. Jane Doe", "false"]
        ]
    };
    const { openModal } = useModal();
    const sampleDiagnosis: Diagnosis = {
        diagnosis: "Diagnosis 1",
        date: "01/01/2021",
        doctor: "Dr. John Doe",
        symptoms: "Symptoms 1",
        treatment: "Treatment 1",
        isApproved: true,
        idPendingDelete: false,
        diagnosisId: "1"
    };

    return (
        <div className={`${styles.myDoctors} ${styles.myRecords}`}>
            <div className={styles.pd_content}>
                <DashboardTopNav />
                <div className={styles.pd_content_body}>
                    {/* display a table of doctors assigned to the patient */}
                    <div className={styles.pd_content_body_strip}>
                        <div className={styles.pd_content_body_card_title}><h3>My Records</h3></div>
                        <div className={styles.pd_content_body_card}>
                            <div className={styles.pd_content_body_card_content}>
                                <Table tableConfig={tableConfig} clickableRows={true} onClickHandler={(e, ix) => {
                                    console.log(ix);
                                    // open a modal with the diagnosis information
                                    openModal(<DiagnosisInfoPopup diagnosis={{...sampleDiagnosis}} onClose={() => {}} />);
                                }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}