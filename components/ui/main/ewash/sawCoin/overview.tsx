import { Card, CardDescription } from "@/components/ui/card";
import { SimpleTable } from "../tables/simple-table";

export function SAWCoinOverview() {
    const balanceHolders: Array<{ id: string; name: string; amount: string }> =
        [
            { id: "jd111", name: "John Doe", amount: "100" },
            { id: "js212", name: "Jane Smith", amount: "150" },
            { id: "aj313", name: "Alice Johnson", amount: "200" },
            { id: "mb445", name: "Michael Brown", amount: "75" },
            { id: "sd556", name: "Sarah Davis", amount: "320" },
            { id: "rw667", name: "Robert Wilson", amount: "45" },
            { id: "em778", name: "Emily Miller", amount: "180" },
            { id: "dg889", name: "David Garcia", amount: "95" },
            { id: "lm990", name: "Lisa Martinez", amount: "250" },
            { id: "ca001", name: "Christopher Anderson", amount: "125" },
            { id: "jt112", name: "Jessica Taylor", amount: "85" },
            { id: "kt223", name: "Kevin Thomas", amount: "300" },
        ];
    const balanceHolderCols = [
        { header: "ID", accessor: "id" },
        { header: "Name", accessor: "name" },
        {
            header: "Amount",
            accessor: "amount",
            cell: (row: Record<string, string>) => (
                <strong className="text-red-300">{row.amount}€</strong>
            ),
            align: "right" as const,
        },
    ];

    const transactions: Array<{
        date: string;
        senderID: string;
        senderName: string;
        recipientID: string;
        recipientName: string;
        amount: string;
    }> = [
        {
            date: new Date().toISOString(),
            senderID: "aj313",
            senderName: "Alice Johnson",
            recipientID: "jd111",
            recipientName: "John Doe",
            amount: "150",
        },
        {
            date: new Date().toISOString(),
            senderID: "js212",
            senderName: "Jane Smith",
            recipientID: "aj313",
            recipientName: "Alice Johnson",
            amount: "-40",
        },
        {
            date: new Date().toISOString(),
            senderID: "jd111",
            senderName: "John Doe",
            recipientID: "aj313",
            recipientName: "Alice Johnson",
            amount: "3",
        },
        {
            date: new Date().toISOString(),
            senderID: "aj313",
            senderName: "Alice Johnson",
            recipientID: "jd111",
            recipientName: "John Doe",
            amount: "150",
        },
        {
            date: new Date().toISOString(),
            senderID: "js212",
            senderName: "Jane Smith",
            recipientID: "aj313",
            recipientName: "Alice Johnson",
            amount: "-40",
        },
        {
            date: new Date().toISOString(),
            senderID: "jd111",
            senderName: "John Doe",
            recipientID: "aj313",
            recipientName: "Alice Johnson",
            amount: "3",
        },
        {
            date: new Date().toISOString(),
            senderID: "aj313",
            senderName: "Alice Johnson",
            recipientID: "jd111",
            recipientName: "John Doe",
            amount: "150",
        },
        {
            date: new Date().toISOString(),
            senderID: "js212",
            senderName: "Jane Smith",
            recipientID: "aj313",
            recipientName: "Alice Johnson",
            amount: "-40",
        },
        {
            date: new Date().toISOString(),
            senderID: "jd111",
            senderName: "John Doe",
            recipientID: "aj313",
            recipientName: "Alice Johnson",
            amount: "3",
        },
        {
            date: new Date().toISOString(),
            senderID: "aj313",
            senderName: "Alice Johnson",
            recipientID: "jd111",
            recipientName: "John Doe",
            amount: "150",
        },
        {
            date: new Date().toISOString(),
            senderID: "js212",
            senderName: "Jane Smith",
            recipientID: "aj313",
            recipientName: "Alice Johnson",
            amount: "-40",
        },
        {
            date: new Date().toISOString(),
            senderID: "jd111",
            senderName: "John Doe",
            recipientID: "aj313",
            recipientName: "Alice Johnson",
            amount: "3",
        },
        {
            date: new Date().toISOString(),
            senderID: "aj313",
            senderName: "Alice Johnson",
            recipientID: "jd111",
            recipientName: "John Doe",
            amount: "150",
        },
        {
            date: new Date().toISOString(),
            senderID: "js212",
            senderName: "Jane Smith",
            recipientID: "aj313",
            recipientName: "Alice Johnson",
            amount: "-40",
        },
        {
            date: new Date().toISOString(),
            senderID: "jd111",
            senderName: "John Doe",
            recipientID: "aj313",
            recipientName: "Alice Johnson",
            amount: "3",
        },
        {
            date: new Date().toISOString(),
            senderID: "aj313",
            senderName: "Alice Johnson",
            recipientID: "jd111",
            recipientName: "John Doe",
            amount: "150",
        },
        {
            date: new Date().toISOString(),
            senderID: "js212",
            senderName: "Jane Smith",
            recipientID: "aj313",
            recipientName: "Alice Johnson",
            amount: "-40",
        },
        {
            date: new Date().toISOString(),
            senderID: "jd111",
            senderName: "John Doe",
            recipientID: "aj313",
            recipientName: "Alice Johnson",
            amount: "3",
        },
        {
            date: new Date().toISOString(),
            senderID: "aj313",
            senderName: "Alice Johnson",
            recipientID: "jd111",
            recipientName: "John Doe",
            amount: "150",
        },
        {
            date: new Date().toISOString(),
            senderID: "js212",
            senderName: "Jane Smith",
            recipientID: "aj313",
            recipientName: "Alice Johnson",
            amount: "-40",
        },
        {
            date: new Date().toISOString(),
            senderID: "jd111",
            senderName: "John Doe",
            recipientID: "aj313",
            recipientName: "Alice Johnson",
            amount: "3",
        },
    ];

    const transactionCols = [
        {
            header: "Date",
            accessor: "date",
            cell: (row: Record<string, string>) =>
                new Date(row.date).toLocaleDateString(),
        },
        { header: "Sender ID", accessor: "senderID" },
        { header: "Sender Name", accessor: "senderName" },
        { header: "Recipient ID", accessor: "recipientID" },
        { header: "Recipient Name", accessor: "recipientName" },
        {
            header: "Amount",
            accessor: "amount",
            cell: (row: Record<string, string>) => (
                <strong
                    className={
                        parseInt(row.amount) > 0
                            ? "text-green-300"
                            : "text-red-300"
                    }
                >
                    {row.amount}€
                </strong>
            ),
            align: "right" as const,
        },
    ];

    return (
        <div className="flex flex-row flex-wrap gap-4 w-full p-6 h-fit">
            <Card className="flex-1 gap-4 p-4 text-center h-fit">
                <div className="text-lg font-semibold sticky">
                    Current EWash balance holders
                </div>
                <CardDescription className="flex flex-col overflow-y-auto border-t border-b">
                    <SimpleTable
                        columns={balanceHolderCols}
                        data={balanceHolders}
                    />
                </CardDescription>
                <div className="text-sm text-center text-muted-foreground">
                    Current EWash balance holders
                </div>
            </Card>
            <Card className="flex-2 gap-4 p-4 max-h-[80vh]  justify-center text-center">
                <div className="text-lg font-semibold sticky">
                    Last Transactions
                </div>
                <CardDescription className="flex flex-col overflow-y-auto border-t border-b">
                    <SimpleTable
                        columns={transactionCols}
                        data={transactions}
                    />
                </CardDescription>
                <div className="text-sm text-center text-muted-foreground">
                    Last Transactions
                </div>
            </Card>
        </div>
    );
}
