import { SessionContextValue } from "next-auth/react";
import { api } from "../helpers";
import { API_res_model, Patient } from "@/types";

export const DoctorQueries = (session: SessionContextValue) => {
  const { data: session_data } = session;
  const { token } = session_data?.user ?? { token: "" };

  return {
    getMyPatients: async () => {
      const { data } = await api.get<
        API_res_model & {
          patients: {
            active: Patient[];
            inactive: Patient[];
            archived: Patient[];
          };
        }
      >(`/doctor/patients`, {
        headers: {
          Authorization: token,
        },
      });

      return data;
    },
  };
};
