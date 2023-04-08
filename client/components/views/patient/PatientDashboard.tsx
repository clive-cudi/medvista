import styles from "@styles/components/views/patient/patientDashboard.module.scss";
import { DashboardTopNav } from "@/components";

export const PatientDashboard = (): JSX.Element => {
    return (
        <div className={styles.patientDashboard}>
            <div className={styles.pd_content}>
                <div className={styles.pd_content_header}>
                    {/* <div className={styles.pd_content_header_title}>
                        <h1>My Dashboard</h1>
                    </div> */}
                    <DashboardTopNav />
                    <div className={styles.pd_greeting_banner}>
                        <h2>Good Morning, <span>John Doe</span></h2>
                    </div>
                </div>
            </div>
        </div>
    )
}