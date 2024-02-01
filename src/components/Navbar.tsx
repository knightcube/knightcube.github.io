import { Menu, X } from "lucide-react";
import { useState } from "react";

const NavLinks = () => {
  return (
    <div className="w-full flex flex-col lg:flex-row lg:gap-10 lg:pr-0 lg:bg-transparent absolute top-0 left-0 lg:relative text-center mt-10 lg:mt-0 text-md">
      <a href="#about">About</a>
      <a href="#projects">Projects</a>
      <a href="#skills">Skills</a>
      <a href="#articles">Articles</a>
      {/* <NavLink to="/">Home</NavLink>
      <NavLink to="#skills">Skills</NavLink>
      <NavLink to="/projects">Project</NavLink> */}
    </div>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <nav className="w-full">
        <div className="hidden w-full lg:gap-10 lg:flex">
          <NavLinks />
        </div>
        <div className="lg:hidden justify-end">
          <button onClick={toggleNavbar}>{isOpen ? <X /> : <Menu />}</button>
        </div>
        {isOpen && (
          <div className="flex flex-col items-center basis-full">
            <NavLinks />
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
