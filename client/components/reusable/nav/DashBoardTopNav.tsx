import styles from "@styles/components/reusable/nav/dashboardTopNav.module.scss";
import { SearchInput } from "../inputs";
import { ProfileIcon } from "../general";
import { useSession } from "next-auth/react";
import { FaCog, FaBell } from "react-icons/fa";
import { IconBtn } from "../buttons";

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
                            {/* <button><FaCog /></button> */}
                            <IconBtn><FaCog /></IconBtn>
                        </li>
                        <li>
                            {/* <button><FaBell /></button> */}
                            <IconBtn><FaBell /></IconBtn>
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