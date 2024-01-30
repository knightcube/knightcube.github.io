import { Menu, X } from "lucide-react";
import { useState } from "react";

const NavLinks = () => {
  return (
    <div className="w-full flex flex-col md:flex-row md:gap-10 md:pr-0 md:bg-transparent absolute top-0 left-0 md:relative text-center mt-10 md:mt-0 text-xl">
      <a href="#about">About</a>
      <a href="#skills">Skills</a>
      <a href="#projects">Projects</a>
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
        <div className="hidden w-full md:gap-10 md:flex">
          <NavLinks />
        </div>
        <div className="md:hidden justify-end">
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
