import TagItem from "./TagItem";

const SkillBoxes = ({ title, tags }: { title: String; tags: String[] }) => {
    return (
      <div className="rounded-md lg:min-w-52 lg:min-h-80 m-2 p-4 bg-gradient-to-r from-sky-300 to-blue-400 hover:from-yellow-500 hover:to-pink-500">
        <h1 className="text-md text-black text tracking-wide font-semibold">
          {title}
        </h1>
        <div className="flex flex-wrap gap-2 mt-5">
          {tags.map((tagItem, index) => {
            return (
              <TagItem key={index} tagTitle={tagItem}/>
            );
          })}
        </div>
      </div>
    );
  };

  export default SkillBoxes