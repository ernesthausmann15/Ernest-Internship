import type { Metadata } from "next";
import { Outfit, Syne } from "next/font/google";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import "./globals.css";

/**
 * Root layout.
 *
 * What: The HTML shell around every route.
 * Why: Header and footer should persist while the page in the middle changes.
 * How: Outfit is the body font. Syne is exposed as `--font-display` and used
 *      by the `font-heading` utility. The header is a client island for the
 *      menu and wallet dialog.
 */

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: {
    default: "Ultraverse",
    template: "%s · Ultraverse",
  },
  description:
    "Create, sell, or collect digital items. Live NFT collections, sellers, and auctions.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${syne.variable} dark h-full antialiased`}
    >
      <body className={`${outfit.className} flex min-h-full flex-col bg-background text-foreground`}>
        <div className="aurora pointer-events-none fixed inset-0 -z-10" />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
