import SocialIcons from "../ui/SocialIcons";

const Footer = () => {
  return (
    <div className="text-center mb-10">
      
      Made with ♥ by{" "}
      <a className="text-blue-500" target="_blank" href="https://github.com/knightcube/knightcube.github.io">
        @knightcube
      </a>
      <div className="mt-4 flex flex-row gap-8 justify-center">
        <SocialIcons />
      </div>
    </div>
  );
};

export default Footer;
