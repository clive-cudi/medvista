import { useTabs } from "@/hooks/useTabs";
import { DoctorDashboard } from "./DoctorDashboard";
import { MyPatients } from "./MyPatients";
import { DoctorSettings } from "./DoctorSettings";

export const DoctorPageCurrentTab = (): JSX.Element => {
    const { initialTab: currentTab } = useTabs();

    function renderCurrentTab() {
        switch (currentTab.currentTab) {
            case "dashboard":
                return <DoctorDashboard />
            case "myPatients":
                return <MyPatients />
            case "settings":
                return <DoctorSettings />
            default:
                return <DoctorDashboard />
        }
    }

    return (
        <>
            {renderCurrentTab()}
        </>
    )
}