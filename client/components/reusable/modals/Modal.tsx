import React,{ useEffect } from "react";
import styles from "@/styles/components/reusable/modals/modal.module.scss";
import { useModal, useContextMenu } from "@/hooks";

interface modalPropTypes {
    data?: any,
    type?: "modal" | "context"
    styling?: React.CSSProperties,
    autoClose?: {
        closeTimeOut: number
    }
    outerClickClose?: boolean
    className?: string
    children?: any
}

export function Modal({data, type, styling, autoClose, outerClickClose, className, children }: modalPropTypes):JSX.Element {
    const { modal, closeModal } = useModal();
    const { ctxMenu, closeContextMenu } = useContextMenu();

    return (
        <div className={`${styles.modal_main_wrapper} ${className ?? ""}`} style={{...styling}} onClick={(e)=>{
            if (type === "context") {
                // handle ctx close
                closeContextMenu();
            } else {
                // handle default modal close
                closeModal()
            }
        }}>
            {
                data ?
                     <div className={`${styles.modal_content} ${modal.open == false ? styles.modal_out : ''}`} onClick={(e)=>{e.stopPropagation()}}>
                        {data}
                    </div> 
                : children
            }
        </div>
    )
}
