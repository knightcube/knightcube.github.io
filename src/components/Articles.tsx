import projectsData from "../data/projectsData";
import ProjectCard from "../ui/ProjectCard";

const Articles = () => {
  return (
    <section id="articles">
      <div className="mx-auto mt-12 px-2 md:px-72 mb-52">
        <h1 className="text-4xl md:text-5xl font-bold text-center md:text-left">
          Articles
        </h1>
        <p className="text-lg mt-5">
          I have published articles in renowned technical publications like{" "}
          <a
            className="text-blue-500"
            href="https://hackernoon.com/u/knightcube"
            target="_blank"
          >
            HackerNoon
          </a>{" "}
          and{" "}
          <a
            className="text-blue-500"
            href="https://blog.logrocket.com/author/rajatgupta/"
            target="_blank"
          >
            LogRocket.
          </a>
        </p>
        <div className="grid md:grid-cols-3 mt-5 md:mt-5 md:-ml-5 gap-4">
          {projectsData.map((item, index) => {
            return (
              item.type === "article" && (
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

export default Articles;
