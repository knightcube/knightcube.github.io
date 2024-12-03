import { FC } from "react";
import Navbar from "./Navbar";

const Header: FC = () => {
  return (
    <header className="flex static bg-white lg:static z-10 items-center flex-wrap top-0 justify-between w-full mx-auto px-5 py-2 lg:px-52 lg:py-4">
      <a href="/">
        <h1 className="text-xl font-bold">Rajat Kumar Gupta</h1>
      </a>
      {/* <div className="w-16 h-16 logo">
        <img src="/images/profile_pic.png" alt="Rajat Kumar Gupta" />
      </div> */}
      <div>
        <Navbar />
      </div>
    </header>
  );
};

export default Header;
