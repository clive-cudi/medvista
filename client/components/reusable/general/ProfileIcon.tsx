import styles from "@styles/components/reusable/general/profileIcon.module.scss";
import Image from "next/image";

interface User {
    firstName: string
    profilePicURL: string
}

interface ProfileIcon_Props {
    user: User | null
    onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
    withName?: boolean
}

export const ProfileIcon = ({ user, onClick, withName = false }: ProfileIcon_Props): JSX.Element => {
    return (
        <div className={styles.profile_icon_wrapper} onClick={onClick}>
            {
                withName ? (
                    <div className={styles.profile_icon_name}>
                        <span>{user?.firstName}</span>
                    </div>
                ) : null
            }
            <div className={styles.profile_icon}>
                <Image src={user?.profilePicURL ?? "/images/profile.png"} alt={`@${user?.firstName}`} fill />
            </div>
        </div>
    )
}