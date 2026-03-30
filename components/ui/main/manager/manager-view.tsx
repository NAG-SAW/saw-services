"use client";

import { User } from "@/types/components";
import UserTable from "./user-table";

type ManagerViewProps = {
    users: User[];
};

export default function ManagerView({ users }: ManagerViewProps) {
    
    return <UserTable users={users} />;
}
