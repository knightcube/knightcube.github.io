import SkillBoxes from "./SkillBoxes";

const skillItems = [
  {
    skillName: "Programming",
    skillTags: [
      "Java",
      "JavaScript",
      "TypeScript",
      "HTML",
      "CSS",
      "Data Structures",
      "Algorithms",
      "LLD",
      "HLD"
    ],
  },
  {
    skillName: "Frontend",
    skillTags: [
      "React.js",
      "Tailwind",
      "Daisy UI",
      "React Router",
      "Redux",
      "Jest",
      "REST API Integration",
    ],
  },
  {
    skillName: "Backend",
    skillTags: [
      "Node.js",
      "Express.js",
      "Spring Boot",
      "JPA",
      "Hibernate",
      "JUnit",
      "Maven",
      "REST API",
    ],
  },
  {
    skillName: "DBMS",
    skillTags: ["SQL", "MySQL", "Firebase"],
  },
  {
    skillName: "DevOps",
    skillTags: ["Sonarqube", "Git", "CI/CD", "Docker"],
  },
  {
    skillName: "3D & AR/VR",
    skillTags: [
      "Unity",
      "Blender",
      "React Three Fiber",
      "Three.js",
      "WebXR",
      "ARCore",
      "Vuforia",
      "XRTK",
      "ARFoundation",
    ],
  },
];



const Skills = () => {
  return (
    <section id="skills">
      <div className="mx-auto mt-28 lg:px-72">
        <h1 className="text-4xl lg:text-5xl font-bold text-center lg:text-left">
          Skills
        </h1>

        <div className="grid lg:grid-cols-3 mt-5 lg:mt-5 lg:-ml-5">
          {skillItems.map((item, index) => {
            return (
              <SkillBoxes
                key={index}
                title={item.skillName}
                tags={item.skillTags}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
