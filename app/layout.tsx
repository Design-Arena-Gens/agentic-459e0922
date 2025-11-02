import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rent Management System",
  description: "Manage properties, tenants, and rent payments",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
