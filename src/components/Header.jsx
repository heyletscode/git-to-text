import { FiFolder } from "react-icons/fi";

const Header = () => {
  return (
    <header className="flex items-center justify-between mb-8 border-b border-gray-700 pb-4">
      <div className="flex items-center space-x-3">
        <FiFolder className="w-8 h-8 text-cyan-400" />
        <h1 className="text-2xl sm:text-3xl font-bold text-white">
          Local Folder to Text
        </h1>
      </div>
    </header>
  );
};

export default Header;
