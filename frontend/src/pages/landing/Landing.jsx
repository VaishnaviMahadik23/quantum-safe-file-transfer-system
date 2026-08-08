import "./Landing.css";

import LandingNavbar from "../../components/landing/LandingNavbar";
import LandingHero from "../../components/landing/LandingHero";
import CryptoFlow from "../../components/landing/CryptoFlow";
import LandingStats from "../../components/landing/LandingStats";
import LandingFeatures from "../../components/landing/LandingFeatures";
import LandingFooter from "../../components/landing/LandingFooter";

function Landing() {
  return (
    <div className="landing-page">

      <LandingNavbar />

      <LandingHero />

      <CryptoFlow />

      <LandingStats />

      <LandingFeatures />

      <LandingFooter />

    </div>
  );
}

export default Landing;