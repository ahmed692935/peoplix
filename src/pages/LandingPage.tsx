import BookDemo from "../components/LandingPageComponents/BookDemo";
import BusinessImpact from "../components/LandingPageComponents/BuisnessValue";
import Faqs from "../components/LandingPageComponents/Faqs";
import Features from "../components/LandingPageComponents/Features";
import Footer from "../components/LandingPageComponents/Footer";
import HeroSection from "../components/LandingPageComponents/HeroSection";
import HowItWorks from "../components/LandingPageComponents/HowItWorks";
import Solution from "../components/LandingPageComponents/Solution";
import TheProblem from "../components/LandingPageComponents/TheProblem";
import WhoItsFor from "../components/LandingPageComponents/WhoItFor";

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
