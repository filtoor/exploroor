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
      <body className="text-white bg-zinc-900">
        <div className="flex justify-center">{children}</div>
        <span className="w-full text-center text-xs block mt-[-24px]">
          made with ❤️ by the folks at{" "}
          <a href="https://filtoor.xyz" target="_blank" className="underline">
            filtoor
          </a>
        </span>
      </body>
    </html>
  );
}
