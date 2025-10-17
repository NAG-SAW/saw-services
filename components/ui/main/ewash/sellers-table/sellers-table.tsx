"use client";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useIsMobile } from "@/hooks/use-mobile";
import { CheckIcon, Clock, House, Mail, User, XIcon } from "lucide-react";
import { SlPaypal } from "react-icons/sl";

type Seller = {
    id: number;
    isActive: boolean;
    house: string;
    room: string;
    name: string;
    paypal: boolean;
    email: string;
    worktime: string;
};

export function SellersTable() {
    const isMobile = useIsMobile();
    const sellers: Seller[] = [
        {
            id: 1,
            isActive: true,
            house: "16",
            room: "101",
            name: "Talha Caliskan",
            email: "talha.caliskan@example.com",
            paypal: true,
            worktime: "09:00 - 15:00",
        },
        {
            id: 2,
            isActive: false,
            house: "18",
            room: "101",
            name: "Hohn Doe",
            email: "hohn.doe@example.com",
            paypal: true,
            worktime: "09:00 - 15:00",
        },
        {
            id: 3,
            isActive: true,
            house: "18",
            room: "101",
            name: "Lilli Sophie Martin",
            email: "lilli.sophie.martin@example.com",
            paypal: false,
            worktime: "09:00 - 15:00",
        },
    ];
    return (
        <Table>
            <TableCaption>Sellers</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>
                        <div className="flex items-center gap-2 text-md">
                            <House /> {!isMobile ? "Apartment" : null}
                        </div>
                    </TableHead>
                    <TableHead>
                        <div className="flex items-center gap-2 text-md">
                            <User />
                            {!isMobile ? " Name" : null}
                        </div>
                    </TableHead>
                    <TableHead>
                        <div className="flex items-center gap-2 text-md">
                            <Mail />
                            {!isMobile ? " Email" : null}
                        </div>
                    </TableHead>
                    <TableHead>
                        <div className="flex items-center gap-2 text-md">
                            <Clock />
                            {!isMobile ? " Worktime" : null}
                        </div>
                    </TableHead>
                    <TableHead>
                        <div className="flex items-center gap-2 text-md">
                            <SlPaypal size={20} />
                            {!isMobile ? " PayPal" : null}
                        </div>
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {sellers.map((seller) => (
                    <TableRow
                        key={seller.id}
                        className={seller.isActive ? "" : "opacity-50"}
                    >
                        <TableCell>
                            H{seller.house} - {seller.room}
                        </TableCell>
                        <TableCell
                            className={
                                isMobile
                                    ? "max-w-24 whitespace-break-spaces"
                                    : ""
                            }
                        >
                            {seller.name}
                        </TableCell>

                        <TableCell
                            className={isMobile ? "max-w-24 truncate" : ""}
                        >
                            <a href={`mailto:${seller.email}`}>
                                {seller.email}
                            </a>
                        </TableCell>
                        <TableCell
                            className={
                                isMobile
                                    ? "max-w-24 whitespace-break-spaces"
                                    : ""
                            }
                        >
                            {seller.worktime}
                        </TableCell>
                        <TableCell>
                            {seller.paypal ? (
                                <CheckIcon color="#7ef47eff" />
                            ) : (
                                <XIcon color="#f68c8cff" />
                            )}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
