import { ReactNode } from "react";
import styles from "@/styles/components/reusable/modals/popupModal.module.scss";
import { useModal } from "@/hooks";
import { useRouter } from "next/router";
import { RegularBtn } from "../../reusable";
import { GoAlert } from 'react-icons/go';
import { FcInfo, FcOk } from "react-icons/fc";


interface ErrorModalPropTypes {
    message: string
    redirectUrl?: string
    icon?: JSX.Element | ReactNode
    title?: string
    btn_label?: string
    btn_onclick?: ()=> void
    disable_close_btn?: boolean
    type?: "error" | "info" | "success"
}

export function PopupModal({type = "error", message, redirectUrl, icon, title, btn_label, btn_onclick, disable_close_btn}: ErrorModalPropTypes): JSX.Element{
    const { closeModal } = useModal();
    const router = useRouter();

    function redirect(url: string){
        router.push(url)
    }

    function renderIcon(icon_ctx: typeof type): JSX.Element {
        switch (icon_ctx) {
            case "error":
                return <GoAlert fontSize={50} color={"crimson"} />;
            case "info":
                return <FcInfo fontSize={50} />;
            case "success":
                return <FcOk fontSize={50} />;
            default:
                return <GoAlert fontSize={50} />;
        }
    }

    return (
        <div className={styles.err_wrapper}>
            <div className={`${styles.err_icon} ${styles[`err_icon_${type}`]}`}>
                {icon ? icon : renderIcon(type) }
            </div>
            <div className={styles.err_info}>
                {/* <h2>{title ? title : `Error !`}</h2> */}
                <p>{message}</p>
                <div className={styles.err_btns}>
                    {/* <button className={styles.err_btns_button} onClick={()=>{
                        redirectUrl && redirect(redirectUrl);
                        if (disable_close_btn !== true){
                            closeModal()
                        }
                        btn_onclick && btn_onclick()
                    }}>{btn_label ? btn_label : `Ok, Try Again`}</button> */}
                    <RegularBtn label={btn_label ? btn_label : `Ok, Try Again`} onClick={() => {
                        redirectUrl && redirect(redirectUrl);
                        if (disable_close_btn !== true){
                            closeModal()
                        }
                        btn_onclick && btn_onclick()
                    }} variant={"outlined"} className={styles.err_btns_button} />
                </div>
            </div>
        </div>
    )
}