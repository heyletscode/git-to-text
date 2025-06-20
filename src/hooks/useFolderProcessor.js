import { useState, useCallback, useMemo } from "react";
import { CODING_FILE_EXTENSIONS, PREVIEW_CHAR_LIMIT } from "../lib/constants";

export function useFolderProcessor() {
  const [folderName, setFolderName] = useState("");
  const [files, setFiles] = useState([]);
  const [fileTypes, setFileTypes] = useState([]);
  const [selectedFileTypes, setSelectedFileTypes] = useState(new Set());
  const [combinedContent, setCombinedContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState("");

  const handleFolderSelect = useCallback(async (event) => {
    setIsLoading(true);
    setError("");
    setFiles([]);
    setFileTypes([]);
    setSelectedFileTypes(new Set());
    setCombinedContent("");
    setFolderName("");

    const uploadedFiles = event.target.files;
    if (!uploadedFiles || uploadedFiles.length === 0) {
      setIsLoading(false);
      return;
    }

    if (uploadedFiles[0].webkitRelativePath) {
      setFolderName(uploadedFiles[0].webkitRelativePath.split("/")[0]);
    }

    const fileReadPromises = Array.from(uploadedFiles).map((file) => {
      return new Promise((resolve) => {
        if (file.size === 0) {
          resolve(null);
          return;
        }
        const reader = new FileReader();
        reader.onload = (e) => resolve({ path: file.webkitRelativePath, content: e.target.result });
        reader.onerror = (err) => {
          console.error("Error reading file:", file.name, err);
          resolve(null);
        };
        reader.readAsText(file);
      });
    });

    try {
      const allFiles = await Promise.all(fileReadPromises);
      const validFiles = allFiles.filter((f) => f !== null);
      setFiles(validFiles);

      const extensions = new Set(
        validFiles.map((file) => {
          const parts = file.path.split(".");
          return parts.length > 1 ? parts.pop() : "no-extension";
        }).filter(Boolean)
      );

      const sortedExtensions = Array.from(extensions).sort();
      setFileTypes(sortedExtensions);

      const initiallySelected = sortedExtensions.filter((ext) => CODING_FILE_EXTENSIONS.has(ext));
      setSelectedFileTypes(new Set(initiallySelected));
    } catch (err) {
      setError("There was a critical error reading the folder contents.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const filesToConvert = useMemo(() => {
    return files.filter((file) => {
      const parts = file.path.split(".");
      const extension = parts.length > 1 ? parts.pop() : "no-extension";
      return selectedFileTypes.has(extension);
    });
  }, [files, selectedFileTypes]);

  const handleGenerateFile = useCallback(() => {
    if (filesToConvert.length === 0) {
      setError("No files selected to generate. Please select file types.");
      return;
    }

    setIsGenerating(true);
    setError("");

    try {
      const contents = filesToConvert.map((file) => {
        return `// START: ${file.path}\n\n${file.content}\n\n// END: ${file.path}`;
      });
      setCombinedContent(contents.join("\n\n---\n\n"));
    } catch (err) {
      console.error(err);
      setError(err.message || "An error occurred while generating the file.");
    } finally {
      setIsGenerating(false);
    }
  }, [filesToConvert]);

  const handleDownload = useCallback(() => {
    if (!combinedContent) return;
    const fileName = `${folderName || "local-folder"}-export.txt`;
    const blob = new Blob([combinedContent], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [combinedContent, folderName]);

  const toggleFileType = useCallback((fileType) => {
    setSelectedFileTypes(prevSelection => {
        const newSelection = new Set(prevSelection);
        if (newSelection.has(fileType)) {
            newSelection.delete(fileType);
        } else {
            newSelection.add(fileType);
        }
        return newSelection;
    });
  }, []);

  const truncatedContent = useMemo(() => {
    if (combinedContent.length > PREVIEW_CHAR_LIMIT) {
      return `${combinedContent.substring(0, PREVIEW_CHAR_LIMIT)}...\n\n--- CONTENT TRUNCATED FOR PREVIEW (FULL CONTENT IN DOWNLOAD) ---`;
    }
    return combinedContent;
  }, [combinedContent]);

  return {
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
  };
}