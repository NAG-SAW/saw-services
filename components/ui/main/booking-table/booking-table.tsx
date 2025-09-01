"use client";
import { useIsMobile } from "@/hooks/use-mobile";
import { WashingMachineIcon } from "lucide-react";
import Image from "next/image";
import { JSX, useState } from "react";
import { MdLocalLaundryService } from "react-icons/md";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "../../table";
import { PurchaseSummary } from "../purchase-summary/purchase-summary";
import { TimeSlotButton } from "./timeslot-button";

export type Reservation = {
    userId: string;
    date: Date;
    machineId: string;
    timeSlot: number;
};

export type Machine = {
    id: string;
    name: string;
    type?: "washer" | "dryer";
};

export const machines: Machine[] = [
    {
        id: "t1",
        name: "T 1",
        type: "dryer",
    },
    {
        id: "t2",
        name: "T 2",
        type: "dryer",
    },
    {
        id: "t3",
        name: "T 3",
        type: "dryer",
    },
    {
        id: "w1",
        name: "WM 1",
        type: "washer",
    },
    {
        id: "w2",
        name: "WM 2",
        type: "washer",
    },
    {
        id: "w3",
        name: "WM 3",
        type: "washer",
    },
];

export const TIME_SLOT_INTERVAL = [
    "07:00-08:30",
    "08:30-10:00",
    "10:00-11:30",
    "11:30-13:00",
    "13:00-14:30",
    "14:30-16:00",
    "16:00-17:30",
    "17:30-19:00",
    "19:00-20:30",
    "20:30-22:00",
];

export function BookingTable(): JSX.Element {
    // Replace with actual user context or prop in production
    const currentUserId = "tc328";
    const [currentDate, setCurrentDate] = useState(new Date());
    const [loggedIn, setLoggedIn] = useState(true);
    const activeBookings: Reservation[] = [
        { userId: "tc328", date: new Date(), timeSlot: 1, machineId: "w1" },
        { userId: "ud439", date: new Date(), timeSlot: 2, machineId: "w2" },
        { userId: "ud439", date: new Date(), timeSlot: 2, machineId: "w3" },
        { userId: "ud439", date: new Date(), timeSlot: 3, machineId: "t1" },
        { userId: "ab123", date: new Date(), timeSlot: 0, machineId: "w1" },
        { userId: "ab123", date: new Date(), timeSlot: 1, machineId: "t1" },
    ];
    const [currentBookings, setCurrentBookings] = useState<Reservation[]>([]);
    const isMobile = useIsMobile();
    const dryers = machines.filter((m) => m.type === "dryer");
    const washers = machines.filter((m) => m.type === "washer");

    if (isMobile) {
        return (
            <div className="flex flex-col">
                <MachineTable
                    abbreviated
                    machines={dryers}
                    activeBookings={activeBookings}
                    currentDate={currentDate}
                    currentUserId={currentUserId}
                    currentBookings={currentBookings}
                    setCurrentBookings={setCurrentBookings}
                />

                <MachineTable
                    abbreviated
                    activeBookings={activeBookings}
                    machines={washers}
                    currentDate={currentDate}
                    currentUserId={currentUserId}
                    currentBookings={currentBookings}
                    setCurrentBookings={setCurrentBookings}
                />
            </div>
        );
    }
    return (
        <div className="flex flex-row gap-5">
            <MachineTable
                activeBookings={activeBookings}
                machines={machines}
                currentDate={currentDate}
                currentUserId={currentUserId}
                currentBookings={currentBookings}
                setCurrentBookings={setCurrentBookings}
            />
            <PurchaseSummary
                currentBookings={currentBookings}
                setCurrentBookings={setCurrentBookings}
            />
        </div>
    );
}

type MachineTableProps = {
    currentDate: Date;
    currentUserId: string;
    activeBookings: Reservation[];
    currentBookings: Reservation[];
    machines: Machine[];
    abbreviated?: boolean;
    setCurrentBookings: React.Dispatch<React.SetStateAction<Reservation[]>>;
};

function MachineTable({
    machines,
    currentDate,
    currentUserId,
    activeBookings,
    currentBookings,
    abbreviated = false,
    setCurrentBookings,
}: MachineTableProps) {
    return (
        <>
            <Table>
                <TableCaption>Machine Booking Slots</TableCaption>
                <TableHeader>
                    {!abbreviated && (
                        <TableRow>
                            <TableHead className="w-[5%]" />
                            <TableHead colSpan={machines.length}>
                                <div className="flex justify-center items-center">
                                    <Image
                                        src="/machines_new.png"
                                        alt="Description"
                                        width={1920}
                                        height={1080}
                                        style={{
                                            width: "100%",
                                            height: "auto",
                                        }}
                                    />
                                </div>
                            </TableHead>
                        </TableRow>
                    )}
                    <TableRow className="bg-muted/50">
                        <TableHead className="w-[5%]">
                            <h4 className="text-md font-semibold tracking-tight">
                                Time Slot
                            </h4>
                        </TableHead>

                        {machines.map((machine) => (
                            <TableHead
                                key={machine.name}
                                className={
                                    abbreviated
                                        ? "w-[30%]"
                                        : "min-w-[90px] pt-2"
                                }
                            >
                                <h4 className="flex flex-row items-center gap-2  text-md font-semibold justify-center">
                                    {machine.type === "washer" ? (
                                        <MdLocalLaundryService
                                            size={25}
                                            color="#5EE9B5"
                                        />
                                    ) : (
                                        <WashingMachineIcon
                                            size={23}
                                            color="#5EE9B5"
                                        />
                                    )}
                                    {machine.name}
                                </h4>
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {TIME_SLOT_INTERVAL.map((slot, index) => (
                        <TableRow key={slot}>
                            <TableCell>{slot}</TableCell>
                            {machines.map((machine) => (
                                <TableCell key={machine.name}>
                                    <TimeSlotButton
                                        activeBookings={activeBookings}
                                        machine={machine}
                                        slotIndex={index}
                                        currentDate={currentDate}
                                        currentUserId={currentUserId}
                                        currentBookings={currentBookings}
                                        setCurrentBookings={setCurrentBookings}
                                    />
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell
                            className="text-right font-semibold"
                            colSpan={machines.length + 1}
                        >
                            Current Time:{" "}
                            {new Intl.DateTimeFormat("de-DE", {
                                hour: "2-digit",
                                minute: "2-digit",
                            }).format(currentDate)}
                        </TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </>
    );
}
