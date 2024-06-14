import Header from "./Partials/Header";
import HeroSection from "./Partials/HeroSection";
import FeatureSection from "./Partials/FeatureSection";
import CallToAction from "./Partials/CallToActionSection";

const Public = () => {
  return (
    <div>
      <Header />
      <div className="container mx-auto px-4 py-16 ">
        <HeroSection />
        <FeatureSection />
      </div>
      <CallToAction />
    </div>
  );
};
export default Public;
