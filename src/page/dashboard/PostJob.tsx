import React, { useState } from "react";

export const PostJob = () => {
  const [formData, setFormData] = useState({
    company: "",
    title: "",
    description: "",
    location_iso: "",
    address: "", 
    job_type: "",
    technologies: '',
    min_salary_usd: null,
    max_salary_usd: null,
    degree_required: false,
    image_url: "",
    url: "",
  });

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    // Now you can use formData to make a POST request to your API endpoint
    // Example: axios.post('your_api_endpoint', formData);
  };

  return (
    <div className="w-1/3 h-[80vh] bg-gray-100 z-10 rounded-md py-4 overflow-y-scroll px-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span className="text-gray-700">Company:</span>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="mt-1 p-2 border rounded-md w-full"
            required
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Title:</span>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="mt-1 p-2 border rounded-md w-full"
            required
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Address:</span>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="mt-1 p-2 border rounded-md w-full"
            required
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Job Type:</span>
          <input
            type="text"
            name="job_type"
            value={formData.job_type}
            onChange={handleChange}
            className="mt-1 p-2 border rounded-md w-full"
            required
          />
        </label>
        <label className="block">
          <span className="text-gray-700">image_url:</span>
          <input
            type="text"
            name="image_url"
            value={formData.image_url}
            onChange={handleChange}
            className="mt-1 p-2 border rounded-md w-full"
            required
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Description:</span>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 p-2 border rounded-md w-full"
            required
          />
        </label>
        {/* Add other input fields as needed */}
        <button
          type="submit"
          className="bg-[#009FBD] text-white text-xs font-bold p-2 rounded-md  hover:bg-opacity-75"
        >
          Post Job
        </button>
      </form>
    </div>
  );
};
