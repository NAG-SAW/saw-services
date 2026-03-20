import { useIsMobile } from "@/hooks/use-mobile";
import Image from "next/image";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { CurrentTimeIndicator } from "../main/ewash/booking-table/current-time-indicator";
import {
    Reservation,
    TIME_SLOT_INTERVAL,
} from "../main/ewash/booking-table/ewash-booking-table";
import { TimeSlotButton } from "../main/ewash/booking-table/timeslot-button";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "../table";
import { ColumnDef } from "@tanstack/react-table";

export type Booking = {
    id: string;
    name: string;
    type?: "washer" | "dryer";
};

type BookingTableProps = {
    currentDate: Date | undefined;
    currentUserId: string;
    headers?: ReactNode;
    timeslotIntervals?: string[];
    activeBookings: Reservation[];
    currentBookings: Reservation[];
    columns: Booking[];
    setCurrentBookings: React.Dispatch<React.SetStateAction<Reservation[]>>;
};

export function BookingTable({
    columns,
    currentDate,
    currentUserId,
    headers,
    timeslotIntervals,
    activeBookings,
    currentBookings,
    setCurrentBookings,
}: BookingTableProps) {
    const { t } = useTranslation();
    const isMobile = useIsMobile();
    const timesSlotIntervalsToUse = timeslotIntervals || TIME_SLOT_INTERVAL;
    /**
     * Translations dont work yet
     * but we can use this to create manual translations for all text
     * (should at least be done for german and english)
     */
    return (
        <>
            <Table>
                <TableCaption>{t("Machine Booking Slots")}</TableCaption>
                <TableHeader>
                    {!isMobile ? (
                        <TableRow>
                            <TableHead className="w-[5%]" />
                            <TableHead colSpan={columns.length}>
                                <div className="flex justify-center items-center">
                                    <Image
                                        src="/reality-Photoroom.png"
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
                    ) : null}
                    <TableRow className="bg-muted/50">
                        <TableHead>
                            <h4 className={isMobile ? "whitespace-normal" : ""}>
                                Time Slot
                            </h4>
                        </TableHead>
                        {headers}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {currentDate
                        ? timesSlotIntervalsToUse.map((slot, index) => (
                              <TableRow key={slot}>
                                  <TableCell
                                      className={
                                          isMobile
                                              ? "border-b whitespace-normal"
                                              : "border-b"
                                      }
                                  >
                                      {slot}
                                  </TableCell>
                                  {columns.map((column) => (
                                      <TableCell
                                          className="border-b p-[2px]"
                                          key={column.name}
                                      >
                                          <TimeSlotButton
                                              activeBookings={activeBookings}
                                              machine={column}
                                              slotIndex={index}
                                              currentDate={currentDate}
                                              currentUserId={currentUserId}
                                              currentBookings={currentBookings}
                                              setCurrentBookings={
                                                  setCurrentBookings
                                              }
                                          />
                                      </TableCell>
                                  ))}
                              </TableRow>
                          ))
                        : null}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell
                            className="text-right font-semibold"
                            colSpan={columns.length + 1}
                        >
                            <CurrentTimeIndicator />
                        </TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </>
    );
}
