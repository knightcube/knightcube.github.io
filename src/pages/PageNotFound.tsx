import React from "react";
import MyButton from "../ui/MyButton";
import Header from "../components/Header";

const PageNotFound = () => {
  return (
    <div className="h-screen">
      <Header />
      <div className="flex flex-col items-center justify-center h-2/3">
        <p className="text-9xl mb-20">¯\_(ツ)_/¯</p>
        <h1 className="text-4xl">404 | Error Not Found</h1>
      </div>
    </div>
  );
};

export default PageNotFound;
