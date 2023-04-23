import React from "react";

export function useTime() {
    function getDayGreeting(prefix: string) {
        const hour = new Date().getHours();

        if (hour < 12) {
            return prefix + " " + "Morning";
        } else if (hour < 18) {
            return prefix + " " + "Afternoon";
        } else {
            return prefix + " " + "Evening"
        }
    }

    return {
        getDayGreeting
    }
}