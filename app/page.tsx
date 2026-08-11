import React from "react";
import HeroBanner from "@/components/home/HeroBanner";
import CompanyIntro from "@/components/home/CompanyIntro";
import ServicesGrid from "@/components/home/ServicesGrid";
import BusinessSolutions from "@/components/home/BusinessSolutions";
import IndustriesCarousel from "@/components/home/IndustriesCarousel";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import StatsCounter from "@/components/home/StatsCounter";
import WorkProcess from "@/components/home/WorkProcess";
import CareersHighlight from "@/components/home/CareersHighlight";
import InquiryForm from "@/components/home/InquiryForm";

export default function Home() {
  return (
    <div className="flex flex-col w-full bg-transparent">
      <HeroBanner />
      <CompanyIntro />
      <ServicesGrid />
      <BusinessSolutions />
      <IndustriesCarousel />
      <WhyChooseUs />
      <StatsCounter />
      <WorkProcess />
      <CareersHighlight />
      <InquiryForm />
    </div>
  );
}
export const metadata = {
  title: "Sumway Global Management | Global Workforce, BPO & IT Solutions",
  description: "Sumway Global Management Pvt. Ltd. is a premier corporate agency based in Jaipur, Rajasthan, offering professional recruitment, global BPO desk solutions, skill development modules, and custom software transformation.",
  openGraph: {
    title: "Sumway Global Management | Enterprise Staffing & Digital Systems",
    description: "Jaipur Stock Exchange based global recruitment consulting and digital transformations agency.",
    type: "website",
    locale: "en_IN"
  }
};
