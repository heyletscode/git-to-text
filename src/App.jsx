import { useFolderProcessor } from "./hooks/useFolderProcessor";
import Header from "./components/Header";
import FolderUpload from "./components/FolderUpload";
import FileSelectionPanel from "./components/FileSelectionPanel";
import OutputPanel from "./components/OutputPanel";

export default function App() {
  const {
    files,
    fileTypes,
    selectedFileTypes,
    combinedContent,
    isLoading,
    isGenerating,
    error,
    filesToConvert,
    truncatedContent,
    handleFolderSelect,
    handleGenerateFile,
    handleDownload,
    toggleFileType,
  } = useFolderProcessor();

  return (
    <div className="bg-gray-900 text-gray-200 min-h-screen font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <Header />

        <FolderUpload
          isLoading={isLoading}
          handleFolderSelect={handleFolderSelect}
          error={error}
        />

        {files.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <FileSelectionPanel
              fileTypes={fileTypes}
              selectedFileTypes={selectedFileTypes}
              toggleFileType={toggleFileType}
              files={files}
              filesToConvert={filesToConvert}
            />
            <OutputPanel
              isGenerating={isGenerating}
              combinedContent={combinedContent}
              truncatedContent={truncatedContent}
              handleGenerateFile={handleGenerateFile}
              handleDownload={handleDownload}
              filesToConvert={filesToConvert}
            />
          </div>
        )}
      </div>
    </div>
  );
}
