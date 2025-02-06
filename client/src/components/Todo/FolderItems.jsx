import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";

const FolderItem = ({ folder }) => {
  const { data: tasks, isLoading } = useQuery(["tasks", folder.id], () =>
    axios.get(`/api/tasks/${folder.id}`).then((res) => res.data)
  );

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold mb-2">{folder.name}</h2>
      <TodoForm folderId={folder.id} />
      {tasks.map((task) => (
        <TodoItem key={task.id} task={task} />
      ))}
    </div>
  );
};

export default FolderItem;
