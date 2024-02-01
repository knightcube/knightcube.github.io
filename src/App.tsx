import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} errorElement={<PageNotFound/>}>
          <Route index element={<Home />} />
          {/* <Route path="blogs" element={<Blog />} />
          <Route path="about" element={<About />} />
          <Route path="*" element={<NoPage />} /> */}
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
