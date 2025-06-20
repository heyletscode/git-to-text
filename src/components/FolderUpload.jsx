import React from "react";
import { FiUploadCloud, FiLoader, FiAlertCircle } from "react-icons/fi";

const FolderUpload = ({ isLoading, handleFolderSelect, error }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8 text-center">
      <h2 className="text-xl font-semibold mb-4 text-white">
        Upload a Project Folder from Your Computer
      </h2>
      <input
        type="file"
        id="folder-upload"
        webkitdirectory=""
        directory=""
        multiple
        onChange={handleFolderSelect}
        className="hidden"
      />
      <label
        htmlFor="folder-upload"
        className={`inline-flex items-center justify-center px-8 py-3 bg-cyan-600 text-white font-semibold rounded-md hover:bg-cyan-700 transition-colors duration-200 ${
          isLoading ? "cursor-wait bg-gray-600" : "cursor-pointer"
        }`}
      >
        {isLoading ? (
          <>
            <FiLoader className="animate-spin w-5 h-5 mr-3" />
            Loading Files...
          </>
        ) : (
          <>
            <FiUploadCloud className="w-5 h-5 mr-3" />
            Select Folder
          </>
        )}
      </label>
      {error && (
        <div className="mt-4 flex items-center text-red-400 bg-red-900/20 p-3 rounded-md text-left">
          <FiAlertCircle className="w-5 h-5 mr-2 shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default FolderUpload;
