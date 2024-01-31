import projectsData from "../data/projectsData";
import ProjectCard from "../ui/ProjectCard";

const Projects = () => {
  return (
    <section id="projects">
      <div className="mx-auto mt-12 px-2 md:px-72">
        <h1 className="text-4xl md:text-5xl font-bold text-center md:text-left">
          Projects
        </h1>
        <div className="grid md:grid-cols-3 mt-5 md:mt-5 md:-ml-5 gap-4">
          {projectsData.map((item, index) => {
            return (
              item.type === "project" && (
                <ProjectCard
                  key={index}
                  title={item.title}
                  media={item.media}
                  description={item.description}
                  demoURL={item.demoURL}
                  codeURL={item.codeURL}
                  articleURL={item.articleURL}
                  type={item.type}
                />
              )
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
