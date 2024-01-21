import React from "react";

interface ViewJobProps {
  viewJob: any;
  handleBack: any;
}

export const ViewJob: React.FC<ViewJobProps> = ({ viewJob, handleBack }) => {
  const paragraphs = viewJob.description
    .split("\n")
    .map((paragraph: string, index: number) => (
      <p key={index} className="mb-4 flex">
        {paragraph}
      </p>
    ));

  return (
    <div className="h-[100%] py-4 px-4">
      <div className="h-[90%] overflow-y-auto">{paragraphs}</div>

      <div className="flex justify-between">
        <button
        onClick={handleBack}
          type="submit"
          className=" px-4 my-4 border border-[#009FBD] text-black text-xs font-bold p-2 rounded-md  hover:bg-opacity-75"
        >
          Back
        </button>
        <a href={viewJob.url}>
        <button
          type="submit"
          className=" my-4 bg-[#009FBD] text-white text-xs font-bold p-2 rounded-md  hover:bg-opacity-75"
        >
          Post Job
        </button>
        </a>
       
      </div>
    </div>
  );
};
