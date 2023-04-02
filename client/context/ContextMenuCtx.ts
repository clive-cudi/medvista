import React from "react";

export interface ContextMenuCtxTypes {
    open: boolean
    coords: {
        top: number,
        left: number
    }
    orientation: "right" | "left" | "top" | "bottom"
    elements: JSX.Element[]
}

export type ContextMenuCtx_Props = [ctxMenu: ContextMenuCtxTypes, setCtxMenu: React.Dispatch<React.SetStateAction<ContextMenuCtxTypes>>]

export const ContextMenuCtxDefaults: ContextMenuCtxTypes = {
    open: false,
    coords: {
        top: 0,
        left: 0
    },
    orientation: "right",
    elements: []
}

export const ContextMenuCtx = React.createContext<null | ContextMenuCtx_Props>([ContextMenuCtxDefaults, ()=>{}]);