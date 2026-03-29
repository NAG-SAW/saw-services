import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { JSX } from "react";

type ViewUserDialogProps = { trigger: JSX.Element; userID: number };

export default function ViewUserDialog({
    trigger,
    userID,
}: ViewUserDialogProps) {
    return (
        <Dialog>
            <DialogTrigger>{trigger}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>User XY</DialogTitle>
                    <DialogDescription>Details about user XY</DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}
