import { PlusIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { SlTag } from "react-icons/sl";
import { Button } from "../../../button";
import { sameDay } from "../../../utils/dateutils";
import { Machine, Reservation } from "./booking-table";

type TimeSlotButtonProps = {
    slotIndex: number;
    machine: Machine;
    currentDate: Date;
    currentUserId: string;
    activeBookings: Reservation[];
    currentBookings: Reservation[];
    setCurrentBookings: React.Dispatch<React.SetStateAction<Reservation[]>>;
};

export function TimeSlotButton({
    slotIndex,
    machine,
    currentDate,
    currentUserId,
    activeBookings,
    currentBookings,
    setCurrentBookings,
}: TimeSlotButtonProps) {
    const booking = getBooking(
        activeBookings,
        machine.id,
        slotIndex,
        currentDate
    );

    const booked = checkIfBooked(
        currentBookings,
        machine.id,
        slotIndex,
        currentDate
    );

    if (booking) {
        return booking.userId === currentUserId ? (
            <Button variant="slotBookedByUser">You</Button>
        ) : (
            <Button variant="slotBooked">{booking.userId}</Button>
        );
    }

    const animationProps: React.ComponentProps<typeof motion.div> = {
        initial: { y: -10, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        exit: { y: 10, opacity: 0 },
        transition: { duration: 0.1 },
    };

    return (
        <AnimatePresence mode="wait">
            {!booked ? (
                <Button
                    className="cursor-pointer"
                    key="available"
                    variant="slotAvailable"
                    onClick={() =>
                        setCurrentBookings([
                            ...currentBookings,
                            {
                                userId: currentUserId,
                                date: currentDate,
                                timeSlot: slotIndex,
                                machineId: machine.id,
                            },
                        ])
                    }
                >
                    <motion.div {...animationProps}>
                        <PlusIcon />
                    </motion.div>
                </Button>
            ) : (
                <Button
                    className="cursor-pointer"
                    key="booked"
                    variant="slotBookedByUser"
                    onClick={() =>
                        setCurrentBookings([
                            ...currentBookings.filter(
                                (b) =>
                                    b.machineId !== machine.id ||
                                    b.timeSlot !== slotIndex ||
                                    !sameDay(b.date, currentDate)
                            ),
                        ])
                    }
                >
                    <motion.div {...animationProps}>
                        <SlTag />
                    </motion.div>
                </Button>
            )}
        </AnimatePresence>
    );
}

function checkIfBooked(
    bookings: Reservation[],
    machineId: string,
    slotIdx: number,
    date: Date
) {
    return bookings.some(
        (booking) =>
            booking.machineId === machineId &&
            booking.timeSlot === slotIdx &&
            sameDay(date, booking.date)
    );
}

function getBooking(
    bookings: Reservation[],
    machineId: string,
    slotIdx: number,
    date: Date
) {
    return bookings.find(
        (booking) =>
            booking.machineId === machineId &&
            booking.timeSlot === slotIdx &&
            sameDay(date, booking.date)
    );
}
