import { api } from "../helpers";
import { SessionContextValue } from "next-auth/react";

export const PatientQueries = (session: SessionContextValue) => {
    const { data: session_data } = session;
    const { token } = session_data?.user ?? {token: "''"};

    return {
        getPatientById: async (id: string) => {
            const { data } = await api.get(`/patient/profile/${id}`, {
                headers: {
                    Authorization: token,
                },
            });
            return data;
        },
        getMedicalHistory: async () => {
            const { data } = await api.get("/patient/medical-history", {
                headers: {
                    Authorization: token,
                },
            });
            return data;
        },
        getMedicalHistoryByID: async (id: string) => {
            const { data } = await api.get(`/patient/medical-history/${id}`, {
                headers: {
                    Authorization: token,
                },
            });
            return data;
        },
        createMedicalHistory: async (data: any) => {
            const { data: res } = await api.post("/patient/medical-history", data, {
                headers: {
                    Authorization: token,
                },
            });
            return res;
        },
        updateMedicalHistory: async (id: string, data: any) => {
            const { data: res } = await api.post(`/patient/medical-history/${id}`, data, {
                headers: {
                    Authorization: token,
                },
            });
            return res;
        },
        deleteMedicalHistory: async (id: string) => {
            const { data } = await api.delete(`/patient/medical-history/${id}`, {
                headers: {
                    Authorization: token,
                },
            });
            return data;
        },
        getMyDoctors: async () => {
            const { data } = await api.get("/patient/my-doctors", {
                headers: {
                    Authorization: token,
                },
            });
            return data;
        },
    };
}