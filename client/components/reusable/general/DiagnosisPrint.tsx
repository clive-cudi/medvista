import React from "react";
import styles from "@styles/components/reusable/general/diagnosisPrint.module.scss";
import { Diagnosis } from "@/types";
import Image from "next/image";
import { useSession } from "next-auth/react";

export const DiagnosisPrint = React.forwardRef(({diagnosis}: {diagnosis: Diagnosis[]}, ref: any) => {
    const session = useSession();
    return (
        <div className={styles.cert_print_wrapper} ref={ref}>
            <style type="text/css" media="print">{"\
            @page {\ size: auto;\ }\
            "}</style>
            <div className={styles.cert_content}>
                {/* logo */}
                <div className={styles.logo}>
                    <Image src={"/logos/medvista_logo.png"} alt={"@medvista_logo"} fill />
                </div>
                <div className={styles.title}>
                    <h1>Medical records for {session.data?.user.name ?? ""}</h1>
                </div>
                <ul>
                    {diagnosis.map((d_) => {
                        return (
                            <li key={d_.diagnosisId}>
                                <div className="diag_info_strip">
                                    <span>Diagnosis: </span>
                                    <span>{d_.diagnosis}</span>
                                </div>
                                <div className="diag_info_strip">
                                    <span>Doctor: </span>
                                    <span>{d_.doctor}</span>
                                </div>
                                <div className="diag_info_strip">
                                    <span>Date: </span>
                                    <span>{new Date(d_.date).toLocaleDateString()}</span>
                                </div>
                                <div className="diag_info_strip">
                                    <span>Symptoms: </span>
                                    <span>{d_.symptoms}</span>
                                </div>
                                <div className="diag_info_strip">
                                    <span>Treatment: </span>
                                    <span>{d_.treatment}</span>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
});

DiagnosisPrint.displayName = "CertificatePrintPath";