import styles from "@styles/components/views/patient/myDoctors.module.scss";
import { DashboardTopNav } from "@/components/reusable";
import { Table } from "@/components/reusable";

export const MyDoctors = (): JSX.Element => {
    const tableConfig = {
        headers: ["Doctor", "Specialty", "Location", "Phone", "Email"],
        data: [
            ["Dr. John Doe", "Cardiologist", "123 Main St, New York, NY 10001", "(123) 456-7890", ""],
            ["Dr. Jane Doe", "Cardiologist", "123 Main St, New York, NY 10001", "(123) 456-7890", ""],
            ["Dr. John Doe", "Cardiologist", "123 Main St, New York, NY 10001", "(123) 456-7890", ""],
            ["Dr. Jane Doe", "Cardiologist", "123 Main St, New York, NY 10001", "(123) 456-7890", ""]
        ]
    };
    return (
        <div className={styles.myDoctors}>
            <div className={styles.pd_content}>
                    <DashboardTopNav />
                <div className={styles.pd_content_body}>
                    {/* display a table of doctors assigned to the patient */}
                    <div className={styles.pd_content_body_strip}>
                        <div className={styles.pd_content_body_card_title}><h3>My Doctors</h3></div>
                        <div className={styles.pd_content_body_card}>
                            <div className={styles.pd_content_body_card_title}><h3>Active</h3></div>
                            <div className={styles.pd_content_body_card_content}>
                                <Table tableConfig={tableConfig} clickableRows={true} />
                            </div>
                        </div>
                        <div className={styles.pd_content_body_card}>
                            <div className={styles.pd_content_body_card_title}><h3>Inactive</h3></div>
                            <div className={styles.pd_content_body_card_content}>
                                <Table tableConfig={tableConfig} clickableRows={true} />
                            </div>
                        </div>
                        <div className={styles.pd_content_body_card}>
                            <div className={styles.pd_content_body_card_title}><h3>Archived</h3></div>
                            <div className={styles.pd_content_body_card_content}>
                                <Table tableConfig={tableConfig} clickableRows={true} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}