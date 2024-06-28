import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Scheduler",
  description: "Be more productive with AI Scheduler",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <script async type="module" src="https://cdn.jsdelivr.net/npm/ldrs/dist/auto/helix.js"></script>
        {children}
        </body>
    </html>
  );
}
