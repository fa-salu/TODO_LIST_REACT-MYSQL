import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import FolderItem from "./components/FolderItem";
import { useFolders } from "./hooks/useTodos";

export default function Todo() {
  const { data: folders, isLoading } = useFolders();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
      {folders.map((folder) => (
        <FolderItem key={folder.id} folder={folder} />
      ))}
    </div>
  );
}
