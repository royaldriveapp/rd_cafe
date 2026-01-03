import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import WhyRDCafe from "@/components/home/WhyRDCafe";
import FeaturedMenu from "@/components/home/FeaturedMenu";
import DiningHours from "@/components/home/DiningHours";
import QualityPhilosophy from "@/components/home/QualityPhilosophy";
import ComfortAmenities from "@/components/home/ComfortAmenities";
import FamilyFocus from "@/components/home/FamilyFocus";
import AboutPreview from "@/components/home/AboutPreview";
import VisitCTA from "@/components/home/VisitCTA";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <WhyRDCafe />
      <FeaturedMenu />
      <DiningHours />
      <QualityPhilosophy />
      <ComfortAmenities />
      <FamilyFocus />
      <AboutPreview />
      <VisitCTA />
    </Layout>
  );
};

export default Index;
