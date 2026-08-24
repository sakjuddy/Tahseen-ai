import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tahseen AI - AI Solutions That Enhance Your Work",
  description: "We build agents and automation systems that help businesses work smarter, faster, and more efficiently.",
  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased scroll-smooth">
      <body className="bg-[#050814] text-gray-100 min-h-full flex flex-col selection:bg-cyan-500/30 selection:text-cyan-200">
        {children}
      </body>
    </html>
  );
}
