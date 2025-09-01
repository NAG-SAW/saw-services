import { Button } from "../button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../dialog";

type BookingDialogProps = {
    trigger: React.ReactNode;
    machine: string;
    timeslot: string;
};

export function BookingDialog({
    trigger,
    machine,
    timeslot,
}: BookingDialogProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Book a Slot</DialogTitle>
                    <DialogDescription>
                        Confirm your booking for{" "}
                        <strong className="text-[#5EE9B5]">{machine}</strong> at{" "}
                        <strong className="text-[#5EE9B5]">{timeslot}</strong>.
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button">Cancel</Button>
                    </DialogClose>
                    <Button type="submit" className="bg-[#5EE9B5]">
                        Confirm
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
