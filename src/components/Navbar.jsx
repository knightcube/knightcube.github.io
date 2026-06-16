import { useState } from "react";
import { NavLink, Link } from "react-router-dom";

export default function Navbar() {
  const [isWorkDropdownOpen, setIsWorkDropdownOpen] = useState(false);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Common style for nav links
  const baseClass =
    "text-on-surface-variant hover:text-primary-container transition-colors duration-200 flex items-center gap-1";
  const activeClass =
    "text-primary-container border-b-2 border-primary-container pb-1";
  const mobileLinkClass = "block text-[18px] py-3 border-b border-outline-variant/10 text-on-surface hover:text-primary-container transition-colors uppercase tracking-widest";

  // Lock body scroll when mobile menu is open
  if (isMobileMenuOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-md border-b border-outline-variant/20">
        <div className="flex justify-between items-center px-margin-mobile md:px-margin-desktop py-4 max-w-container-max mx-auto relative">
          <Link
            to="/"
            className="font-headline-md text-headline-md font-bold text-on-surface tracking-tight z-50"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Rajat Kumar Gupta
          </Link>

          {/* Mobile Menu Toggle Button */}
          <button
            className="md:hidden z-50 text-on-surface hover:text-primary-container transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className="material-symbols-outlined text-[32px]">
              {isMobileMenuOpen ? "close" : "menu"}
            </span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 font-label-md text-label-md uppercase tracking-widest">
            <NavLink to="/" end className={({ isActive }) => `${baseClass} ${isActive ? activeClass : ""}`}>Home</NavLink>

            {/* Work Dropdown Container */}
            <div
              className="relative"
              onMouseEnter={() => setIsWorkDropdownOpen(true)}
              onMouseLeave={() => setIsWorkDropdownOpen(false)}
            >
              <button className={`${baseClass} py-2 ${isWorkDropdownOpen ? "text-primary-container uppercase" : "uppercase"}`}>
                Technical{" "}
                <span className={`material-symbols-outlined text-[18px] transition-transform duration-300 ${isWorkDropdownOpen ? "rotate-180" : ""}`}>
                  expand_more
                </span>
              </button>

              {/* Dropdown Menu - FIXED HOVER BRIDGE */}
              {isWorkDropdownOpen && (
                <div className="absolute top-full left-0 pt-4 w-64 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="bg-[#121212]/95 backdrop-blur-xl border border-[#262626] rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col py-2">
                    <NavLink to="/software" onClick={() => setIsWorkDropdownOpen(false)} className={({ isActive }) => `px-6 py-3 hover:bg-[#1a1a1a] transition-colors flex items-center gap-3 ${isActive ? "text-primary-container bg-primary-container/5" : "text-on-surface"}`}>
                      <span className="material-symbols-outlined text-[18px]">terminal</span>Coding
                    </NavLink>
                    <NavLink to="/ar-vr" onClick={() => setIsWorkDropdownOpen(false)} className={({ isActive }) => `px-6 py-3 hover:bg-[#1a1a1a] transition-colors flex items-center gap-3 ${isActive ? "text-primary-container bg-primary-container/5" : "text-on-surface"}`}>
                      <span className="material-symbols-outlined text-[18px]">view_in_ar</span>AR/VR
                    </NavLink>
                    {/* <NavLink to="/animations" onClick={() => setIsWorkDropdownOpen(false)} className={({ isActive }) => `px-6 py-3 hover:bg-[#1a1a1a] transition-colors flex items-center gap-3 ${isActive ? "text-primary-container bg-primary-container/5" : "text-on-surface"}`}>
                      <span className="material-symbols-outlined text-[18px]">3d_rotation</span>3D Animations
                    </NavLink>
                    <NavLink to="/graphics" onClick={() => setIsWorkDropdownOpen(false)} className={({ isActive }) => `px-6 py-3 hover:bg-[#1a1a1a] transition-colors flex items-center gap-3 ${isActive ? "text-primary-container bg-primary-container/5" : "text-on-surface"}`}>
                      <span className="material-symbols-outlined text-[18px]">brush</span>Graphic Design
                    </NavLink> */}
                  </div>
                </div>
              )}
            </div>

            <NavLink to="/archives" className={({ isActive }) => `${baseClass} ${isActive ? activeClass : ""}`}>Archives</NavLink>
            {/* <NavLink to="/shop" className={({ isActive }) => `${baseClass} ${isActive ? activeClass : ""}`}>Shop</NavLink> */}
            <NavLink to="/gallery" className={({ isActive }) => `${baseClass} ${isActive ? activeClass : ""}`}>Gallery</NavLink>
            <NavLink to="/contact" className={({ isActive }) => `${baseClass} ${isActive ? activeClass : ""}`}>Contact</NavLink>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-surface/95 backdrop-blur-xl z-40 flex flex-col pt-24 px-margin-mobile overflow-y-auto pb-10 animate-in fade-in duration-300 md:hidden">
          <div className="flex flex-col gap-2">
            <NavLink to="/" end onClick={() => setIsMobileMenuOpen(false)} className={mobileLinkClass}>Home</NavLink>
            <span className="font-label-sm text-primary-container uppercase tracking-widest mt-6 mb-2">Technical</span>
            <div className="flex flex-col pl-4 gap-2 border-l border-outline-variant/20 ml-2">
              <NavLink to="/software" onClick={() => setIsMobileMenuOpen(false)} className={mobileLinkClass}>Coding</NavLink>
              <NavLink to="/ar-vr" onClick={() => setIsMobileMenuOpen(false)} className={mobileLinkClass}>AR/VR</NavLink>
              <NavLink to="/animations" onClick={() => setIsMobileMenuOpen(false)} className={mobileLinkClass}>3D Animations</NavLink>
              <NavLink to="/graphics" onClick={() => setIsMobileMenuOpen(false)} className={mobileLinkClass}>Graphic Design</NavLink>
            </div>
            <span className="font-label-sm text-primary-container uppercase tracking-widest mt-6 mb-2">Explore</span>
            <NavLink to="/archives" onClick={() => setIsMobileMenuOpen(false)} className={mobileLinkClass}>Archives</NavLink>
            <NavLink to="/shop" onClick={() => setIsMobileMenuOpen(false)} className={mobileLinkClass}>Shop</NavLink>
            <NavLink to="/gallery" onClick={() => setIsMobileMenuOpen(false)} className={mobileLinkClass}>Gallery</NavLink>
            <NavLink to="/contact" onClick={() => setIsMobileMenuOpen(false)} className={mobileLinkClass}>Contact</NavLink>
          </div>
        </div>
      )}
    </>
  );
}
