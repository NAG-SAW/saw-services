"use client";

import { User } from "@/types/components";
import { Card, CardDescription } from "../../card";
import { SimpleTable } from "../../tables/simple-table";

type ManagerViewProps = {
    users: User[];
};

export default function ManagerView({ users }: ManagerViewProps) {
    const userColumns = [
        { header: "Name", accessor: "name" },
        { header: "Username", accessor: "username" },
        { header: "Email", accessor: "email" },
        { header: "Room", accessor: "attributes.room" },
        {
            header: "Active",
            accessor: "is_active",
            cell: (user: User) => (user.is_active ? "Yes" : "No"),
        },
    ];

    return (
        <Card className="flex-1 gap-4 p-4 text-center h-fit">
            <div className="text-lg font-semibold sticky">Users</div>
            <CardDescription className="flex flex-col overflow-y-auto border-t border-b">
                <SimpleTable<User> data={users} columns={userColumns} />
            </CardDescription>
            <div className="text-sm text-center text-muted-foreground">
                Users
            </div>
        </Card>
    );
}
