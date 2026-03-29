import { User } from "@/types/components";
import { ColumnDef, Row } from "@tanstack/react-table";
import { BadgeCheck, BadgeX, Edit } from "lucide-react";
import { Button } from "../../button";
import { Card, CardDescription } from "../../card";
import { SimpleTable } from "../../tables/simple-table";
import ViewUserDialog from "./users/view-user-dialog";

type UserTableProps = {
    users: User[];
};

export default function UserTable({ users }: UserTableProps) {
    const userColumns: ColumnDef<User>[] = [
        {
            accessorKey: "name",
            header: "Name",
            meta: {
                className: "text-left",
            },
        },
        {
            accessorKey: "username",
            header: "Username",
            meta: {
                className: "text-left",
            },
        },
        {
            accessorKey: "email",
            header: "Email",
            meta: {
                className: "text-left",
            },
        },
        {
            accessorKey: "attributes",
            header: "Room",
            sortingFn: (rowA, rowB) => {
                return (
                    (rowA.original.attributes?.room as number) -
                    (rowB.original.attributes?.room as number)
                );
            },
            cell: ({ row }: { row: Row<User> }) => {
                const attributes = row.getValue("attributes") as Record<
                    string,
                    unknown
                > | null;
                return <div>{(attributes?.room as string) ?? ""}</div>;
            },
        },
        {
            accessorKey: "is_active",
            header: "Active",
            cell: ({ row }: { row: Row<User> }) => {
                if (row.original.is_active) {
                    return <BadgeCheck color="lightgreen" />;
                } else {
                    return <BadgeX color="red" />;
                }
            },
        },
        {
            id: "edit",
            cell: ({ row }: { row: Row<User> }) => {
                return (
                    <ViewUserDialog
                        trigger={
                            <Button variant="ghost">
                                <Edit />
                            </Button>
                        }
                        userID={row.original.pk}
                    />
                );
            },
            enableSorting: false,
        },
    ];

    return (
        <Card className="flex-1 gap-4 p-4 text-center h-fit">
            <div className="text-lg font-semibold sticky">Users</div>
            <CardDescription className="flex flex-col overflow-y-auto border-t border-b">
                <SimpleTable data={users} columns={userColumns} />
            </CardDescription>
            <div className="text-sm text-center text-muted-foreground">
                Users
            </div>
        </Card>
    );
}
