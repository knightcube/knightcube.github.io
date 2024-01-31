import { Code, Github, Linkedin, Mail, Youtube } from "lucide-react";


const SocialIcons = () => {
  return (
    <>
      <a href="https://linkedin.com/in/knightcube">
        <Linkedin />
      </a>
      <a href="https://github.com/knightcube">
        <Github />
      </a>
      <a href="https://youtube.com/@knightcube">
        <Youtube />
      </a>
      <a href="https://leetcode.com/knightcube">
       <Code/>
      </a>
      <a href="mailto:rajatcube@gmail.com">
        <Mail />
      </a>
    </>
  );
};

export default SocialIcons;
