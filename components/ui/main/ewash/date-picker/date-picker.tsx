"use client";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Dispatch } from "react";
import { Button } from "../../../button";
import { Calendar } from "../../../calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../../../popover";

type DatePickerProps = {
    currentDate: Date;
    setSelectedDate: Dispatch<React.SetStateAction<Date | undefined>>;
};

export function DatePicker({ currentDate, setSelectedDate }: DatePickerProps) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    data-empty={!currentDate}
                    className="data-[empty=true]:text-muted-foreground  justify-center text-center font-normal"
                >
                    <CalendarIcon />
                    {currentDate ? (
                        format(currentDate, "PPP")
                    ) : (
                        <span>Pick a date</span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                    mode="single"
                    selected={currentDate}
                    onSelect={setSelectedDate}
                />
            </PopoverContent>
        </Popover>
    );
}
