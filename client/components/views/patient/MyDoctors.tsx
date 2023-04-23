import styles from "@styles/components/views/patient/myDoctors.module.scss";
import { DashboardTopNav, RegularBtn } from "@/components/reusable";
import { Table, DoctorInfoPopup, AddDoctorPopup } from "@/components/reusable";
import { useModal } from "@/hooks";
import { useState, useEffect } from "react";
import { PatientQueries } from "@/utils";
import { AiOutlinePlus } from "react-icons/ai";
import { useSession } from "next-auth/react";
import { Doctor } from "@/types";

interface TableConfigTypes {
    headers: string[];
    data: string[][];
    identifiers: string[]
}

export const MyDoctors = (): JSX.Element => {
    // const tableConfig = {
    //     headers: ["Doctor", "Specialty", "Location", "Phone", "Email"],
    //     data: [
    //         ["Dr. John Doe", "Cardiologist", "123 Main St, New York, NY 10001", "(123) 456-7890", ""],
    //         ["Dr. Jane Doe", "Cardiologist", "123 Main St, New York, NY 10001", "(123) 456-7890", ""],
    //         ["Dr. John Doe", "Cardiologist", "123 Main St, New York, NY 10001", "(123) 456-7890", ""],
    //         ["Dr. Jane Doe", "Cardiologist", "123 Main St, New York, NY 10001", "(123) 456-7890", ""]
    //     ]
    // };
    const { openModal } = useModal();
    const session = useSession();
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const { getMyDoctors } = PatientQueries(session);
    const [tableConfigActive, setTableConfigActive] = useState<TableConfigTypes>({
        headers: ["Doctor", "Specialty", "Location", "Phone", "Email"],
        data: [],
        identifiers: []
    });
    const [tableConfigInActive, setTableConfigInActive] = useState<TableConfigTypes>({
        headers: ["Doctor", "Specialty", "Location", "Phone", "Email"],
        data: [],
        identifiers: []
    });
    const [tableConfigArchived, setTableConfigArchived] = useState<TableConfigTypes>({
        headers: ["Doctor", "Specialty", "Location", "Phone", "Email"],
        data: [],
        identifiers: []
    });

    // const sampleDoctor: Doctor = {
    //     name: "clive",
    //     id: "jherhfge",
    //     email: "clivemaina41@gmail.com",
    //     isVerified: true,
    //     location: "fsdfhjis",
    //     phoneNumber: "0712261984",
    //     specialty: "cool",
    //     status: "active",
    //     usertype: "doctor"
    // }

    useEffect(() => {
        getMyDoctors().then((res) => {
            console.log(res);
            setTableConfigActive((prev) => ({
                ...prev,
                data: res.doctors.active.map((active_doc) => [active_doc.name, active_doc.specialty, active_doc.location, active_doc.phoneNumber, active_doc.email]),
                identifiers: res.doctors.active.map((adoc) => adoc.id)
            }));
            setTableConfigInActive((prev) => ({
                ...prev,
                data: res.doctors.inactive.map((inactive_doc) => [inactive_doc.name, inactive_doc.specialty, inactive_doc.location, inactive_doc.phoneNumber, inactive_doc.email]),
                identifiers: res.doctors.inactive.map((idoc) => idoc.id)
            }));
            setTableConfigArchived((prev) => ({
                ...prev,
                data: res.doctors.archived.map((archived_doc) => [archived_doc.name, archived_doc.specialty, archived_doc.location, archived_doc.phoneNumber, archived_doc.email]),
                identifiers: res.doctors.archived.map((a_doc) => a_doc.id)
            }));
            setDoctors(() => {
                return [...res.doctors.active, ...res.doctors.inactive, ...res.doctors.archived].map((doc) => {
                    return ({
                        ...doc
                    })
                })
            });
        }).catch((err) => {
            console.log(err);
        });
    }, []);


    return (
        <div className={styles.myDoctors}>
            <div className={styles.pd_content}>
                    <DashboardTopNav />
                <div className={styles.pd_content_body}>
                    {/* display a table of doctors assigned to the patient */}
                    <div className={styles.pd_content_body_strip}>
                        <div className={`${styles.pd_content_body_card_title} ${styles.pd_content_body_card_title_with_add}`}>
                            <span>
                                <h3>My Doctors</h3>
                            </span>
                            <span>
                                <RegularBtn withIcon={{status: true, icon: <AiOutlinePlus />, orientation: "start"}} onClick={() => {
                                    openModal(<AddDoctorPopup />);
                                }}>Add a doctor</RegularBtn>
                            </span>
                        </div>
                        <div className={styles.pd_content_body_card}>
                            <div className={styles.pd_content_body_card_title}><h3>Active</h3></div>
                            <div className={styles.pd_content_body_card_content}>
                                <Table tableConfig={tableConfigActive} clickableRows={true} onClickHandler={(e, ix) => {
                                    console.log(ix);
                                    console.log(tableConfigActive.data[ix.index]);
                                    console.log(doctors.find((dc) => dc.id == ix.identifier));
                                    console.log(doctors)
                                    // open a modal with the doctor's information
                                    openModal(<DoctorInfoPopup doctor={doctors.find((dc) => dc.id == ix.identifier) ?? null} onClose={() => {}} />);
                                }} />
                            </div>
                        </div>
                        <div className={styles.pd_content_body_card}>
                            <div className={styles.pd_content_body_card_title}><h3>Inactive</h3></div>
                            <div className={styles.pd_content_body_card_content}>
                                <Table tableConfig={tableConfigInActive} clickableRows={true} />
                            </div>
                        </div>
                        <div className={styles.pd_content_body_card}>
                            <div className={styles.pd_content_body_card_title}><h3>Archived</h3></div>
                            <div className={styles.pd_content_body_card_content}>
                                <Table tableConfig={tableConfigArchived} clickableRows={true} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}