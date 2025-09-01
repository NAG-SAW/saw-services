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
import { Input } from "../input";
import { Label } from "../label";

type LoginDialogProps = {
    trigger: React.ReactNode;
};

export function LoginDialog({ trigger }: LoginDialogProps) {
    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>{trigger}</DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Login</DialogTitle>
                        <DialogDescription>
                            Please enter your credentials to login.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="username-1">Username</Label>
                            <Input
                                id="username-1"
                                name="username"
                                placeholder="Enter your username"
                            />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="password-1">Password</Label>
                            <Input
                                id="password-1"
                                name="password"
                                type="password"
                                placeholder="Enter your password"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit">Login</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    );
}
