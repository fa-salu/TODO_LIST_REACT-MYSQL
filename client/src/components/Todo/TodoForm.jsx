import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const TodoForm = ({ folderId }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");

  const queryClient = useQueryClient();

  const mutation = useMutation((newTask) => axios.post("/api/tasks", newTask), {
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks", folderId]);
      setTitle("");
      setDescription("");
      setDeadline("");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ title, description, deadline, folderId });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="p-2 border rounded"
        required
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="p-2 border rounded ml-2"
        required
      />
      <input
        type="datetime-local"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
        className="p-2 border rounded ml-2"
        required
      />
      <button type="submit" className="p-2 bg-blue-500 text-white rounded ml-2">
        Add Task
      </button>
    </form>
  );
};

export default TodoForm;
