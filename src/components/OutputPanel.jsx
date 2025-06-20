import { FiDownload, FiLoader } from "react-icons/fi";

const OutputPanel = ({
  isGenerating,
  combinedContent,
  truncatedContent,
  handleGenerateFile,
  handleDownload,
  filesToConvert,
}) => {
  return (
    <div className="space-y-6 bg-gray-800/50 p-6 rounded-lg">
      <h2 className="text-xl font-semibold text-white">
        3. Generate & Download
      </h2>
      <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
        <button
          onClick={handleGenerateFile}
          disabled={isGenerating || filesToConvert.length === 0}
          className="flex-1 flex items-center justify-center px-6 py-2.5 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
        >
          {isGenerating && <FiLoader className="animate-spin w-5 h-5 mr-2" />}
          {isGenerating ? "Generating..." : "Generate Text File"}
        </button>
        <button
          onClick={handleDownload}
          disabled={!combinedContent || isGenerating}
          className="flex-1 flex items-center justify-center px-6 py-2.5 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
        >
          <FiDownload className="w-5 h-5 mr-2" />
          Download
        </button>
      </div>

      <textarea
        readOnly
        value={truncatedContent}
        placeholder="Generated content will appear here..."
        className="w-full h-96 bg-gray-900 border border-gray-700 rounded-md p-4 font-mono text-xs focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
      />
    </div>
  );
};

export default OutputPanel;
