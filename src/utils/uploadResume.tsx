import React, { useState } from 'react';

interface ResumeUploaderProps {}

export const ResumeUploader: React.FC<ResumeUploaderProps> = () => {
  const [resume, setResume] = useState<any>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const fileType = file.type;

      if (fileType === 'application/pdf' || fileType === 'application/msword' || fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        const reader = new FileReader();

        reader.onload = (e) => {
          try {
            const resumeData = JSON.parse(e.target?.result as string);
            setResume(resumeData);
            console.log('Resume Data:', resumeData);
          } catch (error) {
            console.error('Error parsing resume JSON:', error);
          }
        };

        reader.readAsText(file);
      } else {
        console.error('Invalid file type. Please upload a PDF or Word document.');
      }
    }
  };

  const handleSubmit = () => {
    if (resume) {
      // Save the extracted data to local storage
      localStorage.setItem('resumeData', JSON.stringify(resume));
      console.log('Data saved to local storage:', resume);
    } else {
      console.error('No resume data to submit.');
    }
  };

  return (
    <div className="flex flex-col items-center px-4 h-[10vh] bg-gray-100 rounded-md pt-4">
      <div>
        <input type="file" onChange={handleFileChange} accept=".pdf, .doc, .docx" />
      </div>
      {/* {resume && ( */}
        <div>
          <h2>Resume Content:</h2>
          <pre>{JSON.stringify(resume, null, 2)}</pre>
          <button onClick={handleSubmit} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md">
            Submit
          </button>
        </div>
      {/* )} */}
    </div>
  );
};
