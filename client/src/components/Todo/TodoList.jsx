import { useState } from "react";
import AddTodo from "./AddTodo";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { addTask, fetchTasks, removeTask } from "../../api/TaskApi";
import AddIcon from "@mui/icons-material/Add";
import { CircularProgress } from "@mui/material";

export default function TodoList({ folderDetails }) {
  const folderId = folderDetails?.id;
  const folder = folderDetails?.name;
  const [openDialog, setOpenDialog] = useState(false);

  const {
    data: todos,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["tasks", folder],
    queryFn: () => fetchTasks(folderId),
    enabled: !!folder,
  });

  const queryClient = useQueryClient();

  const mutationAddTask = useMutation({
    mutationFn: addTask,
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks", folder]);
    },
  });
  const mutationRemoveTask = useMutation({
    mutationFn: removeTask,
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks", folder]);
    },
  });

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleAddTodo = (newTodo) => {
    mutationAddTask.mutate({ ...newTodo, folderId: folderId });
  };

  const handleDeleteTask = (taskId) => {
    mutationRemoveTask.mutate(taskId);
  };

  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="flex flex-col h-screen px-2 bg-[#CADCFC] overflow-hidden">
      <div className="flex justify-between items-center border-b h-16">
        <h2 className="text-2xl text-white font-bold capitalize">
          {folder} Todo
        </h2>

        <button
          onClick={handleOpenDialog}
          className="bg-gray-100 text-gray-900 font-bold px-4 py-2 rounded hover:bg-gray-200"
        >
          <AddIcon /> Add
        </button>
      </div>

      {isLoading ? (
        <div className="flex items-center">
          <CircularProgress color="secondary" />
          <CircularProgress color="success" />
          <CircularProgress color="inherit" />
        </div>
      ) : (
        <ul className="flex-1 max-h-[600px] overflow-y-auto">
          {todos?.map((todo) => (
            <li
              key={todo.id}
              className="p-4 bg-gray-100 rounded-lg mb-2 shadow"
            >
              <h3 className="font-bold">{todo.title}</h3>
              <p>{todo.description}</p>
              <p className="text-sm text-gray-500">Deadline: {todo.deadline}</p>
              <button
                onClick={() => handleDeleteTask(todo.id)}
                className="mt-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}

      <AddTodo
        open={openDialog}
        handleClose={handleCloseDialog}
        handleAddTodo={handleAddTodo}
      />
    </div>
  );
}
