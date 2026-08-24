import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

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
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${inter.variable} h-full antialiased scroll-smooth`}
    >
      <body className="bg-[#050814] text-gray-100 min-h-full flex flex-col selection:bg-[#00E5BE]/30 selection:text-[#00E5BE] font-sans">
        {children}
      </body>
    </html>
  );
}
