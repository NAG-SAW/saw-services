import { AnimatePresence, motion } from "motion/react";
import { SetStateAction, useState } from "react";
import { BiCollapseAlt, BiExpandAlt } from "react-icons/bi";
import { Button } from "../../../../button";
import { Card, CardContent, CardFooter, CardTitle } from "../../../../card";
import { Reservation } from "../booking-table";
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
    const [expanded, setExpanded] = useState(true);
    return (
        <Card className="min-w-[20rem] py-4 gap-2">
            <CardTitle
                className="relative flex items-center justify-center w-full cursor-pointer pb-1"
                onClick={(e) => {
                    e.stopPropagation();
                    setExpanded(!expanded);
                }}
            >
                <div className="text-center w-full">Purchase Summary</div>
                <AnimatePresence>
                    <motion.div
                        className="absolute right-6 top-[40%] -translate-y-1/2"
                        initial={false}
                        animate={{ rotate: expanded ? 180 : 0 }}
                    >
                        {expanded ? <BiCollapseAlt /> : <BiExpandAlt />}
                    </motion.div>
                </AnimatePresence>
            </CardTitle>
            {/*replace transition with framer motion*/}
            <AnimatePresence>
                <motion.div
                    className={` border-t border-b py-2 overflow-y-auto w-full`}
                    animate={{
                        maxHeight: expanded ? "calc(100vh - 25rem)" : 0,
                        opacity: expanded ? 1 : 0,
                        transition: { duration: 0.2 },
                    }}
                >
                    <AnimatePresence>
                        <CardContent>
                            {currentBookings.length === 0 ? (
                                <motion.p className="text-center text-sm text-muted-foreground">
                                    No bookings yet.
                                </motion.p>
                            ) : (
                                currentBookings.map((booking, index) => (
                                    <motion.div
                                        key={index}
                                        layoutId={"layout-" + index}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{
                                            duration: 0.3,
                                        }}
                                    >
                                        <MachineEntry
                                            booking={booking}
                                            currentBookings={currentBookings}
                                            setCurrentBookings={
                                                setCurrentBookings
                                            }
                                        />
                                    </motion.div>
                                ))
                            )}
                        </CardContent>
                    </AnimatePresence>
                </motion.div>
            </AnimatePresence>
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
                    disabled={
                        currentBookings.length === 0 ||
                        5 - currentBookings.length * 0.5 < 0
                    }
                    variant="confirm"
                    onClick={(e) => {
                        e.stopPropagation();
                        updateBookings(currentBookings);
                    }}
                >
                    Confirm Reservation
                </Button>
            </CardFooter>
        </Card>
    );
}
