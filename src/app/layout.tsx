import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tahseen AI - AI Solutions That Enhance Your Work",
  description: "We build AI agents and automation systems that help businesses work smarter, faster, and more efficiently.",
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
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased scroll-smooth`}
    >
      <body className="bg-[#060913] text-gray-100 min-h-full flex flex-col selection:bg-[#00E5BE]/30 selection:text-[#00E5BE]">
        {children}
      </body>
    </html>
  );
}
