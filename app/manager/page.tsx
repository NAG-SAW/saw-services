import ManagerView from "@/components/ui/main/manager/manager-view";
import { User } from "@/types/components";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page() {
    const headersList = await headers();
    const res = await fetch("http://127.0.0.1:8000/users", {
        headers: { cookie: headersList.get("cookie") || "" },
        cache: "no-store",
    });
    if (res.status === 401) redirect("/api/auth/login?current_url=/manager");

    const users: User[] = await res.json();
    return <ManagerView users={users} />;
}
