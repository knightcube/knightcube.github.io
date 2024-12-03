import { Briefcase, Code, Github, Linkedin, Mail, Youtube } from "lucide-react";


const SocialIcons = () => {
  return (
    <>
      <a href="https://www.upwork.com/freelancers/~0195aa383095ccc54e?mp_source=share" target="_blank">
        <Briefcase />
      </a>
      <a href="https://linkedin.com/in/knightcube" target="_blank">
        <Linkedin />
      </a>
      <a href="https://youtube.com/@knightcube" target="_blank">
        <Youtube />
      </a>
      <a href="https://github.com/knightcube" target="_blank">
        <Github />
      </a>
     
      <a href="https://leetcode.com/knightcube" target="_blank">
        <Code />
      </a>
      <a href="mailto:knightcube96@gmail.com" target="_blank">
        <Mail />
      </a>

    </>
  );
};

export default SocialIcons;
