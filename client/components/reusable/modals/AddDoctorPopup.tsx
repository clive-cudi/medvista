import { useState, useEffect } from "react";
import { useModal } from "@/hooks";
import {
  BookAppointmentPopup,
  IconBtn,
  PromptGlimpseApprovalPopup,
  RegularBtn,
} from "@/components/reusable";
import { AiOutlinePlus } from "react-icons/ai";
import { SearchInput } from "@/components/reusable";
import styles from "@styles/components/reusable/modals/doctorInfoPopup.module.scss";
import { PatientQueries } from "@/utils";
import { useSession } from "next-auth/react";
import { Doctor } from "@/types";

interface AddDoctorPopup_Props {
  bookAppointmentOnClick?: boolean;
}

export const AddDoctorPopup = ({
  bookAppointmentOnClick,
}: AddDoctorPopup_Props): JSX.Element => {
  // add search bar to search for doctors
  // add a table to display the results of the search
  // add a button to add the doctor to the patient's list of doctors
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { closeModal, openModal } = useModal();
  const session = useSession();
  const { searchDoctor } = PatientQueries(session);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const sampleResults = [
    {
      label: "Dr. John Doe",
      value: "Cardiologist",
      id: "1233",
    },
    {
      label: "Dr. Jane Doe",
      value: "Cardiologist",
      id: "1253",
    },
    {
      label: "Dr. John Doe",
      value: "Cardiologist",
      id: "1213",
    },
    {
      label: "Dr. Jane Doe",
      value: "Cardiologist",
      id: "123",
    },
  ];
  const [results, setResults] = useState<Doctor[]>([]);

  function submitSearchQuery() {
    setIsLoading(true);
    if (searchQuery) {
      console.log(searchQuery);
      searchDoctor(searchQuery)
        .then((res) => {
          setIsLoading(false);
          setResults(res.doctors);
          return;
        })
        .catch((err) => {
          setIsLoading(false);
          console.log(err);
          return;
        });
    }
  }

  function handleDoctorSearchResultClick(doctor: Doctor) {
    // open another modal for booking an appointment
    if (bookAppointmentOnClick) {
      // modal
      openModal(<PromptGlimpseApprovalPopup doctor={doctor} />);
    }
  }

  return (
    <div className={styles.doctorInfoPopup}>
      <div className={styles.dip_content}>
        <div className={styles.dip_info_strip}>
          <div className={styles.dip_info_strip_col}>
            <h4>Search for a doctor</h4>
          </div>
        </div>
        <div className={`${styles.dip_info_strip} ${styles.with_search}`}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <SearchInput
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              resultsData={[...sampleResults]}
              onResultClick={(e, result) => {
                // console.log(result);
              }}
              enableSuggestions={false}
            />
            <RegularBtn
              type={"submit"}
              data-elm-type={"search_btn"}
              onClick={() => {
                submitSearchQuery();
              }}
              isLoading={{ status: isLoading }}
            >
              Search
            </RegularBtn>
          </form>
        </div>
        <div
          className={`${styles.dip_info_strip} ${styles.search_results_wrapper}`}
        >
          {results?.length > 0 ? (
            results.map((rslt, ix) => {
              return (
                <div
                  key={ix}
                  className={styles.dip_info_result}
                  onClick={() => {
                    handleDoctorSearchResultClick(rslt);
                  }}
                >
                  <div className={styles.dip_info_result_col}>
                    <span>{rslt.name}</span>
                  </div>
                  <div className={styles.dip_info_result_col}>
                    <span>{rslt.speciality}</span>
                  </div>
                  {/* <div className={styles.result_utils}>
                                        <span>
                                            <IconBtn></IconBtn>
                                        </span>
                                    </div> */}
                </div>
              );
            })
          ) : (
            <div
              className={`${styles.dip_info_result} ${styles.info_result_null}`}
            >
              No search results found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
