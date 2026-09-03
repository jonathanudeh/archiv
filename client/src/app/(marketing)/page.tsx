import PopularMaterials from "@/src/features/home/components/PopularMaterials";
import Hero from "../../features/home/components/Hero";
import PopularSchools from "../../features/home/components/PopularSchools";

const LandingPage = () => {
  return (
    <>
      <Hero />
      <PopularSchools />
      <PopularMaterials />
    </>
  );
};

export default LandingPage;
