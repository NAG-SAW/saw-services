import { Trash, WashingMachineIcon } from "lucide-react";
import React from "react";
import { MdLocalLaundryService } from "react-icons/md";
import { Button } from "../../button";
import { sameDay } from "../../utils/dateutils";
import {
    machines,
    Reservation,
    TIME_SLOT_INTERVAL,
} from "../booking-table/booking-table";

type MachineEntryProps = {
    booking: Reservation;
    currentBookings: Reservation[];
    setCurrentBookings: React.Dispatch<React.SetStateAction<Reservation[]>>;
};

export function MachineEntry({
    booking,
    setCurrentBookings,
}: MachineEntryProps) {
    const machine = machines.find((m) => m.id === booking.machineId);
    return (
        <div className="flex flex-row items-center gap-2 border-b py-2 last:border-0">
            {machine?.type === "washer" ? (
                <MdLocalLaundryService size={25} color="#5EE9B5" />
            ) : (
                <WashingMachineIcon size={23} color="#5EE9B5" />
            )}
            {machine?.name}: {TIME_SLOT_INTERVAL[booking.timeSlot]}
            <Button
                variant="ghost"
                className="ml-auto text-red-300"
                onClick={() => {
                    setCurrentBookings((prev: Reservation[]) =>
                        prev.filter(
                            (b) =>
                                !(
                                    b.machineId === booking.machineId &&
                                    b.timeSlot === booking.timeSlot &&
                                    sameDay(b.date, booking.date)
                                )
                        )
                    );
                }}
            >
                <Trash size={16} />
            </Button>
        </div>
    );
}
