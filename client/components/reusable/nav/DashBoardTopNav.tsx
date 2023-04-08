import styles from "@styles/components/reusable/nav/dashboardTopNav.module.scss";
import { SearchInput } from "../inputs";
import { ProfileIcon } from "../general";
import { useSession } from "next-auth/react";
import { FaCog } from "react-icons/fa";

export const DashboardTopNav = (): JSX.Element => {
    const { data: session } = useSession();

    return (
        <nav className={styles.dtn_wrapper}>
            <div className={styles.dtn_content}>
                <div className={styles.dtn_content_col}>
                    <SearchInput />
                </div>
                <div className={styles.dtn_content_col}>
                    <ul>
                        <li>
                            <button><FaCog /></button>
                        </li>
                        <li>
                            <ProfileIcon user={{...session?.user, firstName: session?.user.name ?? "", profilePicURL: "https://source.unsplash.com/random"}} onClick={() => {}} />
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}