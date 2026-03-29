import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* Define proxy so browser sets the cookies from auth for webapp */
    async rewrites() {
        return [
            {
                source: "/api/:path*",
                destination: "http://127.0.0.1:8000/:path*",
            },
        ];
    },
};

export default nextConfig;
