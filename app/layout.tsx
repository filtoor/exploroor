import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "exploroor",
  description: "solami transactions fast",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="text-black bg-white">
        <div className="flex justify-center">{children}</div>
      </body>
    </html>
  );
}
