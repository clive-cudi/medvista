import { useState } from "react";
import { TabCtx, TabTypes, TabDefaults } from "@/context";

export const TabCtxProvider = () => {
    const [tab, setTab] = useState<TabTypes>(TabDefaults);

    return (
        <TabCtx.Provider value={{tab, setTab}}>

        </TabCtx.Provider>
    )
}