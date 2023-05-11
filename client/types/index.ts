export interface Api_User_res {
    name: string;
    email: string;
    id: number;
    usertype: "doctor" | "patient";
    patient?: {
        id: string
        name: string
        diagnoses: string[]
        doctors: string[]
    }
    doctor?: {
        id: string
        name: string
        patients: string[]
    }
}

export interface API_res_model {
    success: boolean
    message: string
    usertoken: {
        user: Api_User_res | null
        token: string | null
    } | null
    error: {
        status: boolean
        code: string | null
        debug?: any
    }
}

export type userType_ = "doctor" | "patient"

export interface PageAuth {
    requireAuth: {
        auth: boolean
        userType: userType_
        multipleUserTypes?: {
            status: boolean
            supported: userType_[]
        }
    }
}

export type doctorTabs = "dashboard" | "myPatients" | "settings";
export type patientTabs = "dashboard" | "myDoctors" | "myRecords" | "settings";

export interface Doctor {
    id: string;
    name: string;
    email: string;
    usertype: "doctor";
    isVerified: boolean;
    location: string;
    phoneNumber: string;
    specialty: string;
    status: "active" | "inactive" | "archived"
}

export interface Patient {
    id: string;
    name: string;
    email: string;
    usertype: "patient";
    isVerified: boolean;
    location: string;
    phoneNumber: string;
}

export interface Diagnosis {
    diagnosisId: string;
    diagnosis: string;
    patient: string;
    doctor: string;
    symptoms: string;
    treatment: string;
    isApproved: boolean;
    isPendingDelete: boolean;
    date: Date;
}

export interface Appointment {
    appointmentId: string;
    patient: string;
    doctor: string;
    date: Date;
    time: string;
    duration: number;
    note: string;
}