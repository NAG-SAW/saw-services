import { useEffect, useState } from "react";

export function CurrentTimeIndicator() {
    const [currentTime, setCurrentTime] = useState(new Date());
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []);
    return (
        <div className="flex flex-row justify-between">
            <div>
                Current Date:{" "}
                {new Intl.DateTimeFormat("de-DE", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                }).format(currentTime)}
            </div>
            <div>
                Current Time:{" "}
                {new Intl.DateTimeFormat("de-DE", {
                    hour: "2-digit",
                    minute: "2-digit",
                }).format(currentTime)}
            </div>
        </div>
    );
}
