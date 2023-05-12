import React from "react";
import styles from "@styles/components/reusable/general/diagnosisPrint.module.scss";
import { Diagnosis } from "@/types";

export const DiagnosisPrint = React.forwardRef(({diagnosis}: {diagnosis: Diagnosis[]}, ref: any) => {
    return (
        <div className={styles.cert_print_wrapper} ref={ref}>
            <style type="text/css" media="print">{"\
            @page {\ size: auto;\ }\
            "}</style>
            <div className={styles.cert_content}>
                {/* logo */}
                <div></div>
                <ul>
                    {diagnosis.map((d_) => {
                        return (
                            <li key={d_.diagnosisId}>
                                {JSON.stringify(d_)}
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
});

DiagnosisPrint.displayName = "CertificatePrintPath";