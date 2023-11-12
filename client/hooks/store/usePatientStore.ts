import { Patient } from "@/types";
import { getUniqueListBy } from "@/utils";
import { create } from "zustand";

export type Patient_state = "active" | "inactive" | "archived";

interface PatientsByState {
  active: Patient[];
  inactive: Patient[];
  archived: Patient[];
}

interface PatientStore {
  patients: PatientsByState;
  add: (patient: Patient, patient_state: Patient_state) => void;
  addBulk: (patients: Patient[], patient_state: Patient_state) => void;
  remove: (patient_id: string) => void;
  removeBulk: (patient_ids: string[]) => void;
}

export const usePatientStore = create<PatientStore>()((set) => {
  return {
    patients: {
      active: [],
      inactive: [],
      archived: [],
    },
    add(patient, patient_state) {
      return set((state) => {
        return {
          patients: {
            ...state.patients,
            [patient_state]: getUniqueListBy(
              [...state.patients[patient_state], patient],
              "id"
            ),
          },
        };
      });
    },
    addBulk(patients, patient_state) {
      return set((state) => {
        return {
          patients: {
            ...state.patients,
            [patient_state]: getUniqueListBy(
              [...state.patients[patient_state], ...patients],
              "id"
            ),
          },
        };
      });
    },
    remove(patient_id) {
      return set((state) => {
        return {
          patients: Object.assign(
            {},
            ...Object.entries(state.patients).map(
              (p_entry: [string, Patient[]]) => ({
                key: p_entry[0],
                value: p_entry[1].filter((p_) => p_.id !== patient_id),
              })
            )
          ),
        };
      });
    },
    removeBulk(patient_ids) {
      return set((state) => {
        return {
          patients: Object.assign(
            {},
            ...Object.entries(state.patients).map(
              (p_entry: [string, Patient[]]) => ({
                key: p_entry[0],
                value: p_entry[1].filter((p_) => !patient_ids.includes(p_.id)),
              })
            )
          ),
        };
      });
    },
  };
});
