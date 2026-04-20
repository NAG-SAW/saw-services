import { Card, CardDescription } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { User } from "@/types/components";
import { Contact } from "lucide-react";
import { useForm } from "react-hook-form";

type PersonalDataProps = {
    user: User;
};

export default function PersonalData({ user }: PersonalDataProps) {
    const formController = useForm({
        defaultValues: {
            userName: user.username,
            name: user.name,
            email: user.email,
            address: user.attributes?.address,
        },
    });

    const onSubmit = () => {
        console.log();
        // send to API, etc.
    };

    return (
        <form onSubmit={formController.handleSubmit(onSubmit)}>
            <Card className="text-center gap-2 py-2">
                <div className=" flex gap-2 justify-center text-md font-semibold sticky">
                    <Contact /> <p>Personal Data</p>
                </div>
                <CardDescription className="p-4 flex-1 flex-col overflow-y-auto border-t">
                    <FieldGroup>
                        <Field>
                            <FieldLabel htmlFor="form-name">
                                Username
                            </FieldLabel>
                            <Input
                                id="form-name"
                                type="text"
                                placeholder="jd100"
                                value={user.username}
                                required
                            />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="form-name">Name</FieldLabel>
                            <Input
                                id="form-name"
                                type="text"
                                placeholder="John Doe"
                                value={user.name}
                                required
                            />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="form-email">Email</FieldLabel>
                            <Input
                                id="form-email"
                                type="email"
                                placeholder="john@example.com"
                                value={user.email ?? undefined}
                                required
                            />
                        </Field>
                        <div className="grid grid-cols-2 gap-4">
                            <Field>
                                <FieldLabel htmlFor="form-phone">
                                    Phone
                                </FieldLabel>
                                <Input
                                    id="form-phone"
                                    type="tel"
                                    placeholder="+1 (555) 123-4567"
                                />
                            </Field>
                        </div>
                        <Field>
                            <FieldLabel htmlFor="form-address">
                                Address
                            </FieldLabel>
                            <Input
                                id="form-address"
                                type="text"
                                placeholder="Am Weißenberg 16, 52074 Aachen"
                                value={
                                    user.attributes?.address
                                        ? (user.attributes?.address as string)
                                        : undefined
                                }
                            />
                        </Field>
                    </FieldGroup>
                </CardDescription>
                <div className="text-xs text-muted-foreground">
                    Personal information of the tenant
                </div>
            </Card>
        </form>
    );
}
