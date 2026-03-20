"use client";
import { CellContext, ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { Booking, BookingTable } from "../../tables/booking-table";
import {
    Reservation,
    TIME_SLOT_INTERVAL,
} from "../ewash/booking-table/ewash-booking-table";
import { PurchaseSummary } from "../ewash/booking-table/purchase-summary/purchase-summary";

const SPORTS_COLUMN_DEF: ColumnDef<Booking>[] = [
    {
        header: "Sports Room",
        accessorKey: "sports-room",
        cell: (row: CellContext<Booking, unknown>) => {
            return <div>{row.row.original.id}</div>;
        },
    },
    {
        header: "Time Slots",
        accessorKey: "timeslots",
        cell: (row: CellContext<Booking, unknown>) => {
            return <div></div>;
        },
    },
];

export function SportsBookingTable() {
    const [currentDate, setCurrentDate] = useState<Date | undefined>(
        new Date(),
    );
    const [currentBookings, setCurrentBookings] = useState<Reservation[]>([]);
    return (
        <div className="flex flex-row w-full gap-5 min-w-0">
            <div className="flex-1">
                <BookingTable
                    currentDate={currentDate}
                    currentUserId={""}
                    timeslotIntervals={[...TIME_SLOT_INTERVAL.slice(0, 7)]}
                    activeBookings={[]}
                    currentBookings={currentBookings}
                    headers={<div>Sports Room Booking Slots</div>}
                    columns={[
                        {
                            id: "sports-room",
                            name: "Sportraum",
                        },
                    ]}
                    setCurrentBookings={setCurrentBookings}
                />
            </div>
            <div className="flex-0">
                <PurchaseSummary
                    currentBookings={currentBookings}
                    setCurrentBookings={setCurrentBookings}
                    updateBookings={function (bookings: Reservation[]): void {
                        throw new Error("Function not implemented.");
                    }}
                />
            </div>
        </div>
    );
}
