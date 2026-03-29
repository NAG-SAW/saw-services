import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import React from "react";

export type SimpleTableProps<TData, TValue> = {
    allowSearch?: boolean;
    sortable?: boolean;
    pagination?: boolean;
    pageSizeOptions?: number[];
    defaultPageSize?: number;
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
};

/** Simple table without any styling */
export function SimpleTable<TData, TValue>({
    columns,
    data,
}: SimpleTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [hoveredId, setHoveredId] = React.useState<string | null>(null);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        state: {
            sorting,
        },
    });

    return (
        <Table>
            <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                            <TableHead
                                key={header.id}
                                className="cursor-pointer p-2"
                                onMouseEnter={() => setHoveredId(header.id)}
                                onMouseLeave={() => setHoveredId(null)}
                                onClick={() =>
                                    header.column.toggleSorting(
                                        header.column.getIsSorted() === "asc",
                                    )
                                }
                            >
                                <div className="flex items-center gap-1">
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                              header.column.columnDef.header,
                                              header.getContext(),
                                          )}
                                    {header.column.getCanSort() && (
                                        <ArrowUpDown
                                            className={`w-4 h-4 ${
                                                hoveredId === header.id
                                                    ? "opacity-100"
                                                    : "opacity-0"
                                            }`}
                                        />
                                    )}
                                </div>
                            </TableHead>
                        ))}
                    </TableRow>
                ))}
            </TableHeader>
            <TableBody>
                {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                        <TableRow
                            key={row.id}
                            data-state={row.getIsSelected() && "selected"}
                        >
                            {row.getVisibleCells().map((cell) => (
                                <TableCell
                                    className={
                                        cell.column.columnDef.meta?.className
                                    }
                                    key={cell.id}
                                >
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext(),
                                    )}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell
                            colSpan={columns.length}
                            className="h-24 text-center"
                        >
                            No results.
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}
