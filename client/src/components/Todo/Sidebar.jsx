import { useState } from "react";

export default function Sidebar({ onSelectFolder }) {
  const [folders, setFolders] = useState(["Today"]);

  const addFolder = () => {
    const newFolder = prompt("Enter folder name:");
    if (newFolder) {
      setFolders([...folders, newFolder]);
    }
  };

  return (
    <div className="w-64 bg-[#202124] text-white h-screen p-4">
      <h2 className="text-2xl font-bold mb-4">Todo</h2>
      <ul>
        {folders.map((folder, index) => (
          <li
            key={index}
            className="cursor-pointer p-2 hover:bg-gray-700 rounded"
            onClick={() => onSelectFolder(folder)}
          >
            {folder}
          </li>
        ))}
      </ul>
      <button
        className="w-full mt-4 bg-[#13155A] text-white py-2 rounded hover:bg-[#21223b]"
        onClick={addFolder}
      >
        Create Folder
      </button>
    </div>
  );
}
