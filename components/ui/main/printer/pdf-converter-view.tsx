"use client";
import { TypographyInlineCode } from "@/components/typography-inline-code";
import { useMutation, useQueries } from "@tanstack/react-query";
import { Download } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "../../button";
import { Card, CardDescription, CardFooter, CardHeader } from "../../card";
import { Spinner } from "../../spinner";
import { FileUpload } from "./file-upload";

export type UploadEntry = {
    id: string;
    file: File;
};

type ConvertedFile = {
    uuid: string;
    originalName: string;
};

function triggerDownload(blob: Blob, originalName: string) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = originalName.replace(/\.pdf$/i, "") + "-pdfa.pdf";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
}

export function PDFConverterView() {
    const [files, setFiles] = useState<UploadEntry[]>([]);
    const [converted, setConverted] = useState<ConvertedFile[]>([]);
    const downloadedRef = useRef(new Set<string>());

    const { mutate: convert, isPending } = useMutation({
        mutationFn: async (filesToConvert: UploadEntry[]) => {
            const results = await Promise.all(
                filesToConvert.map(async (file) => {
                    const formData = new FormData();
                    formData.append("file", file.file);

                    const res = await fetch("/api/upload", {
                        method: "POST",
                        body: formData,
                    });

                    if (!res.ok) {
                        const err = await res
                            .json()
                            .catch(() => ({ detail: res.statusText }));
                        throw new Error(err.detail ?? "Upload failed");
                    }

                    const { uuid } = (await res.json()) as { uuid: string };
                    return { uuid, originalName: file.file.name };
                }),
            );
            return results;
        },
        onSuccess: (results) => {
            setConverted((prev) => [...prev, ...results]);
        },
    });

    // Fetch each converted file in parallel
    const downloadQueries = useQueries({
        queries: converted.map(({ uuid }) => ({
            queryKey: ["file", uuid],
            queryFn: async () => {
                const res = await fetch(`/api/files/${uuid}.pdf`);
                if (!res.ok) throw new Error("Download failed");
                return res.blob();
            },
            staleTime: Infinity, // file is immutable — never refetch
        })),
    });

    // Trigger browser download as each blob arrives; only once per uuid
    useEffect(() => {
        downloadQueries.forEach((result, i) => {
            const { uuid, originalName } = converted[i];
            if (result.data && !downloadedRef.current.has(uuid)) {
                downloadedRef.current.add(uuid);
                triggerDownload(result.data, originalName);
            }
        });
    }, [downloadQueries, converted]);

    // Manual re-download of every ready blob
    const downloadAll = useCallback(() => {
        downloadQueries.forEach((result, i) => {
            if (result.data) {
                triggerDownload(result.data, converted[i].originalName);
            }
        });
    }, [downloadQueries, converted]);

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
            <CardFooter className="flex flex-col gap-2 justify-end">
                <Button
                    className="w-full"
                    variant="confirm"
                    onClick={() => convert(files)}
                    disabled={isPending || files.length === 0}
                >
                    {isPending ? (
                        <>
                            <Spinner data-icon="inline-start" /> Converting
                        </>
                    ) : (
                        <span>Convert</span>
                    )}
                </Button>
                <div className="flex flex-col w-full text-center gap-2">
                    <Button
                        className="w-full"
                        variant="secondary"
                        onClick={downloadAll}
                        disabled={isPending || converted.length === 0}
                    >
                        <Download data-icon="inline-start" />
                        Download
                    </Button>
                    <p className="text-muted-foreground text-sm">
                        If the download does not trigger automatically click the
                        button to trigger it manually. Keep in mind that the
                        conversion can take a while
                    </p>
                </div>
            </CardFooter>
        </Card>
    );
}
