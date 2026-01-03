import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import FeaturedMenu from "@/components/home/FeaturedMenu";
import AboutPreview from "@/components/home/AboutPreview";
import VisitCTA from "@/components/home/VisitCTA";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <FeaturedMenu />
      <AboutPreview />
      <VisitCTA />
    </Layout>
  );
};

export default Index;
