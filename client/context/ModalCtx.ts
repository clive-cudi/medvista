import React, { createContext, ReactNode } from "react";

export interface ModalCtxTypes {
    open: boolean
    data: JSX.Element | ReactNode | null,
    autoClose?: {
        status: boolean
        closeTimeOut: number
    }
    outerClickClose?: boolean
}

const ModalCtx_template_val: ModalCtxTypes = {
    open: false,
    data: null,
    autoClose: {
        status: false,
        closeTimeOut: 0
    },
    outerClickClose: false
}

export interface modalCtx_Props {
    modal: ModalCtxTypes,
    setModal: React.Dispatch<React.SetStateAction<ModalCtxTypes>>
}

export const ModalCtx = createContext<modalCtx_Props | null>({modal: ModalCtx_template_val, setModal: ()=>{}});