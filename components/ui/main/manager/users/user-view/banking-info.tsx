import { Card, CardDescription } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { User } from "@/types/components";
import { Landmark } from "lucide-react";
import { SetStateAction } from "react";
import { DatePicker } from "../../../ewash/booking-table/date-picker/date-picker";

type PersonalDataProps = {
    user: User;
};

export default function BankingData({ user }: PersonalDataProps) {
    return (
        <Card className="text-center gap-2 py-2">
            <div className="flex gap-2 justify-center text-md font-semibold sticky">
                <Landmark /> <p>Bank Account</p>
            </div>
            <CardDescription className="px-4 py-4 flex-1 flex-col overflow-y-auto border-t">
                <FieldGroup>
                    <Field>
                        <FieldLabel htmlFor="form-account-first-name">
                            Name
                        </FieldLabel>
                        <Input
                            id="form-account-first-name"
                            type="account-first-name"
                            placeholder={user.name}
                        />
                    </Field>
                    <div className="grid grid-cols-2 gap-4">
                        <Field>
                            <FieldLabel htmlFor="form-phone">IBAN</FieldLabel>
                            <Input
                                id="form-iban"
                                type="tel"
                                placeholder="DE00 0000 0000 0000 00"
                            />
                        </Field>
                    </div>
                    <Field>
                        <FieldLabel htmlFor="form-bic">BIC</FieldLabel>
                        <Input
                            id="form-bic"
                            type="text"
                            placeholder="COBADEFFXXX"
                        />
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="form-reference">
                            Mandate Reference
                        </FieldLabel>
                        <Input
                            id="form-reference"
                            type="text"
                            placeholder="xx-100-2026-01-01"
                        />
                    </Field>
                    <Field>
                        <FieldLabel>Mandate Date</FieldLabel>
                        <DatePicker
                            currentDate={new Date()}
                            setSelectedDate={function (
                                value: SetStateAction<Date | undefined>,
                            ): void {
                                throw new Error("Function not implemented.");
                            }}
                        />
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="form-name">
                            Direct Debit
                        </FieldLabel>
                        <Input
                            className="h-6 w-6"
                            id="form-name"
                            type="checkbox"
                        />
                    </Field>
                </FieldGroup>
            </CardDescription>
            <div className="text-xs text-muted-foreground">
                Please specify the information of the
                <strong> Account Holder</strong>
            </div>
        </Card>
    );
}
