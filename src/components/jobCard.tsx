import { useDashboard } from "../context/DashboardContext";
import { useState, useEffect } from "react";
import { ViewJob } from "./VewJob";

export const JobCard = () => {
  const { jobData } = useDashboard();
  const [viewJob, setViewJob] = useState();
  const [isViewJob, setIsViewJob] = useState(false);

  const HandleView = (jobId: number) => {
    setIsViewJob(true);
    setViewJob((prevViewJob) => {
      const openedJob = jobData.find((job) => job.id === jobId);
      console.log(openedJob);
      return openedJob;
    });
  };
  const handleBack = () => {
    setIsViewJob(false)
  }
let data;
  useEffect(() => {
    if (viewJob) {
      data = viewJob
console.log(data,"lloo")
    }
  }, [viewJob]);

  return (
    <div className="w-1/3 h-[80vh] bg-gray-100 z-10 rounded-md py-4 overflow-y-scroll">
      <div className=" w-full px-4 ">
        <input type="text" placeholder="Search" className="w-full px-2" />
      </div>
      {isViewJob ? (
        viewJob && <ViewJob viewJob={viewJob} handleBack={handleBack}/>
      ) : (
        <div className="flex flex-col px-4">
          {jobData.map((jobs: any) => (
            <div
              className="flex gap-4  border-b border-grey-700  items-center py-4 "
              key={jobs.id}
            >
              <div className="">
                {!jobs.image_url ? (
                  <img
                    src="../../public/Image.jpeg"
                    width="60px"
                    className="rounded-lg"
                    alt=""
                  />
                ) : (
                  <img
                    src={jobs.image_url}
                    width="60px"
                    className="rounded-lg"
                    alt=""
                  />
                )}
              </div>
              <div className="flex flex-col items-start justify-start overflow-x-hidden w-40 cursor-pointer">
                <p
                  onClick={() => HandleView(jobs.id)}
                  className="text-xs font-bold truncate"
                >
                  {jobs.title}
                </p>
                <h4
                  onClick={() => HandleView(jobs.id)}
                  className="text-sm font-extrabold truncate text-black"
                >
                  {jobs.company}
                </h4>
                <div className="flex gap-2">
                  {/* Additional content goes here */}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
