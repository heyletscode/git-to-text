const FileSelectionPanel = ({
  fileTypes,
  selectedFileTypes,
  toggleFileType,
  files,
  filesToConvert,
}) => {
  return (
    <div className="space-y-6 bg-gray-800/50 p-6 rounded-lg">
      <div>
        <h2 className="text-xl font-semibold mb-3 text-white">
          1. Select File Types
        </h2>
        <div className="flex flex-wrap gap-2">
          {fileTypes.map((type) => (
            <button
              key={type}
              onClick={() => toggleFileType(type)}
              className={`px-3 py-1 text-sm font-medium rounded-full transition-colors ${
                selectedFileTypes.has(type)
                  ? "bg-cyan-500 text-white"
                  : "bg-gray-700 hover:bg-gray-600 text-gray-300"
              }`}
            >
              .{type}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-3 text-white">
          2. Files to Include ({filesToConvert.length})
        </h2>
        <div className="bg-gray-900 rounded-md p-3 h-96 overflow-y-auto border border-gray-700">
          <ul className="text-sm space-y-1">
            {files.map((file) => {
              const parts = file.path.split(".");
              const extension = parts.length > 1 ? parts.pop() : "no-extension";
              const isSelected = selectedFileTypes.has(extension);
              return (
                <li
                  key={file.path}
                  className={`whitespace-nowrap overflow-hidden text-ellipsis transition-colors duration-200 ${
                    isSelected ? "text-gray-300" : "text-gray-500 line-through"
                  }`}
                >
                  {file.path}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FileSelectionPanel;
