import Navbar from "./components/landing/Navbar";
import Hero from "./components/landing/Hero";
import PopularSchools from "./components/landing/PopularSchools";
import Footer from "./components/landing/Footer";

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <PopularSchools />
      <Footer />
    </>
  );
};

export default LandingPage;
