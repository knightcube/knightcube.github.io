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
    ],
  },
  {
    skillName: "Frontend",
    skillTags: [
      "React.js",
      "Tailwind",
      "Daisy UI",
      "Material UI",
      "React Router",
      "Redux",
      "Jest",
      "Playwright",
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
    skillTags: ["Sonarqube", "Git", "CI/CD", "Jenkins", "Docker", "Kubernetes"],
  },
  {
    skillName: "3D & AR/VR",
    skillTags: [
      "Unity",
      "Blender",
      "React Three Fiber",
      "Three.js",
      "WebXR",
      "GLSL",
      "ARCore",
      "Vuforia",
      "XRTK",
      "ARFoundation",
    ],
  },
];

const SkillBoxes = ({ title, tags }: { title: String; tags: String[] }) => {
  return (
    <div className="rounded-md md:min-w-52 md:min-h-80 m-2 p-4 bg-gradient-to-r from-sky-300 to-blue-400 hover:from-yellow-500 hover:to-pink-500">
      <h1 className="text-md text-black text tracking-wide font-semibold">
        {title}
      </h1>
      <div className="flex flex-wrap gap-2 mt-5">
        {tags.map((tagItem, index) => {
          return (
            <div
              key={index}
              className="shadow-md text-sm  bg-black  rounded-lg px-2 py-1 text-white"
            >
              {tagItem}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Skills = () => {
  return (
    <section id="skills">
      <div className="mx-auto mt-28 md:px-72  mb-52">
        <h1 className="text-4xl md:text-5xl font-bold text-center md:text-left">
          Skills
        </h1>

        <div className="grid md:grid-cols-3 mt-5 md:mt-5 md:-ml-5">
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
