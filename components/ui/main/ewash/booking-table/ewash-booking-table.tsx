"use client";
import { TableHead } from "@/components/ui/table";
import { Booking, BookingTable } from "@/components/ui/tables/booking-table";
import { useIsMobile } from "@/hooks/use-mobile";
import i18next from "i18next";
import { WashingMachineIcon } from "lucide-react";
import { JSX, useState } from "react";
import { MdLocalLaundryService } from "react-icons/md";
import bookingText from "../../../../../public/page-texts/booking-text.json"; // Import the JSON file
import { DatePicker } from "./date-picker/date-picker";
import { MobilePurchaseSummary } from "./purchase-summary/mobile-purchase-summary";
import { PurchaseSummary } from "./purchase-summary/purchase-summary";

export type Reservation = {
    userId: string;
    date: Date;
    machineId: string;
    timeSlot: number;
};

export const machines: Booking[] = [
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

i18next.init({
    resources: bookingText,
    lng: "de", // Default language
    fallbackLng: "en",
    interpolation: {
        escapeValue: false, // React already escapes values
    },
});

export function EwashBookingTable(): JSX.Element {
    //TODO: Replace with actual user context or prop in production
    const currentUserId = "tc328";
    const [currentDate, setCurrentDate] = useState<Date | undefined>(
        new Date(),
    );

    // TODO: Fetch active bookings from backend
    /* const { data, error, isLoading } = 
    }); */

    // TODO: Remove mock data and implement actual data fetching
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
            <div className="flex flex-col gap-2">
                <DatePicker
                    currentDate={currentDate!}
                    setSelectedDate={setCurrentDate}
                />
                <BookingTable
                    columns={dryers}
                    activeBookings={activeBookings}
                    currentDate={currentDate!}
                    currentUserId={currentUserId}
                    headers={<EwashBookingTableHeaders columns={washers} />}
                    currentBookings={currentBookings}
                    setCurrentBookings={setCurrentBookings}
                />

                <BookingTable
                    activeBookings={activeBookings}
                    columns={washers}
                    currentDate={currentDate!}
                    currentUserId={currentUserId}
                    headers={<EwashBookingTableHeaders columns={dryers} />}
                    currentBookings={currentBookings}
                    setCurrentBookings={setCurrentBookings}
                />
                <MobilePurchaseSummary
                    currentBookings={currentBookings}
                    setCurrentBookings={setCurrentBookings}
                    updateBookings={function (bookings: Reservation[]): void {
                        throw new Error("Function not implemented.");
                    }}
                />
            </div>
        );
    }
    return (
        <div className="flex flex-row gap-5 min-w-0 h-full">
            <div className="flex-1 overflow-x-auto  h-full items-center">
                <BookingTable
                    activeBookings={activeBookings}
                    columns={machines}
                    currentDate={currentDate!}
                    currentUserId={currentUserId}
                    headers={<EwashBookingTableHeaders columns={machines} />}
                    currentBookings={currentBookings}
                    setCurrentBookings={setCurrentBookings}
                />
            </div>
            <div className="flex flex-col gap-5">
                <DatePicker
                    currentDate={currentDate!}
                    setSelectedDate={setCurrentDate}
                />
                <PurchaseSummary
                    currentBookings={currentBookings}
                    setCurrentBookings={setCurrentBookings}
                    updateBookings={() => {}}
                />
            </div>
        </div>
    );
}

function EwashBookingTableHeaders({
    columns,
}: {
    columns: Booking[];
}): JSX.Element {
    return (
        <>
            {columns.map((column) => (
                <TableHead key={column.name} className={"min-w-[90px] pt-2"}>
                    <h4 className="flex flex-row items-center gap-2 text-md font-semibold justify-center">
                        {column.type === "washer" ? (
                            <MdLocalLaundryService
                                size={25}
                                color="var(--saw-accent)"
                            />
                        ) : (
                            <WashingMachineIcon
                                size={23}
                                color="var(--saw-accent)"
                            />
                        )}
                        {column.name}
                    </h4>
                </TableHead>
            ))}
        </>
    );
}
