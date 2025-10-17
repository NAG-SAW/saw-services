"use client";
import { usePathname } from "next/navigation";
import { SidebarTrigger } from "../sidebar";
import { NavItem } from "./app-sidebar";

export type SAWViewProps = {
    title?: string;
    children: React.ReactNode;
    navigationData?: { navMain: NavItem[] };
};
export function SAWView({ title, children, navigationData }: SAWViewProps) {
    const pathName = usePathname();
    if (!title) {
        title = navigationData?.navMain
            .flatMap((item) => item.items || [])
            .find((subItem) => subItem.url === pathName)?.title;
    }

    return (
        <div className=" flex flex-col h-full w-full">
            <div className="flex flex-row w-full justify-between items-center">
                <SidebarTrigger variant="ghost" />
                <h1 className=" text-lg font-semibold">{title}</h1>
            </div>
            <div className=" my-4 h-full">{children}</div>
        </div>
    );
}
