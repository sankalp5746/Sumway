import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/shared/WhatsAppButton";
import EnquiryButton from "@/components/shared/EnquiryButton";
import EnquiryModal from "@/components/forms/EnquiryModal";
import CustomCursor from "@/components/shared/CustomCursor";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["700", "800"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Sumway Global Management | Premium Staffing, BPO & IT Software Solutions",
  description: "Sumway Global Management Private Limited is a premium recruitment agency and BPO provider, offering professional contract staffing, international call desks, digital transformation and skill development in Jaipur.",
  keywords: ["Recruitment", "Staffing Solutions", "BPO", "RPO", "IT Outsourcing", "Jaipur Stock Exchange", "Sumway Global"],
  metadataBase: new URL("https://sumwayglobal.com"),
  openGraph: {
    title: "Sumway Global Management | Global Workforce, BPO & IT Solutions",
    description: "Corporate recruitment and virtual support desk agency based in Malviya Nagar, Jaipur.",
    url: "https://sumwayglobal.com",
    siteName: "Sumway Global",
    images: [
      {
        url: "/images/logo.png",
        width: 800,
        height: 600,
        alt: "Sumway Global Corporate Logo"
      }
    ],
    locale: "en_IN",
    type: "website"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col justify-between relative selection:bg-[#F5C542] selection:text-[#0A0F1E]">
        {/* Subtle noise grain texture overlay */}
        <div className="noise-overlay" />
        
        {/* Custom cursor glow on desktop */}
        <CustomCursor />

        {/* Global sticky Navbar header */}
        <Navbar />

        {/* Main page content wrapper */}
        <main className="flex-grow w-full relative">
          {children}
        </main>

        {/* Global structured Footer */}
        <Footer />

        {/* Global floating actions */}
        <WhatsAppButton />
        <EnquiryButton />
        <EnquiryModal />
      </body>
    </html>
  );
}
