const API_URL = process.env.API_URL ?? "http://127.0.0.1:8000";

async function proxy(
    req: Request,
    { params }: { params: Promise<{ path: string[] }> },
) {
    const { path } = await params;
    const url = new URL(req.url);
    const target = `${API_URL}/${path.join("/")}${url.search}`;

    // Forward method, headers, and body. Strip host so the upstream sets its own.
    const headers = new Headers(req.headers);
    headers.delete("host");

    const upstream = await fetch(target, {
        method: req.method,
        headers,
        body:
            req.method === "GET" || req.method === "HEAD"
                ? undefined
                : req.body,
        // @ts-expect-error — Node fetch needs this for streaming request bodies
        duplex: "half",
    });

    return new Response(upstream.body, {
        status: upstream.status,
        headers: upstream.headers,
    });
}

export {
    proxy as DELETE,
    proxy as GET,
    proxy as PATCH,
    proxy as POST,
    proxy as PUT,
};
