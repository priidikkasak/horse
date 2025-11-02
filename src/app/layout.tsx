import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Horse Stable Management",
  description: "Manage your horse stable efficiently",
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
