"use client";
import axios from "axios";
import React, { useState } from "react";

const Questionpaper = () => {
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [uploadStatus, setUploadStatus] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setFileName(selectedFile.name); 
    }
  };

  const handleUpload = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setUploadStatus(""); 

    if (!file) {
      return alert("Please upload a file.");
    }

    const formData = new FormData();
    formData.append("qp", file);

    try {
      const response = await axios.post("http://localhost:8000/upload-qp", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });
      setUploadStatus(`Upload successful! Status: ${response.status}`);
    } catch (error) {
      console.error(error);
      setUploadStatus("Error in uploading the file.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gray-100 rounded-lg shadow-md">
      <h1 className="mb-4 text-xl font-bold">Upload Question Paper</h1>
      <form className="w-full max-w-md space-y-4">
        <input
          type="text"
          placeholder="Give a name for your QP"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
        />
        <div>
          <input
            type="file"
            onChange={handleChange}
            accept=".pdf"
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-l border border-gray-300 cursor-pointer file:font-medium hover:file:bg-gray-200"
          />
          {fileName && <p className="mt-2 text-sm text-gray-600">Selected file: {fileName}</p>}
        </div>
        <button
          type="button"
          onClick={handleUpload}
          className="w-full p-2 text-white bg-blue-600 rounded hover:bg-blue-700 transition duration-200"
        >
          Upload
        </button>
      </form>
      {uploadStatus && <p className="mt-4 text-sm text-red-500">{uploadStatus}</p>}
    </div>
  );
};

export default Questionpaper;
