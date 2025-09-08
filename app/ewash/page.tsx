import { AppSidebar } from "@/components/ui/main/app-sidebar";
import { BookingTable } from "@/components/ui/main/ewash/booking-table/booking-table";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";

export default function page() {
    //TODO: add check for login state
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
