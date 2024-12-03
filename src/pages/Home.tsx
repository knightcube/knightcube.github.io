import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import Skills from "../components/Skills";
import Projects from "../components/CodingProjects";
import Footer from "../components/Footer";
import Articles from "../components/Articles";
import { Analytics } from "@vercel/analytics/react";
import ArtProjects from "../components/ArtProjects";

const Home = () => {
  return (
    <div>
      <Header />
      <HeroSection />
      {/* <ArtProjects/>
      <Projects />
      <Skills /> */}
      <Articles />
      <Footer />
      <Analytics />
    </div>
  );
};

export default Home;
