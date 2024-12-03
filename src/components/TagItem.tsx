import React from "react";

const TagItem = ({tagTitle}:{tagTitle:String;}) => {
  return (
    <div className="shadow-md text-sm  bg-black  rounded-lg: px-2 py-1 text-white">
      {tagTitle}
    </div>
  );
};

export default TagItem;
