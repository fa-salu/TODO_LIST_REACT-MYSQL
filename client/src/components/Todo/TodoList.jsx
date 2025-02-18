import { useState, useEffect } from "react";
import AddTodo from "./AddTodo";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addTask,
  fetchTasks,
  removeTask,
  updateTask,
  updateTaskOrder,
} from "../../api/TaskApi";
import AddTaskIcon from "@mui/icons-material/AddTask";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import TodoDetailsDialog from "../ui/TodoDetailsDailoge";
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
  KeyboardSensor,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import SavingOrderindicator from "../ui/SavingOrderindicator";
import SkeletonTodoItem from "../ui/Skelton/todosSkelton";
import ErrorMessage from "../ui/ErrorMessage";

const SortableTodoItem = ({ todo, handleOpenDetails }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: todo.id });

  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="flex py-4 px-2 bg-gray-100 rounded-lg mb-2 shadow cursor-pointer hover:bg-gray-200"
      onClick={() => handleOpenDetails(todo)}
    >
      <span {...listeners} className="cursor-grab">
        <DragIndicatorIcon />
      </span>
      <span>
        <CheckBoxOutlineBlankIcon />
      </span>
      <h3 className="font-bold px-4">{todo.title}</h3>
    </li>
  );
};

export default function TodoList({ folderDetails }) {
  const folderId = folderDetails?.id;
  const folder = folderDetails?.name;
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [todos, setTodos] = useState([]);
  const [isUpdatingOrder, setIsUpdatingOrder] = useState(false);

  const {
    data: fetchedTodos,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["tasks", folder],
    queryFn: () => fetchTasks(folderId),
    enabled: !!folder,
  });

  useEffect(() => {
    if (fetchedTodos) {
      setTodos(fetchedTodos);
    }
  }, [fetchedTodos]);

  const handleOpenDetails = (todo) => {
    setSelectedTodo(todo);
  };

  const queryClient = useQueryClient();
  const mutationReorderTasks = useMutation({
    mutationFn: updateTaskOrder,
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks", folder]);
      setIsUpdatingOrder(false);
    },
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  const onDragEnd = (event) => {
    if (isUpdatingOrder) return;
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setIsUpdatingOrder(true);

    setTodos((prevTodos) => {
      const oldIndex = prevTodos.findIndex((task) => task.id === active.id);
      const newIndex = prevTodos.findIndex((task) => task.id === over.id);
      const newOrder = arrayMove(prevTodos, oldIndex, newIndex);

      mutationReorderTasks.mutate(
        newOrder.map((task, index) => ({ id: task.id, position: index }))
      );

      return newOrder;
    });
  };

  if (isError) {
    return (
      <ErrorMessage
        message={error.message}
        onRetry={() => queryClient.invalidateQueries(["tasks", folder])}
      />
    );
  }

  return (
    <div className="flex flex-col h-screen px-2 bg-[#CADCFC] overflow-hidden">
      {isUpdatingOrder && <SavingOrderindicator />}
      <div className="flex justify-between items-center border-b h-16">
        <h2 className="text-2xl text-gray-600 font-bold ml-12 md:ml-6 capitalize">
          {folder}
        </h2>
        <button
          onClick={() => setOpenDialog(true)}
          className="bg-[#13155A] text-gray-100 font-bold px-4 py-2 rounded hover:bg-[#13155acf] cursor-pointer"
        >
          <AddTaskIcon /> Add
        </button>
      </div>

      {isLoading ? (
        <ul className="flex-1 max-h-[600px] py-4 overflow-y-auto max-w-lvh w-full mx-auto">
          {Array.from({ length: 6 }).map((_, index) => (
            <SkeletonTodoItem key={index} />
          ))}
        </ul>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={onDragEnd}
        >
          <SortableContext items={todos} strategy={verticalListSortingStrategy}>
            <ul className="flex-1 max-h-[600px] py-4 overflow-y-auto max-w-lvh w-full mx-auto">
              {todos?.map((todo) => (
                <SortableTodoItem
                  key={todo.id}
                  todo={todo}
                  handleOpenDetails={handleOpenDetails}
                />
              ))}
            </ul>
          </SortableContext>
        </DndContext>
      )}

      <AddTodo
        open={openDialog}
        handleClose={() => setOpenDialog(false)}
        handleAddTodo={(newTodo) => {
          if (isEditing) {
            updateTask({ taskId: newTodo.id, updatedTask: newTodo }).then(
              () => {
                setTodos((prevTodos) =>
                  prevTodos.map((todo) =>
                    todo.id === newTodo.id ? newTodo : todo
                  )
                );
              }
            );
          } else {
            addTask({ ...newTodo, folderId }).then((addedTask) => {
              setTodos((prevTodos) => [...prevTodos, addedTask]);
            });
          }
          setOpenDialog(false);
          setIsEditing(false);
        }}
        isEditing={isEditing}
        selectedTodo={selectedTodo}
      />

      <TodoDetailsDialog
        open={!!selectedTodo}
        handleClose={() => setSelectedTodo(null)}
        todo={selectedTodo}
        handleDelete={(taskId) => removeTask(taskId)}
        handleUpdate={() => {
          setIsEditing(true);
          setOpenDialog(true);
        }}
      />
    </div>
  );
}
