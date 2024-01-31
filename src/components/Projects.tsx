import netflixDemo from "../../public/images/netflix-demo.gif";
import githubFinderDemo from "../../public/images/github-finder-demo.gif";
import arvrDemo from "../../public/images/augmented-reality-projects.jpg";
import blenderProjectsDemo from "../../public/images/3d-modelling-projects.jpg";
import MyButton from "../ui/MyButton";

const projectsData = [
  {
    title: "OTT Wars",
    description: "A web app (ongoing project) to pick your favourite movie and test your knowledge by answering questions.",
    media: netflixDemo,
    demoURL: "https://netflix-clone-knightcube.vercel.app/",
    codeURL: "https://github.com/knightcube/netflix-clone",
  },
  {
    title: "GitHub Finder",
    description: "An app integrated with GitHub API to search users.",
    media: githubFinderDemo,
    demoURL: "https://github-finder-demo-ten.vercel.app/",
    codeURL: "https://github.com/knightcube/github-finder-demo",
  },
  {
    title: "AR/VR Projects Compilation",
    description: "A video compilation of AR/VR Projects and prototypes that I have worked on till date.",
    media: arvrDemo,
    demoURL: "https://www.youtube.com/watch?v=PsxLB0YMSO4",
    codeURL: "",
  },
  {
    title: "3D Modelling Projects Reel",
    description: "A video compilation of 3D Models and animations that I designed with Blender.",
    media: blenderProjectsDemo,
    demoURL: "https://www.youtube.com/watch?v=KhCo_P5UaMo",
    codeURL: "",
  },
];

const ProjectCard = ({
  title,
  media,
  description,
  demoURL,
  codeURL,
}: {
  title: String;
  media: string;
  description: String;
  demoURL: string;
  codeURL: string;
}) => {
  return (
    <div className="text-center rounded-md pb-5 bg-slate-200">
      <div className="">
        <img className="p-1 rounded-md" src={media} alt="Demo Video" />
      </div>
      <h1 className="text-xl mt-4">{title}</h1>
      <p className="text-sm text-gray-500 mt-2 px-5">{description}</p>
      <div className="flex gap-2 items-center justify-center">
        <MyButton title="Demo" url={demoURL} />
        {codeURL && <MyButton title="Code" url={codeURL} />}
      </div>
    </div>
  );
};

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
              <ProjectCard
                key={index}
                title={item.title}
                media={item.media}
                description={item.description}
                demoURL={item.demoURL}
                codeURL={item.codeURL}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
