import { Header, PageWrapper, FormWrapper, MockDiagnosisForm } from "@/components";
import { Doctor, Patient } from "@/types";
import { api } from "@/utils";
import styles from "@styles/pages/patient/patientHomepage.module.scss";
import { getSession } from "next-auth/react";

export default function MockDiagnosisPage({doctors, patients}: {doctors: Doctor[], patients: Patient[]}) {
    return (
        <>
            <Header title={"Medvista | Mock Doctors"}></Header>
            <PageWrapper style={{alignItems: "center", width: "100vw", justifyContent: "center"}}>
                <div className={styles.content_view} style={{alignItems: "center", width: "100vw", justifyContent: "center"}}>
                    <FormWrapper form={<MockDiagnosisForm patients={patients} doctors={doctors} />} title={"Add Mock Diagnosis"} />
                </div>
            </PageWrapper>
        </>
    )
}

export async function getServerSideProps(ctx: any) {
    const session = await getSession(ctx);
    return {
        props: {
            doctors: (await api.get(`/doctor/mock/doctors`)).data.doctors ?? [],
            patients: (await api.get(`/doctor/mock/patients`)).data.patients ?? []
        }
    }
}