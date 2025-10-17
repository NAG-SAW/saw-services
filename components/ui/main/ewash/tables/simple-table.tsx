import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

// Helper function to get nested value from object using dot notation
function getNestedValue(obj: Record<string, unknown>, path: string): string {
    const value = path.split(".").reduce((current: unknown, key: string) => {
        return current && typeof current === "object" && current !== null
            ? (current as Record<string, unknown>)[key]
            : "";
    }, obj);

    return typeof value === "string" ? value : String(value || "");
}

export type SimpleTableProps = {
    allowSearch?: boolean;
    sortable?: boolean;
    pagination?: boolean;
    pageSizeOptions?: number[];
    defaultPageSize?: number;
    caption?: string;
    columns: {
        header: string;
        accessor: string; // Now supports dot notation like "user.profile.name"
        cell?: (row: Record<string, string>) => React.ReactNode;
        width?: string | number;
        align?: "left" | "center" | "right";
    }[];
    data: Record<string, string>[]; // Now supports nested objects
};

export function SimpleTable({ columns, data, caption }: SimpleTableProps) {
    return (
        <Table>
            <TableCaption>{caption}</TableCaption>
            <TableHeader>
                <TableRow className="text-left p-2">
                    {columns.map((column) => (
                        <TableHead
                            key={column.accessor}
                            className={`w-[${column.width}] text-${
                                column.align || "left"
                            } p-2`}
                        >
                            {column.header}
                        </TableHead>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((row, rowIndex) => (
                    <TableRow key={rowIndex} className="text-left p-2">
                        {columns.map((column) => (
                            <TableCell
                                key={column.accessor}
                                className={`w-[${column.width}] text-${
                                    column.align || "left"
                                } p-2`}
                            >
                                {column.cell
                                    ? column.cell(row)
                                    : getNestedValue(row, column.accessor)}
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
