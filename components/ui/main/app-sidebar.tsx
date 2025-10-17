"use client";
import { WashingMachine } from "lucide-react";
import { usePathname } from "next/navigation";
import * as React from "react";

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarRail,
} from "@/components/ui/sidebar";

// Types
export type NavItem = {
    title: string;
    url: string;
    items?: NavItem[];
};

// Recursive component for menu items
function MenuItem({ item, pathname }: { item: NavItem; pathname: string }) {
    return (
        <SidebarMenuItem key={item.title}>
            <SidebarMenuButton asChild isActive={pathname === item.url}>
                <a href={item.url} className="font-medium">
                    {item.title}
                </a>
            </SidebarMenuButton>
            {item.items?.length ? (
                <SidebarMenuSub>
                    {item.items.map((subItem: NavItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton
                                asChild
                                isActive={pathname === subItem.url}
                            >
                                <a href={subItem.url}>{subItem.title}</a>
                            </SidebarMenuSubButton>
                            {subItem.items?.length ? (
                                <SidebarMenuSub>
                                    {subItem.items.map(
                                        (nestedItem: NavItem) => (
                                            <SidebarMenuSubItem
                                                key={nestedItem.title}
                                            >
                                                <SidebarMenuSubButton
                                                    asChild
                                                    isActive={
                                                        pathname ===
                                                        nestedItem.url
                                                    }
                                                >
                                                    <a href={nestedItem.url}>
                                                        {nestedItem.title}
                                                    </a>
                                                </SidebarMenuSubButton>
                                            </SidebarMenuSubItem>
                                        )
                                    )}
                                </SidebarMenuSub>
                            ) : null}
                        </SidebarMenuSubItem>
                    ))}
                </SidebarMenuSub>
            ) : null}
        </SidebarMenuItem>
    );
}

export function AppSidebar({
    data,
    ...props
}: {
    data: { navMain: NavItem[] };
    props?: React.ComponentProps<typeof Sidebar>;
}) {
    const pathname = usePathname();

    return (
        <Sidebar {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <a href="#">
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg">
                                    <WashingMachine className="size-4 text-[#5EE9B5]" />
                                </div>
                                <div className="flex flex-col gap-0.5 leading-none">
                                    <span className="font-semibold">
                                        SAW Services
                                    </span>
                                    <span className="">v0.0.1</span>
                                </div>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarMenu>
                        {data.navMain.map((item) => (
                            <MenuItem
                                key={item.title}
                                item={item}
                                pathname={pathname}
                            />
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    );
}
