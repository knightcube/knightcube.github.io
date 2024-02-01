import MyButton from "../ui/MyButton";

const ProjectCard = ({
  title,
  media,
  description,
  demoURL,
  codeURL,
  articleURL,
  type,
}: {
  title: String;
  media: string;
  description: String;
  demoURL: string;
  codeURL: string;
  articleURL: string;
  type: string;
}) => {
  return (
    <div className="flex flex-col text-center items-center rounded-md pb-5 bg-slate-200">
      {media && (
        <div>
          <img className="w-full p-1 rounded-md" src={media} alt="Demo Video" />
        </div>
      )}
      <h1 className="text-xl mt-4 px-5">{title}</h1>
      <p className="text-sm text-gray-500 mt-2 px-5">{description}</p>
      <div className="flex gap-2 items-center justify-center mt-auto">
        {demoURL && <MyButton title="Demo" url={demoURL} />}
        {codeURL && <MyButton title="Code" url={codeURL} />}
        {articleURL && <MyButton title="Read More" url={articleURL} />}
      </div>
    </div>
  );
};

export default ProjectCard;
