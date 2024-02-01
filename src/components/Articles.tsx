import projectsData from "../data/projectsData";
import ProjectCard from "../ui/ProjectCard";

const Articles = () => {
  return (
    <section id="articles">
      <div className="mx-auto mt-28 px-2 lg:px-72 mb-52">
        <h1 className="text-4xl lg:text-5xl font-bold text-center lg:text-left">
          Articles
        </h1>
        <p className="text-lg: mt-5 text-center lg:text-left">
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
            LogRocket
          </a>
          . I also write articles on{" "}
          <a
            className="text-blue-500"
            href="https://medium.com/@knightcube"
            target="_blank"
          >
            Medium
          </a>{" "}
          sometimes.
        </p>
        <div className="grid lg:grid-cols-3 mt-5 lg:mt-5 lg:-ml-5 gap-4">
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
