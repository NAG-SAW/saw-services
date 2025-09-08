import { Reservation } from "./ewash/booking-table/booking-table";

export async function fetchActiveBookings(date: Date): Promise<Reservation[]> {
    //TODO: replace placeholder for fetching bookings from an API
    const response = await fetch(`/api/bookings?date=${date.toISOString()}`);
    if (!response.ok) {
        throw new Error("Failed to fetch bookings");
    }
    return response.json();
}

export async function updateBookings(bookings: Reservation[]) {
    //TODO: replace placeholder for updating bookings via an API
    const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(bookings),
    });
    if (!response.ok) {
        throw new Error("Failed to update bookings");
    }
    return response.json();
}
