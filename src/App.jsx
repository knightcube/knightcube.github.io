import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';

// Import the newly renamed components
import SoftwareWork from './pages/SoftwareWork';
import ArVrWork from './pages/ArVrWork';
import AnimationsWork from './pages/AnimationsWork';
import GraphicsWork from './pages/GraphicsWork';

import CaseStudy from './pages/CaseStudy';
import Shop from './pages/Shop';
import Archives from './pages/Archives';
import Contact from './pages/Contact';
import Gallery from './pages/Gallery';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';

function App() {
  return (
    <Router>
      <div className="grid-bg"></div>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        {/* Updated Work Routes */}
        <Route path="/software" element={<SoftwareWork />} />
        <Route path="/ar-vr" element={<ArVrWork />} />
        <Route path="/animations" element={<AnimationsWork />} />
        <Route path="/graphics" element={<GraphicsWork />} />

        <Route path="/projects/:id" element={<CaseStudy />} />
        <Route path="/archives" element={<Archives />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;