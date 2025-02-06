import { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from "@mui/material";

export default function AddTodo({ open, handleClose, handleAddTodo }) {
  const [newTodo, setNewTodo] = useState({
    title: "",
    description: "",
    deadline: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTodo({ ...newTodo, [name]: value });
  };

  const handleSubmit = () => {
    if (newTodo.title && newTodo.description && newTodo.deadline) {
      handleAddTodo(newTodo); // Pass new todo to parent component
      setNewTodo({ title: "", description: "", deadline: "" });
      handleClose();
    } else {
      alert("Please fill in all fields");
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add Todo</DialogTitle>
      <DialogContent>
        <TextField
          label="Title"
          name="title"
          value={newTodo.title}
          onChange={handleInputChange}
          fullWidth
          className="mb-4"
        />
        <TextField
          label="Description"
          name="description"
          value={newTodo.description}
          onChange={handleInputChange}
          fullWidth
          className="mb-4"
        />

        {/* DateTime Picker using native input */}
        <TextField
          label="Deadline"
          name="deadline"
          type="datetime-local"
          value={newTodo.deadline}
          onChange={handleInputChange}
          fullWidth
          className="mb-4"
          InputLabelProps={{
            shrink: true, // Ensures the label stays visible when date/time is selected
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Add Todo
        </Button>
      </DialogActions>
    </Dialog>
  );
}
