import type { Metadata } from "next";
import { Itim } from "next/font/google";
import "./globals.css";

const itim = Itim({
  variable: "--font-itim",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Jotty",
  description:
    "Jotty is a platform that provides you with daily journaling prompts, journaling templates, and journaling tools.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${itim.variable}`}>{children}</body>
    </html>
  );
}
