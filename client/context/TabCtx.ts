import React, { Dispatch, SetStateAction, createContext } from "react";
import { patientTabs, doctorTabs } from "@/types";

export interface TabTypes {
    currentTab: patientTabs | doctorTabs
}

export interface TabCtx_Props {
    tab: TabTypes
    setTab: Dispatch<SetStateAction<TabTypes>>
}

export const TabDefaults: TabTypes = {
    currentTab: "dashboard"
}

export const TabCtxDefaults: TabCtx_Props = {
    tab: TabDefaults,
    setTab: () => {}
}

export const TabCtx = createContext<TabCtx_Props | null>({...TabCtxDefaults});