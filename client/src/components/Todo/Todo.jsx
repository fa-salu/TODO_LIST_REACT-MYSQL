import { useState } from "react";
import Sidebar from "./Sidebar";
import TodoList from "./TodoList";
import Navbar from "../Navbar/Navbar";

export default function Todo() {
  const [selectedFolder, setSelectedFolder] = useState({ name: "", id: "" });
  console.log("nnnn", selectedFolder);

  return (
    <>
      <Navbar />
      <div className="h-screen flex">
        <Sidebar
          onSelectFolder={(name, id) => setSelectedFolder({ name, id })}
        />
        <div className="flex-1">
          <TodoList folderDetails={selectedFolder} />
        </div>
      </div>
    </>
  );
}
