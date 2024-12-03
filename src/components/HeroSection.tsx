import MyButton from "../ui/MyButton";
import SocialIcons from "../ui/SocialIcons";

const HeroSection = () => {
  return (
    <div id="about">
      {/* <div className="blur-3xl w-40 h-40 lg:w-96 lg:h-96 bg-blue-500 rounded-full absolute right-72 lg:right-72 opacity-30"></div> */}
      <div className="mt-16 lg:mt-8 flex flex-col-reverse lg:flex-row items-center mx-auto lg:w-2/4 p-8 space-x-0 z-10">
        <div className="text-center lg:text-left lg:w-2/3">
          <h1 className="text-5xl font-bold mb-4">3D Generalist </h1>
          <p className="text-lg: lg:text-xl break-normal  lg:w-2/3">
          With over <b>75 Million views</b> and <b>75,000+ subscribers</b> on my <a className="text-blue-500" target="_blank" href="https://youtube.com/@knightcube">YouTube channel</a>, I have a proven track record of creating visually stunning 3D animations that captivate audiences worldwide. 
          <br/>
          <br/>
          <p>Whether it’s for marketing, gaming, or social media, I deliver animations that make an impact.</p>
          </p>
          <div className="flex flex-row gap-5 mt-5 justify-center lg:justify-start">
            <SocialIcons />
          </div>
          <MyButton
            title="HIRE ME"
            url="https://www.upwork.com/freelancers/~0195aa383095ccc54e?mp_source=share"
          />
        </div>
        <img
          className="w-40 h-40 lg:w-80 lg:h-80 mb-8 lg:scale-x-[-1]"
          src="/images/profile_pic.png"
          alt="Rajat Kumar Gupta"
        />
      </div>
    </div>
  );
};

export default HeroSection;
