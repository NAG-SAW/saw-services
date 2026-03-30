import { User } from "@/types/components";
import BankingData from "./user-view/banking-info";
import GroupsList from "./user-view/groups-list";
import PersonalData from "./user-view/personal-data";

type UserEditViewProps = {
    user: User;
};

export default function UserEditView({ user }: UserEditViewProps) {
    return (
        <div className="py-2 grid grid-cols-3 gap-4">
            <PersonalData user={user} />
            <BankingData user={user} />
            <GroupsList user={user} />
        </div>
    );
}
