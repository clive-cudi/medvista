import styles from "../../styles/components/reusable/general/ctxMenu.module.scss";
import { Modal, ContextMenu, ContextMenu_Props } from "../reusable";

export const ContextMenuWrapper = ({...ctxMenuProps}: ContextMenu_Props):JSX.Element => {
    return (
        <Modal type={"context"} className={styles.ctx_menu_wrapper}>
            <ContextMenu {...ctxMenuProps} />
        </Modal>
    )
}