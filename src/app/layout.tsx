import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pariisi Tall - Haldussüsteem",
  description: "Halda oma talli tõhusalt",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
