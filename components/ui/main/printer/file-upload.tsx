"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import clsx from "clsx";
import { FileText, Trash2, Upload } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { Dispatch, SetStateAction, useCallback, useRef, useState } from "react";
import { Badge } from "../../badge";
import { UploadEntry } from "./pdf-converter-view";

type FileUploadProp = {
    files: UploadEntry[];
    setFiles: Dispatch<SetStateAction<UploadEntry[]>>;
};

export function FileUpload({ files, setFiles }: FileUploadProp) {
    const remove = (id: string) => {
        setFiles((f) => f.filter((e) => e.id !== id));
    };

    return (
        <div className="flex flex-col gap-3">
            <Dropzone setFiles={setFiles} />

            <div className="flex flex-col gap-2">
                <AnimatePresence initial={false}>
                    {files.map(({ id, file }) => (
                        <motion.div
                            key={id}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                        >
                            <FileEntry file={file} remove={() => remove(id)} />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
}

type DropzoneProp = {
    setFiles: Dispatch<SetStateAction<UploadEntry[]>>;
};

function Dropzone({ setFiles }: DropzoneProp) {
    const [dragging, setDragging] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const addFiles = useCallback(
        (list: FileList | null) => {
            if (!list) return;
            Array.from(list).forEach((file: File) => {
                const id = crypto.randomUUID();
                setFiles((f) => [...f, { id, file }]);
            });
        },
        [setFiles],
    );

    return (
        <Card
            onClick={() => inputRef.current?.click()}
            onDragOver={(e) => {
                e.preventDefault();
                setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
                e.preventDefault();
                setDragging(false);
                addFiles(e.dataTransfer.files);
            }}
            className={clsx(
                "cursor-pointer items-center border-dashed transition-colors",
                dragging
                    ? "border-primary bg-primary/5"
                    : "border-muted-foreground/25 hover:bg-muted/40",
            )}
        >
            <Badge variant="secondary" className="p-2">
                <Upload className="size-6! text-muted-foreground" />
            </Badge>
            Choose a file or drag &amp; drop it here
            <input
                ref={inputRef}
                type="file"
                accept=".pdf .png"
                multiple
                className="hidden"
                onChange={(e) => addFiles(e.target.files)}
            />
        </Card>
    );
}

type FileEntryProps = {
    file: File;
    remove: () => void;
};

function FileEntry({ file, remove }: FileEntryProps) {
    const fmt = (b: number) =>
        b < 1024 ? `${b} B` : `${Math.round(b / 1024)} KB`;

    return (
        <Card className="flex flex-row items-center px-4 py-2">
            <div>
                <FileText className="size-10 text-muted-foreground" />
                <Badge variant="destructive" className="text-xs">
                    {file.type.split("/").at(-1)?.toUpperCase()}
                </Badge>
            </div>
            <div className="flex flex-col flex-1 gap-1">
                <p className="truncate">{file.name}</p>
                <p className="text-xs text-muted-foreground">
                    {fmt(file.size)}
                </p>
            </div>
            <Button variant="destructive" onClick={() => remove()}>
                <Trash2 className="size-4" />
            </Button>
        </Card>
    );
}
