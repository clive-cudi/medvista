import { useTabs } from "@/hooks/useTabs";
import { PatientDashboard } from "./PatientDashboard";
import { MyDoctors } from "./MyDoctors";
import { MyRecords } from "./MyRecords";
import { PatientSettings } from "./PatientSettings";

export const PatientPageCurrentTab = (): JSX.Element => {
    const { initialTab: currentTab, switchTab } = useTabs();
    
    function renderCurrentTab() {
        switch (currentTab.currentTab) {
            case "dashboard":
                return <PatientDashboard />
            case "myDoctors":
                return <MyDoctors />
            case "myRecords":
                return <MyRecords />
            case "settings":
                return <PatientSettings />
            default:
                return <PatientDashboard />
        }
    }

    return (
        <>
            {renderCurrentTab()}
        </>
    )
}