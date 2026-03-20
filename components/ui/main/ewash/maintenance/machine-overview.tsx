"use client";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { WashingMachineIcon } from "lucide-react";
import { MdLocalLaundryService } from "react-icons/md";
import { machines } from "../booking-table/ewash-booking-table";

export function MachineOverview() {
    return (
        <Table>
            <TableCaption>Machine Overview</TableCaption>
            <TableHeader className={" pt-2"}>
                <TableRow>
                    {machines.map((machine) => (
                        <TableCell key={machine.name}>
                            <h4 className="flex flex-row items-center gap-2 text-md font-semibold justify-center">
                                {machine.type === "washer" ? (
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
                                {machine.name}
                            </h4>
                        </TableCell>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    {machines.map((machine) => (
                        <TableCell key={machine.name} className="text-center">
                            <Button className="w-full" variant="outline">
                                Simulate Payment
                            </Button>
                        </TableCell>
                    ))}
                </TableRow>
                <TableRow>
                    {machines.map((machine) => (
                        <TableCell key={machine.name} className="text-center">
                            <Button className="w-full" variant="outline">
                                Lock
                            </Button>
                        </TableCell>
                    ))}
                </TableRow>
            </TableBody>
        </Table>
    );
}
