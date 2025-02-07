import { useState } from "react";
import AddTodo from "./AddTodo";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { addTask, fetchTasks, removeTask } from "../../api/TaskApi";
import AddTaskIcon from "@mui/icons-material/AddTask";
import { CircularProgress } from "@mui/material";
import TodoDetailsDialog from "../ui/TodoDetailsDailoge";

export default function TodoList({ folderDetails }) {
  const folderId = folderDetails?.id;
  const folder = folderDetails?.name;
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);

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
    onSuccess: () => queryClient.invalidateQueries(["tasks", folder]),
  });

  const mutationRemoveTask = useMutation({
    mutationFn: removeTask,
    onSuccess: () => queryClient.invalidateQueries(["tasks", folder]),
  });

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);
  const handleAddTodo = (newTodo) =>
    mutationAddTask.mutate({ ...newTodo, folderId: folderId });
  const handleDeleteTask = (taskId) => {
    mutationRemoveTask.mutate(taskId, {
      onSuccess: () => {
        setSelectedTodo(null);
      },
    });
  };

  const handleOpenDetails = (todo) => setSelectedTodo(todo);
  const handleCloseDetails = () => setSelectedTodo(null);

  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="flex flex-col h-screen px-2 bg-[#CADCFC] overflow-hidden">
      <div className="flex justify-between items-center border-b h-16">
        <h2 className="text-2xl text-gray-600 font-bold capitalize">
          {folder} Todo
        </h2>
        <button
          onClick={handleOpenDialog}
          className="bg-[#13155A] text-gray-100 font-bold px-4 py-2 rounded hover:bg-[#13155acf] cursor-pointer"
        >
          <AddTaskIcon /> Add
        </button>
      </div>

      {isLoading ? (
        <div className="flex items-center">
          <CircularProgress color="secondary" />
          <CircularProgress color="success" />
          <CircularProgress color="inherit" />
        </div>
      ) : (
        <ul className="flex-1 max-h-[600px] py-4 overflow-y-auto">
          {todos?.map((todo) => (
            <li
              key={todo.id}
              onClick={() => handleOpenDetails(todo)}
              className="p-4 bg-gray-100 rounded-lg mb-2 shadow cursor-pointer hover:bg-gray-200"
            >
              <h3 className="font-bold">{todo.title}</h3>
            </li>
          ))}
        </ul>
      )}

      <AddTodo
        open={openDialog}
        handleClose={handleCloseDialog}
        handleAddTodo={handleAddTodo}
      />
      <TodoDetailsDialog
        open={!!selectedTodo}
        handleClose={handleCloseDetails}
        todo={selectedTodo}
        handleDelete={handleDeleteTask}
      />
    </div>
  );
}
