"use client";
import { TypographyInlineCode } from "@/components/typography-inline-code";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "../../button";
import { Card, CardDescription, CardFooter, CardHeader } from "../../card";
import { FileUpload } from "./file-upload";

export type UploadEntry = {
    id: string;
    file: File;
};

export function PDFConverterView() {
    const [files, setFiles] = useState<UploadEntry[]>([]);

    const { mutate: convert, isPending } = useMutation({
        mutationFn: async (files: UploadEntry[]) => {
            const form = new FormData();
            files.forEach((e) => form.append("files", e.file));
            console.log(form.values);
            const res = await fetch("/api/convert", {
                method: "POST",
                body: form,
            });
            if (!res.ok) throw new Error("Conversion failed");

            const blob = await res.blob();
            return blob;
        },
        // trigger browser download
        onSuccess: (blob: Blob) => {
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            //TODO: Name from response
            a.download = "result.pdf";
            a.click();
            URL.revokeObjectURL(url);
        },
    });

    return (
        <Card>
            <CardHeader>
                <p>
                    Upload <TypographyInlineCode>PDF</TypographyInlineCode>{" "}
                    files to convert them to{" "}
                    <TypographyInlineCode>PDF/A</TypographyInlineCode>
                </p>
                <p className="text-muted-foreground">
                    Our printer does not support some fonts in PDF, therefore
                    you might have to convert your PDF to a PDF/A file (older
                    format that contains only supported fonts) beforehand.
                </p>
            </CardHeader>
            <CardDescription className="px-6">
                <FileUpload files={files} setFiles={setFiles} />
            </CardDescription>
            <CardFooter className="justify-end">
                <Button
                    className="w-full"
                    variant="confirm"
                    onClick={() => convert(files)}
                    disabled={isPending || files.length === 0}
                >
                    Convert
                </Button>
            </CardFooter>
        </Card>
    );
}
