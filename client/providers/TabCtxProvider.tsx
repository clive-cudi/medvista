import React, { useState, ReactNode } from "react";
import { TabCtx, TabTypes, TabDefaults } from "@/context";

export const TabCtxProvider = ({children}: {children: ReactNode}) => {
    const [tab, setTab] = useState<TabTypes>(TabDefaults);

    return (
        <TabCtx.Provider value={{tab, setTab}}>
            {children}
        </TabCtx.Provider>
    )
}