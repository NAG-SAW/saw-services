import { AppSidebar } from "@/components/ui/main/app-sidebar";
import { BookingTable } from "@/components/ui/main/booking-table/booking-table";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";

export default function Home() {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset className="bg-muted p-5">
                <SidebarTrigger variant="ghost" />
                <BookingTable />
            </SidebarInset>
        </SidebarProvider>
    );
}
