import path from "node:path";
import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";

// The parent internship folder also has a package-lock.json. Pin Turbopack
// to this app so it does not treat the Create React App root as the workspace.
const appRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  turbopack: {
    root: appRoot,
  },
  // NFT artwork is hosted on a separate domain. Next.js blocks remote
  // images unless the hostname is listed here, which keeps the image
  // optimizer from fetching arbitrary URLs.
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "nft-place.web.app",
        pathname: "/static/media/**",
      },
    ],
  },
};

export default nextConfig;
