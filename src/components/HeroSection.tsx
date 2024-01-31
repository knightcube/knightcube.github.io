import MyButton from "../ui/MyButton";
import SocialIcons from "../ui/SocialIcons";

const HeroSection = () => {
  return (
    <div id="about">
      <div className="blur-3xl w-40 h-40 md:w-96 md:h-96 bg-blue-500 rounded-full absolute right-72 md:right-72 opacity-30"></div>
      <div className="mt-16 md:mt-8 flex flex-col-reverse md:flex-row items-center mx-auto md:w-2/4 p-8 space-x-0 z-10">
        <div className="text-center md:text-left md:w-2/3">
          <h1 className="text-5xl font-bold mb-4">Hi, I am Rajat.</h1>
          <p className="text-lg md:text-xl break-normal  md:w-2/3">
            I am a full stack developer having extensive experience with{" "}
            <b>React</b> and
            <b> Spring Boot</b>. Reach out to me if you'd like to know more!
          </p>
          <div className="flex flex-row gap-5 mt-5 justify-center md:justify-start">
            <SocialIcons />
          </div>
          <MyButton title="Connect With Me" url="https://linkedin.com/in/knightcube"/>
        </div>
        <img
          className="w-40 h-40 md:w-80 md:h-80 mb-8 md:scale-x-[-1]"
          src="/images/profile_pic.png"
          alt="Rajat Kumar Gupta"
        />
      </div>
    </div>
  );
};

export default HeroSection;
