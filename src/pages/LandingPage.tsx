import { lazy } from "react";
const BookDemo = lazy(() => import("../components/LandingPageComponents/BookDemo"));
const BusinessImpact = lazy(() => import("../components/LandingPageComponents/BuisnessValue"));
const Faqs = lazy(() => import("../components/LandingPageComponents/Faqs"));
const Features = lazy(() => import("../components/LandingPageComponents/Features"));
const Footer = lazy(() => import("../components/LandingPageComponents/Footer"));
const HeroSection = lazy(() => import("../components/LandingPageComponents/HeroSection"));
const HowItWorks = lazy(() => import("../components/LandingPageComponents/HowItWorks"));
const Solution = lazy(() => import("../components/LandingPageComponents/Solution"));
const TheProblem = lazy(() => import("../components/LandingPageComponents/TheProblem"));
const WhoItsFor = lazy(() => import("../components/LandingPageComponents/WhoItFor"));

const LandingPage = () => {
  return (
    <div className="p-3 bg-gray-100">
      <HeroSection />
      <div id="problem">
        <TheProblem />
      </div>
      <div className="bg-white rounded-t-[40px] py-16 px-6 lg:px-16">
        <div id="solution">
          <Solution />
        </div>
        <Features />
      </div>
      <div className="bg-white rounded-b-[40px] pb-20">
        <HowItWorks />
      </div>
      <div id="company">
        <WhoItsFor />
      </div>
      <div id="resources">
        <BusinessImpact />
      </div>
      <Faqs />
      <BookDemo />
      <Footer />
    </div>
  );
};

export default LandingPage;
