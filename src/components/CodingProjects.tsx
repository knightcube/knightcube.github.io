import projectsData from "../data/projectsData";
import ProjectCard from "../ui/ProjectCard";

const Projects = () => {
  return (
    <section id="projects">
      <div className="mx-auto mt-12 px-2 lg:px-72">
        <h1 className="text-4xl lg:text-5xl font-bold text-center lg:text-left">
          Coding Projects
        </h1>
        <p className="text-xl mt-4"> I don't enjoy coding stuff as much as I used to.</p>
        <div className="grid lg:grid-cols-3 mt-5 lg:mt-5 lg:-ml-5 gap-4">
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
                  skillTags={item.skillTags}
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
