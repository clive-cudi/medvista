import { Header, PageWrapper, FormWrapper, MockDoctorsForm } from "@/components";
import styles from "@styles/pages/patient/patientHomepage.module.scss";

export default function MockDoctorsPage() {
    return (
        <>
            <Header title={"Medvista | Mock Doctors"}></Header>
            <PageWrapper style={{alignItems: "center", width: "100vw", justifyContent: "center"}}>
                <div className={styles.content_view} style={{alignItems: "center", width: "100vw", justifyContent: "center"}}>
                    <FormWrapper form={<MockDoctorsForm />} title={"Add Mock Doctors"} />
                </div>
            </PageWrapper>
        </>
    )
}