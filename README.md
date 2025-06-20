# Git-to-Text

Git-to-Text is a web application that allows you to upload a Git repository folder, select relevant file types, and export the contents of those files into a single text file. This consolidated file can be used as input for large language models (LLMs) to analyze or learn about the codebase.

## Features

- **Upload Git Repositories:** Easily upload your local Git project folder.
- **File Type Selection:** Choose which file types (e.g., `.js`, `.jsx`, `.py`, etc.) to include in the export.
- **Preview Included Files:** See which files will be included or excluded based on your selection.
- **Export as Text:** Download a single `.txt` file containing the concatenated contents of all selected files.
- **LLM Ready:** The exported file is ideal for feeding into LLMs for code analysis, documentation, or learning.

## Usage

1. **Start the App:**
   - Install dependencies: `npm install`
   - Run the development server: `npm start`
2. **Upload a Folder:**
   - Click the upload area and select your Git project folder.
3. **Select File Types:**
   - Choose which file extensions to include (e.g., `.js`, `.jsx`).
4. **Review Files:**
   - Preview the list of files that will be included or excluded.
5. **Export:**
   - Click the export button to download a single text file with all selected files' content.

## Example Use Cases

- Preparing code for LLM-based code review or documentation generation.
- Summarizing large codebases for onboarding or analysis.
- Creating datasets for machine learning or AI research.

## Tech Stack

- **React** (Vite or Create React App)
- **Tailwind CSS** for styling

## Folder Structure

```
public/
  ...
src/
  components/
    FileSelectionPanel.jsx
    FolderUpload.jsx
    Header.jsx
    OutputPanel.jsx
  hooks/
    useFolderProcessor.js
  lib/
    constants.js
  App.jsx
  index.js
  index.css
```

## Development

1. Clone the repository:
   ```sh
   git clone <repo-url>
   cd git-to-text
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm start
   ```

## License

MIT License
