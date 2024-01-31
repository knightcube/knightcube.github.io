import Header from '../components/Header'
import HeroSection from '../components/HeroSection'
import Skills from '../components/Skills'
import Projects from '../components/Projects'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div>
        <Header/>
        <HeroSection/>
        <Projects/>
        <Skills/>
        <Footer/>
    </div>
  )
}

export default Home