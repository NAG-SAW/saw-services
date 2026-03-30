"use client";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { User } from "@/types/components";
import { useQuery } from "@tanstack/react-query";
import { JSX, useState } from "react";
import UserEditView from "./user-edit-view";

type ViewUserDialogProps = { trigger: JSX.Element; userID: number };

export default function ViewUserDialog({
    trigger,
    userID,
}: ViewUserDialogProps) {
    const [open, setOpen] = useState(false);
    const { data: selectedUser, isLoading } = useQuery({
        queryKey: ["user", userID],
        queryFn: () =>
            fetch(`/api/users/${userID}`).then(
                async (r): Promise<User> => await r.json(),
            ),
        enabled: open,
    });

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>{trigger}</DialogTrigger>
            {isLoading ? null : (
                <DialogContent className="max-w-[80vw] sm:max-w-[80vw]">
                    <DialogHeader>
                        <DialogTitle>
                            Edit User - {selectedUser?.name}
                        </DialogTitle>
                    </DialogHeader>
                    <UserEditView user={selectedUser as User} />
                    <DialogFooter>
                        <Button
                            variant="default"
                            onClick={() => setOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button variant="confirm">Save</Button>
                    </DialogFooter>
                </DialogContent>
            )}
        </Dialog>
    );
}
