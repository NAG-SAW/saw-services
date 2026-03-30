import { ThemeProvider } from "@/components/theme-provider";
import { AppSidebar } from "@/components/ui/main/app-sidebar";
import { SAWView } from "@/components/ui/main/saw-view";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
    title: "SAW Services",
    description: "Boop",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const data = {
        navMain: [
            {
                title: "Manager",
                url: "/manager",
                items: [
                    {
                        title: "Users",
                        url: "/manager",
                    },
                ],
            },
            {
                title: "EWash",
                url: "/ewash",

                items: [
                    {
                        title: "Booking",
                        url: "/ewash",
                    },
                    {
                        title: "Maintenance",
                        url: "/ewash/maintenance",
                    },
                    {
                        title: "Sellers",
                        url: "/ewash/sellers",
                    },
                    {
                        title: "SAW-Coin",
                        url: "/ewash/saw-coin",
                        items: [
                            {
                                title: "Overview",
                                url: "/ewash/saw-coin",
                            },
                            {
                                title: "Account",
                                url: "/ewash/saw-coin/account",
                            },
                            {
                                title: "Seller",
                                url: "/ewash/saw-coin/seller",
                            },
                            {
                                title: "Finances",
                                url: "/ewash/saw-coin/finances",
                            },
                            {
                                title: "Admin",
                                url: "/ewash/saw-coin/admin",
                            },
                        ],
                    },
                ],
            },
            {
                title: "Sports Room",
                url: "/sports-room",
                items: [
                    {
                        title: "Booking",
                        url: "/sports-room",
                    },
                ],
            },
            {
                title: "Settings",
                url: "/settings",
                items: [
                    {
                        title: "Profile",
                        url: "/settings/profile",
                    },
                ],
            },
        ],
    };

    return (
        <>
            <html lang="en" suppressHydrationWarning>
                <head />
                <body>
                    <Providers>
                        <ThemeProvider
                            attribute="class"
                            defaultTheme="system"
                            enableSystem
                            disableTransitionOnChange
                        >
                            <SidebarProvider>
                                <AppSidebar data={data} />
                                <SidebarInset className="w-full bg-muted p-5">
                                    <SAWView navigationData={data}>
                                        {children}
                                    </SAWView>
                                </SidebarInset>
                            </SidebarProvider>
                        </ThemeProvider>
                    </Providers>
                </body>
            </html>
        </>
    );
}
