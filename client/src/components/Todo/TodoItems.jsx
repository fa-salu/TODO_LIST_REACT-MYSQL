import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const TodoItem = ({ task }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation(() => axios.delete(`/api/tasks/${task.id}`), {
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks", task.folder_id]);
    },
  });

  const handleDelete = () => {
    mutation.mutate();
  };

  return (
    <div className="flex justify-between items-center p-2 border-b">
      <div>
        <h3 className="font-bold">{task.title}</h3>
        <p>{task.description}</p>
        <p className="text-sm text-gray-500">
          Deadline: {new Date(task.deadline).toLocaleString()}
        </p>
      </div>
      <button
        onClick={handleDelete}
        className="p-2 bg-red-500 text-white rounded"
      >
        Delete
      </button>
    </div>
  );
};

export default TodoItem;
