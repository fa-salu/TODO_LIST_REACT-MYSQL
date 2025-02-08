import { useState } from "react";
import Sidebar from "./Sidebar";
import TodoList from "./TodoList";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";

export default function Todo() {
  const [selectedFolder, setSelectedFolder] = useState({ name: "", id: "" });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <>
      <div className="h-screen flex">
        <div className="md:hidden absolute top-4 left-4">
          <IconButton onClick={toggleSidebar}>
            <MenuIcon />
          </IconButton>
        </div>
        <div
          className={`fixed inset-y-0 left-0 z-50 bg-white shadow-lg transform transition-transform duration-300 md:relative md:translate-x-0 md:flex ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          onClick={toggleSidebar}
        >
          <Sidebar
            onSelectFolder={(name, id) => setSelectedFolder({ name, id })}
          />
        </div>
        <div className="flex-1" onClick={() => setIsSidebarOpen(false)}>
          <TodoList folderDetails={selectedFolder} />
        </div>
      </div>
    </>
  );
}
