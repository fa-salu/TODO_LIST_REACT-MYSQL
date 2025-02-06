import { useState } from "react";
import AddTodo from "./AddTodo";

export default function TodoList({ folder }) {
  const [todos, setTodos] = useState([
    { title: "Task 1", description: "Do something", deadline: "Tomorrow" },
    { title: "Task 2", description: "Do another thing", deadline: "Next Week" },
  ]);
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleAddTodo = (newTodo) => {
    setTodos([...todos, newTodo]);
  };

  return (
    <div className="flex-1 p-4 bg-[#22263A] h-full">
      <h2 className="text-2xl font-bold mb-4">{folder} Todos</h2>

      {/* Add Todo Button */}
      <button
        onClick={handleOpenDialog}
        className="mb-4 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
      >
        Add Todo
      </button>

      {/* Todo List */}
      <ul>
        {todos.map((todo, index) => (
          <li key={index} className="p-4 bg-gray-100 rounded-lg mb-2 shadow">
            <h3 className="font-bold">{todo.title}</h3>
            <p>{todo.description}</p>
            <p className="text-sm text-gray-500">Deadline: {todo.deadline}</p>
            <button className="mt-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
              Delete
            </button>
          </li>
        ))}
      </ul>

      {/* AddTodo Modal */}
      <AddTodo
        open={openDialog}
        handleClose={handleCloseDialog}
        handleAddTodo={handleAddTodo}
      />
    </div>
  );
}
