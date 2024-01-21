import { BaseMap } from "../../utils/BaseMap";
import Navbar from "../../components/Navbar";
import { JobCard } from "../../components/jobCard";
import { PostJob } from "../dashboard/PostJob";
import { useDashboard } from "../../context/DashboardContext";
import { ResumeUploader } from "../../utils/uploadResume";

export function Map() {
  const { isUpload, isResumeUploader } = useDashboard();
  return (
    <div className="bg-opacity-70 bg-black w-full h-[100vh] px-[4.17vw] py-[3.52vh] flex flex-col justify-center gap-4 ">
      <div className="flex">
        <Navbar />
      </div>

      <div className="flex text-center gap-4 z-0">
        <BaseMap />
        {isResumeUploader ? (
          <ResumeUploader />
        ) : isUpload ? (
          <PostJob />
        ) : (
          <JobCard />
        )}
      </div>
    </div>
  );
}