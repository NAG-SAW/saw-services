import { SetStateAction } from "react";
import { Button } from "../../button";
import { Card, CardContent, CardFooter, CardHeader } from "../../card";
import { Reservation } from "../booking-table/booking-table";
import { MachineEntry } from "./machine-entry";

type PurchaseSummaryProps = {
    currentBookings: Reservation[];
    setCurrentBookings: React.Dispatch<SetStateAction<Reservation[]>>;
};

export function PurchaseSummary({
    currentBookings,
    setCurrentBookings,
}: PurchaseSummaryProps) {
    return (
        <Card className="min-w-[20rem] h-fit py-8 ">
            <CardHeader className="text-center font-bold">
                Purchase Summary
            </CardHeader>
            <CardContent className="max-h-[30rem] overflow-y-auto border-t border-b">
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
                    <span>Balance After Purchase:</span>
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
                <Button variant="confirm">Confirm Purchase</Button>
            </CardFooter>
        </Card>
    );
}
