import { SetStateAction, useState } from "react";
import { BiCollapseAlt, BiExpandAlt } from "react-icons/bi";
import { Button } from "../../../button";
import { Card, CardContent, CardFooter, CardTitle } from "../../../card";
import { Reservation } from "../booking-table/booking-table";
import { MachineEntry } from "./machine-entry";

type PurchaseSummaryProps = {
    currentBookings: Reservation[];
    setCurrentBookings: React.Dispatch<SetStateAction<Reservation[]>>;
    updateBookings: (bookings: Reservation[]) => void;
};

export function PurchaseSummary({
    currentBookings,
    setCurrentBookings,
    updateBookings,
}: PurchaseSummaryProps) {
    const [expanded, setExpanded] = useState(false);
    return (
        <Card className="min-w-[20rem] py-4 gap-2">
            <CardTitle
                className="relative flex items-center justify-center w-full cursor-pointer pb-1"
                onClick={() => setExpanded(!expanded)}
            >
                <div className="text-center w-full">Purchase Summary</div>
                <div className="absolute right-6 top-[40%] -translate-y-1/2">
                    {expanded ? <BiCollapseAlt /> : <BiExpandAlt />}
                </div>
            </CardTitle>
            {/*replace transition with framer motion*/}
            <CardContent
                className={` border-t border-b py-2 transition-all duration-300 ${
                    expanded
                        ? "max-h-[calc(100vh-25rem)] opacity-100 overflow-y-auto"
                        : "max-h-0 opacity-0"
                }`}
            >
                {currentBookings.length === 0 ? (
                    <p className="text-center text-sm text-muted-foreground">
                        No bookings yet.
                    </p>
                ) : (
                    currentBookings.map((booking, index) => (
                        <MachineEntry
                            key={index}
                            booking={booking}
                            currentBookings={currentBookings}
                            setCurrentBookings={setCurrentBookings}
                        />
                    ))
                )}
            </CardContent>
            <CardFooter className="flex flex-col gap-3 items-start ">
                <div className="flex flex-row gap-1 justify-between w-full">
                    <span>Total Cost:</span>
                    <span className="font-bold text-red-300">
                        {(currentBookings.length * 0.5).toFixed(2)}€
                    </span>
                </div>
                <div className="flex flex-row gap-1 justify-between w-full">
                    <span>Current Balance:</span>
                    <span className="font-bold text-green-300">5€</span>
                </div>
                <div className="flex flex-row gap-1 border-t pt-1 justify-between w-full">
                    <span>Balance after use:</span>
                    <span
                        className={`font-bold ${
                            5 - currentBookings.length * 0.5 < 0
                                ? "text-red-300"
                                : "text-green-300"
                        }`}
                    >
                        {(5 - currentBookings.length * 0.5).toFixed(2)}€
                    </span>
                </div>
                <Button
                    variant="confirm"
                    onClick={() => updateBookings(currentBookings)}
                >
                    Confirm Reservation
                </Button>
            </CardFooter>
        </Card>
    );
}
