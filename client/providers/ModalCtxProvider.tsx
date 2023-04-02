import { useState } from "react";
import { ModalCtx, ModalCtxTypes } from "@/context";

export const ModalCtxProvider = ({children}: any): JSX.Element => {
    const [modal, setModal] = useState<ModalCtxTypes>({
        open: false,
        data: null,
        autoClose: {
            status: false,
            closeTimeOut: 0
        },
        outerClickClose: false
    });

    return (
        <ModalCtx.Provider value={{modal, setModal}}>
            {children}
        </ModalCtx.Provider>
    )
}