"use client";
import { Badge } from "@/components/ui/badge";
import { ShoppingBasket } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Reservation } from "../booking-table";
import { PurchaseSummary } from "./purchase-summary";

export function MobilePurchaseSummary({
    currentBookings,
    setCurrentBookings,
    updateBookings,
}: {
    currentBookings: Reservation[];
    setCurrentBookings: React.Dispatch<React.SetStateAction<Reservation[]>>;
    updateBookings: (bookings: Reservation[]) => void;
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            setIsOpen(false);
            setIsClosing(false);
        }, 300);
    };

    return (
        <>
            <AnimatePresence>
                {!isOpen ? (
                    /* Floating Basket Button */
                    <motion.button
                        layoutId="purchase-basket"
                        onClick={() => setIsOpen(true)}
                        className="fixed bottom-4 right-4 z-50 h-16 w-16 bg-gray-900 rounded-full flex items-center justify-center shadow-lg hover:bg-gray-800 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <ShoppingBasket className="w-6 h-6 text-white" />
                        {currentBookings.length > 0 && (
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute -top-2 -right-2 text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center"
                            >
                                <Badge className="bg-[#5EE9B5] text-black">
                                    {currentBookings.length}
                                </Badge>
                            </motion.div>
                        )}
                    </motion.button>
                ) : (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: isClosing ? 0 : 1 }}
                            exit={{ opacity: 0 }}
                            onClick={handleClose}
                            className="fixed inset-0 bg-black/50 z-40"
                        />

                        {/* Expanded Dialog */}
                        <motion.div
                            layoutId="purchase-basket"
                            animate={
                                isClosing
                                    ? {
                                          width: 64,
                                          height: 64,
                                      }
                                    : {}
                            }
                            className="fixed bottom-4 right-4 z-50 overflow-hidden"
                            style={{
                                maxHeight: isClosing
                                    ? "64px"
                                    : "calc(100vh - 10rem)",
                            }}
                        >
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: isClosing ? 0 : 1 }}
                                transition={{ delay: isClosing ? 0 : 0.2 }}
                            >
                                <PurchaseSummary
                                    currentBookings={currentBookings}
                                    setCurrentBookings={setCurrentBookings}
                                    updateBookings={(bookings) => {
                                        updateBookings(bookings);
                                        handleClose();
                                    }}
                                />
                            </motion.div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
