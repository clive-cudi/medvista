import { useState } from "react";
import { useModal } from "@/hooks";
import { IconBtn, RegularBtn } from "@/components/reusable";
import { AiOutlinePlus } from "react-icons/ai";
import { SearchInput } from "@/components/reusable";
import styles from "@styles/components/reusable/modals/doctorInfoPopup.module.scss";

export const AddDoctorPopup = (): JSX.Element => {
    // add search bar to search for doctors
    // add a table to display the results of the search
    // add a button to add the doctor to the patient's list of doctors
    const [searchQuery, setSearchQuery] = useState<string>("");
    const { closeModal } = useModal();

    const sampleResults = [
        {
            label: "Dr. John Doe",
            value: "Cardiologist",
            id: "1233"
        },
        {
            label: "Dr. Jane Doe",
            value: "Cardiologist",
            id: "1253"
        },
        {
            label: "Dr. John Doe",
            value: "Cardiologist",
            id: "1213"
        },
        {
            label: "Dr. Jane Doe",
            value: "Cardiologist",
            id: "123"
        },
    ];
    const [results, setResults] = useState([...sampleResults]);

    return (
        <div className={styles.doctorInfoPopup}>
            <div className={styles.dip_content}>
                <div className={styles.dip_info_strip}>
                    <div className={styles.dip_info_strip_col}>
                        <h4>Search for a doctor</h4>
                    </div>
                </div>
                <div className={`${styles.dip_info_strip} ${styles.with_search}`}>
                    <SearchInput value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} resultsData={[...sampleResults]} onResultClick={(e, result) => {
                        // console.log(result);
                    }} enableSuggestions={false} />
                    <RegularBtn data-elm-type={"search_btn"}>Search</RegularBtn>
                </div>
                <div className={`${styles.dip_info_strip} ${styles.search_results_wrapper}`}>
                    {results.length > 0 ? (
                        results.map((rslt) => {
                            return (
                                <div className={styles.dip_info_result}>
                                    <div className={styles.dip_info_result_col}>
                                        <span>{rslt.label}</span>
                                    </div>
                                    <div className={styles.dip_info_result_col}>
                                        <span>{rslt.label}</span>
                                    </div>
                                    <div className={styles.result_utils}>
                                        <span>
                                            <IconBtn></IconBtn>
                                        </span>
                                    </div>
                                </div>
                            )
                        })
                    ): (<div className={`${styles.dip_info_result} ${styles.info_result_null}`}>
                        No search results found
                    </div>)}
                </div>
            </div>
        </div>
    )
}