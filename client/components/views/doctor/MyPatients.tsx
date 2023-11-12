import styles from "@styles/components/views/patient/myDoctors.module.scss";
import {
  DashboardTopNav,
  PatientInfoPopup,
  RegularBtn,
} from "@/components/reusable";
import { Table, DoctorInfoPopup, AddDoctorPopup } from "@/components/reusable";
import { useModal, useDoctorStore, usePatientStore } from "@/hooks";
import { useState, useEffect } from "react";
import { PatientQueries } from "@/utils";
import { AiOutlinePlus } from "react-icons/ai";
import { useSession } from "next-auth/react";
import { Doctor, Patient } from "@/types";

interface TableConfigTypes {
  headers: string[];
  data: string[][];
  identifiers: string[];
}

export const MyPatients = (): JSX.Element => {
  const { openModal } = useModal();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [tableConfigActive, setTableConfigActive] = useState<TableConfigTypes>({
    headers: ["Doctor", "Specialty", "Location", "Phone", "Email"],
    data: [],
    identifiers: [],
  });
  const [tableConfigInActive, setTableConfigInActive] =
    useState<TableConfigTypes>({
      headers: ["Doctor", "Specialty", "Location", "Phone", "Email"],
      data: [],
      identifiers: [],
    });
  const [tableConfigArchived, setTableConfigArchived] =
    useState<TableConfigTypes>({
      headers: ["Doctor", "Specialty", "Location", "Phone", "Email"],
      data: [],
      identifiers: [],
    });
  const { doctors: doctors_store } = useDoctorStore();
  const { patients: patients_store } = usePatientStore();

  useEffect(() => {
    setTableConfigActive((prev) => ({
      ...prev,
      data: patients_store.active.map((active_patient) => [
        active_patient.name,
        active_patient.location,
        active_patient.phoneNumber,
        active_patient.email,
      ]),
      identifiers: patients_store.active.map((adoc) => adoc.id),
    }));
    setTableConfigInActive((prev) => ({
      ...prev,
      data: patients_store.inactive.map((inactive_patient) => [
        inactive_patient.name,
        inactive_patient.location,
        inactive_patient.phoneNumber,
        inactive_patient.email,
      ]),
      identifiers: patients_store.inactive.map((idoc) => idoc.id),
    }));
    setTableConfigArchived((prev) => ({
      ...prev,
      data: patients_store.archived.map((archived_patient) => [
        archived_patient.name,
        archived_patient.location,
        archived_patient.phoneNumber,
        archived_patient.email,
      ]),
      identifiers: patients_store.archived.map((a_doc) => a_doc.id),
    }));
    setPatients(() => {
      return [
        ...patients_store.active,
        ...patients_store.inactive,
        ...patients_store.archived,
      ].map((doc) => {
        return {
          ...doc,
        };
      });
    });
  }, []);

  return (
    <div className={styles.myDoctors}>
      <div className={styles.pd_content}>
        <DashboardTopNav />
        <div className={styles.pd_content_body}>
          {/* display a table of doctors assigned to the patient */}
          <div className={styles.pd_content_body_strip}>
            <div
              className={`${styles.pd_content_body_card_title} ${styles.pd_content_body_card_title_with_add}`}
            >
              <span>
                <h3>My Patients</h3>
              </span>
              <span>
                <RegularBtn
                  withIcon={{
                    status: true,
                    icon: <AiOutlinePlus />,
                    orientation: "start",
                  }}
                  onClick={() => {
                    openModal(<AddDoctorPopup bookAppointmentOnClick />);
                  }}
                >
                  Add a patient
                </RegularBtn>
              </span>
            </div>
            <div className={styles.pd_content_body_card}>
              <div className={styles.pd_content_body_card_title}>
                <h3>Active</h3>
              </div>
              <div className={styles.pd_content_body_card_content}>
                <Table
                  tableConfig={tableConfigActive}
                  clickableRows={true}
                  onClickHandler={(e, ix) => {
                    console.log(ix);
                    console.log(tableConfigActive.data[ix.index]);
                    // open a modal with the doctor's information
                    openModal(
                      <PatientInfoPopup
                        patient={
                          patients.find((dc) => dc.id == ix.identifier) ?? null
                        }
                        onClose={() => {}}
                      />
                    );
                  }}
                />
              </div>
            </div>
            <div className={styles.pd_content_body_card}>
              <div className={styles.pd_content_body_card_title}>
                <h3>Inactive</h3>
              </div>
              <div className={styles.pd_content_body_card_content}>
                <Table tableConfig={tableConfigInActive} clickableRows={true} />
              </div>
            </div>
            <div className={styles.pd_content_body_card}>
              <div className={styles.pd_content_body_card_title}>
                <h3>Archived</h3>
              </div>
              <div className={styles.pd_content_body_card_content}>
                <Table tableConfig={tableConfigArchived} clickableRows={true} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
