import { Button } from "@/components/ui/button";
import { Card, CardDescription } from "@/components/ui/card";
import { SimpleTable } from "@/components/ui/tables/simple-table";
import { PartialGroup, User } from "@/types/components";
import { ColumnDef, Row } from "@tanstack/react-table";
import { Trash, Users } from "lucide-react";

type GroupsListProps = {
    user: User;
};

export default function GroupsList({ user }: GroupsListProps) {
    console.log(user.groups_obj);

    const userGroupColumns: ColumnDef<PartialGroup>[] = [
        {
            accessorKey: "name",
            header: "Name",
            meta: {
                className: "text-left w-full",
            },
        },
        {
            id: "remove",
            meta: {
                className: "w-fit",
            },
            cell: ({ row }: { row: Row<PartialGroup> }) => {
                return <Trash color="var(--destructive)" />;
            },
            enableSorting: false,
        },
    ];
    return (
        <Card className="text-center gap-2 py-2">
            <div className="flex gap-2 justify-center text-md items-center font-semibold sticky">
                <Users /> <p>Groups</p>
            </div>
            <CardDescription className="p-4 flex-1 flex-col overflow-y-auto border-t">
                <SimpleTable
                    data={user.groups_obj as PartialGroup[]}
                    columns={userGroupColumns}
                />
            </CardDescription>
            <div className="text-xs pb-1 text-muted-foreground">
                <Button>Add to new group</Button>
            </div>
        </Card>
    );
}
