import { useState } from "react";
import Sidebar from "./Sidebar";
import TodoList from "./TodoList";
import Navbar from "../Navbar/Navbar";

export default function Todo() {
  const [selectedFolder, setSelectedFolder] = useState("Today");

  return (
    <>
      <Navbar />
      <div className="h-screen flex">
        <Sidebar onSelectFolder={setSelectedFolder} />
        <div className="flex-1">
          <TodoList folder={selectedFolder} />
        </div>
      </div>
    </>
  );
}
