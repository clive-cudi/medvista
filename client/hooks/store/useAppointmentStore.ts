import { Appointment } from "@/types";
import { create } from "zustand";
import { getUniqueListBy } from "@/utils";

interface AppointmentStore_ {
    appointments: Appointment[],
    add: (appointment: Appointment) => void
    addBulk: (appointments: Appointment[]) => void
    remove: (appointment_id: string) => void;
    removeBulk: (appointment_ids: string[]) => void
}

export const useAppointmentStore = create<AppointmentStore_>()((set) => {
    return {
        appointments: [],
        add(appointment) {
            return set((state) => {
                return {appointments: getUniqueListBy([...state.appointments, appointment], "appointmentId")}
            })
        },
        addBulk(appointments) {
            return set((state) => {
                return {appointments: getUniqueListBy([...state.appointments, ...appointments], "appointmentId")}
            })
        },
        remove(appointment_id) {
            return set((state) => {
                return {appointments: state.appointments.filter((at_) => at_.appointmentId !== appointment_id)}
            })
        },
        removeBulk(appointment_ids) {
            return set((state) => {
                return {appointments: state.appointments.filter((at_) => !appointment_ids.includes(at_.appointmentId))}
            })            
        },
    }
})