import { Doctor } from "@/types";
import { getUniqueListBy } from "@/utils";
import { create } from "zustand";

export type Doctor_state = "active" | "inactive" | "archived";

interface DoctorsByState {
    active: Doctor[],
    inactive: Doctor[],
    archived: Doctor[]
};

interface DoctorStore {
    doctors: DoctorsByState
    add: (doctor: Doctor, doctor_state: Doctor_state) => void;
    addBulk: (doctors: Doctor[], doctor_state: Doctor_state) => void
    remove: (doctor_id: string) => void
    removeBulk: (doctor_ids: string[]) => void
}

export const useDoctorStore = create<DoctorStore>()((set) => {
    return {
        doctors: {
            active: [],
            inactive: [],
            archived: []
        },
        add(doctor, doctor_state) {
            return set((state) => {
                return {doctors: {...state.doctors, [doctor_state]: getUniqueListBy([...state.doctors[doctor_state], doctor], "id")}}
            })
        },
        addBulk(doctors, doctor_state) {
            return set((state) => {
                return {doctors: {...state.doctors, [doctor_state]: getUniqueListBy([...state.doctors[doctor_state], ...doctors], "id")}}
            })
        },
        remove(doctor_id) {
            return set((state) => {
                return {doctors: Object.assign({}, ...Object.entries(state.doctors).map((doctor_entry: [string, Doctor[]]) => ({key: doctor_entry[0], value: doctor_entry[1].filter((doc_) => doc_.id !== doctor_id)})))}
            })
        },
        removeBulk(doctor_ids) {
            return set((state) => {
                return {doctors: Object.assign({}, ...Object.entries(state.doctors).map((doctor_entry: [string, Doctor[]]) => ({key: doctor_entry[0], value: doctor_entry[1].filter((doc_) => !doctor_ids.includes(doc_.id))})))}
            })
        }
    }
})