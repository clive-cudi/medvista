import { DashboardTopNav, Table, DiagnosisInfoPopup } from "@/components/reusable";
import styles from "@styles/components/views/patient/myDoctors.module.scss";
import { Diagnosis } from "@/types";
import { useModal } from "@/hooks";
import { useEffect, useState } from "react";
import { PatientQueries } from "@/utils";
import { useSession } from "next-auth/react";

interface TableConfigTypes {
    headers: string[];
    data: string[][];
    identifiers: string[]
}

export const MyRecords = (): JSX.Element => {
    // const tableConfig = {
    //     headers: ["Diagnosis", "Date", "Doctor", "isApproved"],
    //     data: [
    //         ["Diagnosis 1", "01/01/2021", "Dr. John Doe", "true"],
    //         ["Diagnosis 2", "01/01/2021", "Dr. Jane Doe", "false"],
    //         ["Diagnosis 3", "01/01/2021", "Dr. John Doe", "true"],
    //         ["Diagnosis 4", "01/01/2021", "Dr. Jane Doe", "false"]
    //     ],
    //     identifiers: []
    // };
    const { openModal } = useModal();
    const sampleDiagnosis: Diagnosis = {
        diagnosis: "Diagnosis 1",
        date: new Date(),
        doctor: "Dr. John Doe",
        symptoms: "Symptoms 1",
        treatment: "Treatment 1",
        isApproved: true,
        isPendingDelete: false,
        diagnosisId: "1",
        patient: "fhwuegfruy"
    };
    const session = useSession();
    const { getMedicalHistory } = PatientQueries(session);
    const [tableConfig, setTableConfig] = useState<TableConfigTypes>({
        headers: ["Diagnosis", "Date", "Doctor", "isApproved"],
        data: [],
        identifiers: []
    });
    const [medicalHistory, setMedicalHistory] = useState<Diagnosis[]>([]);

    useEffect(() => {
        // fetch records from the database
        getMedicalHistory().then((res) => {
            console.log(res);
            setTableConfig((prev) => ({
                ...prev,
                data: res.medical_history.map((diag) => ([diag.diagnosis, diag.date.toString(), diag.doctor, `${diag.isApproved}`])),
                identifiers: res.medical_history.map((med_stry) => med_stry.diagnosisId)
            }));
            setMedicalHistory((prev) => res.medical_history.map((r) => r));
        }).catch((err) => {
            console.log(err);
        })
    }, [])

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
                                    openModal(<DiagnosisInfoPopup diagnosis={medicalHistory.find((mh) => mh.diagnosisId === ix.identifier) ?? null} onClose={() => {}} />);
                                }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}