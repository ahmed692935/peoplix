import { lazy } from "react";
// const BookDemo = lazy(() => import("../components/LandingPageComponents/BookDemo"));
const Contact = lazy(() => import("../components/LandingPageComponents/Contact"));
const BusinessImpact = lazy(() => import("../components/LandingPageComponents/BuisnessValue"));
const Faqs = lazy(() => import("../components/LandingPageComponents/Faqs"));
const Features = lazy(() => import("../components/LandingPageComponents/Features"));
const Footer = lazy(() => import("../components/LandingPageComponents/Footer"));
const HeroSection = lazy(() => import("../components/LandingPageComponents/HeroSection"));
const LiveCallExperience = lazy(() => import("../components/LandingPageComponents/LiveCallExperience"));
const HowItWorks = lazy(() => import("../components/LandingPageComponents/HowItWorks"));
const Solution = lazy(() => import("../components/LandingPageComponents/Solution"));
const TheProblem = lazy(() => import("../components/LandingPageComponents/TheProblem"));
const WhoItsFor = lazy(() => import("../components/LandingPageComponents/WhoItFor"));

const LandingPage = () => {
  return (
    <div className="bg-background text-white">
      <HeroSection />

      <div id="problem">
        <TheProblem />
      </div>
      <LiveCallExperience />
      <div className="py-16 px-6 lg:px-16 border-t border-divider">
        <div id="solution">
          <Solution />
        </div>
        <Features />
      </div>
      <div className="pb-20 border-b border-divider">
        <HowItWorks />
      </div>
      <div id="company">
        <WhoItsFor />
      </div>
      <div id="resources">
        <BusinessImpact />
      </div>
      <Faqs />
      {/* <BookDemo /> */}
      <Contact />
      <Footer />
    </div>
  );
};

export default LandingPage;
