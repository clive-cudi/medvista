import { useState } from "react";
import { ContextMenuCtx, ContextMenuCtxDefaults, ContextMenuCtxTypes } from "@/context";

export const ContextMenuCtxProvider = ({ children }: any) => {
    const [ctxMenu, setCtxMenu] = useState<ContextMenuCtxTypes>(ContextMenuCtxDefaults);

    return (
        <ContextMenuCtx.Provider value={[ctxMenu, setCtxMenu]}>
            {children}
        </ContextMenuCtx.Provider>
    )
}