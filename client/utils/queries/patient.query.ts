import { api } from "../helpers";
import { SessionContextValue } from "next-auth/react";
import { API_res_model, Appointment, Diagnosis, Doctor, Patient } from "@/types";

export const PatientQueries = (session: SessionContextValue) => {
    const { data: session_data } = session;
    const { token } = session_data?.user ?? {token: "''"};

    return {
        getPatientById: async (id: string) => {
            const { data } = await api.get<API_res_model & Patient>(`/patient/profile/${id}`, {
                headers: {
                    Authorization: token,
                },
            });
            return data;
        },
        getMedicalHistory: async () => {
            const { data } = await api.get<API_res_model & {medical_history: Diagnosis[]}>("/patient/medical-history", {
                headers: {
                    Authorization: token,
                },
            });
            return data;
        },
        getMedicalHistoryByID: async (id: string) => {
            const { data } = await api.get<API_res_model & Diagnosis>(`/patient/medical-history/${id}`, {
                headers: {
                    Authorization: token,
                },
            });
            return data;
        },
        createMedicalHistory: async (data: any) => {
            const { data: res } = await api.post<API_res_model & Diagnosis>("/patient/medical-history", data, {
                headers: {
                    Authorization: token,
                },
            });
            return res;
        },
        updateMedicalHistory: async (id: string, data: any) => {
            const { data: res } = await api.post<API_res_model & Diagnosis>(`/patient/medical-history/${id}`, data, {
                headers: {
                    Authorization: token,
                },
            });
            return res;
        },
        deleteMedicalHistory: async (id: string) => {
            const { data } = await api.delete<API_res_model & Diagnosis>(`/patient/medical-history/${id}`, {
                headers: {
                    Authorization: token,
                },
            });
            return data;
        },
        getMyDoctors: async () => {
            const { data } = await api.get<API_res_model & {doctors: {active: Doctor[], inactive: Doctor[], archived: Doctor[]}}>("/patient/my-doctors", {
                headers: {
                    Authorization: token,
                },
            });
            return data;
        },
        searchDoctor: async (query: string) => {
            // console.log("Searching doctor: " + query);
            const { data } = await api.get<API_res_model & {doctors: Doctor[]}>(`/doctor/search/${query}`, {
                headers: {
                    Authorization: token
                }
            });
            return data;
        },
        createAppointment: async (data: any) => {
            const { data: res } = await api.post<API_res_model & {appointment: Appointment}>(`/patient/appointments`, data, {
                headers: {
                    Authorization: token
                }
            });
            return res;
        },
        getAllAppointments: async () => {
            const { data } = await api.get<API_res_model & {appointments: Appointment[]}>(`/patient/appointments`, {
                headers: {
                    Authorization: token
                }
            });
            return data;
        },
        getAppointmentByID: async (id: string) => {
            return (await api.get<API_res_model & {appointment: Appointment}>(`/patient/appointments/${id}`, {
                headers: {
                    Authorization: token
                }
            })).data;
        },
        updateAppointment: async (id: string, data: {}) => {
            return (await api.post<API_res_model & {appointment: Appointment}>(`/patient/appointments/${id}`, data, {
                headers: {
                    Authorization: token
                }
            })).data
        },
        deleteAppointment: async (id: string) => {
            return (await api.delete<API_res_model & {appointment: Appointment}>(`/patient/appointments/${id}`, {
                headers: {
                    Authorization: token
                }
            })).data;
        }
    };
}