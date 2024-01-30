import React from "react";

const MyButton = ({ title, url }: {title:String; url:string}) => {
  return (
    <a href={url}>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-8">
        {title}
      </button>
    </a>
  );
};

export default MyButton;
