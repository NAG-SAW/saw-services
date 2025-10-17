"use client";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableRow,
} from "@/components/ui/table";
import { WashingMachineIcon } from "lucide-react";
import { MdLocalLaundryService } from "react-icons/md";
import { machines } from "../booking-table/booking-table";

export function MachineOverview() {
    return (
        <Table>
            <TableCaption>Machine Overview</TableCaption>
            {machines.map((machine) => (
                <TableHead key={machine.name} className={"min-w-[90px] pt-2"}>
                    <h4 className="flex flex-row items-center gap-2 text-md font-semibold justify-center">
                        {machine.type === "washer" ? (
                            <MdLocalLaundryService size={25} color="#5EE9B5" />
                        ) : (
                            <WashingMachineIcon size={23} color="#5EE9B5" />
                        )}
                        {machine.name}
                    </h4>
                </TableHead>
            ))}
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
