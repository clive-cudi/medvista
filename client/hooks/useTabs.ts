import { useContext } from "react";
import { TabCtx_Props, TabCtx, TabTypes } from "@/context";
import { patientTabs, doctorTabs } from "@/types";

export function useTabs() {
    const { tab: initialTab, setTab } = useContext(TabCtx) as TabCtx_Props;

    function switchTab(tab: patientTabs | doctorTabs) {
        if (initialTab.currentTab !== tab) {
            setTab({
                currentTab: tab
            });

            return tab;
        }
    }

    return {
        initialTab,
        switchTab
    }
}