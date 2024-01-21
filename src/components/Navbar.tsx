import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDashboard } from "../context/DashboardContext";
import { ResumeUploader } from "../utils/uploadResume";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { uploadJob, isUpload, uploadResume } = useDashboard();

  return (
    <nav className="flex items-center justify-between  w-full">
      <Link to="/">
        <img src={""} className=" md:h-[7.41vh] h-[3.79vh]  " />
      </Link>

      <div className="flex items-end gap-4 ">
        <div className="flex items-center gap-4 text-white">
          <button className="w-[8.5vw] h-[3.3vh] text-base rounded-[7px] font-bold  ">
            Upload Resume
          </button>
         
          <button
            onClick={uploadJob}
            className="bg-[#009FBD] font-bold w-[21.79vw] md:w-[10.42vw] h-[3.01vh] md:h-[4.72vh] md:rounded-[0.53rem] rounded-[0.22rem] md:text-sm  text-xs hover:bg-opacity-75 "
          >
            {isUpload ? "View Jobs" : "Post Job"}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
