import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import Footer from "../components/Footer";
import Articles from "../components/Articles";
import { Analytics } from "@vercel/analytics/react";

const Home = () => {
  return (
    <div>
      <Header />
      <HeroSection />
      <Projects />
      <Skills />
      <Articles />
      <Footer />
      <Analytics />
    </div>
  );
};

export default Home;
