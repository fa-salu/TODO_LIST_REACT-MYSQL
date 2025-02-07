import { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Box,
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
    if (newTodo.title && newTodo.description) {
      handleAddTodo(newTodo);
      setNewTodo({ title: "", description: "", deadline: "" });
      handleClose();
    } else {
      alert("Please fill in all fields");
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: {
          borderRadius: 3,
          padding: 2,
          backgroundColor: "#f9fafb",
          minWidth: 400,
        },
      }}
    >
      <DialogTitle
        sx={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          color: "#333",
          textAlign: "center",
        }}
      >
        Add New Todo
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Title"
            name="title"
            value={newTodo.title}
            onChange={handleInputChange}
            fullWidth
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
          />
          <TextField
            label="Description"
            name="description"
            value={newTodo.description}
            onChange={handleInputChange}
            fullWidth
            multiline
            rows={3}
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
          />
          <TextField
            label="Deadline"
            name="deadline"
            type="datetime-local"
            value={newTodo.deadline}
            onChange={handleInputChange}
            fullWidth
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center", padding: 2 }}>
        <Button
          onClick={handleClose}
          sx={{
            backgroundColor: "#e63946",
            color: "white",
            "&:hover": { backgroundColor: "#d62839" },
            borderRadius: 2,
            px: 3,
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          sx={{
            backgroundColor: "#457b9d",
            color: "white",
            "&:hover": { backgroundColor: "#1d3557" },
            borderRadius: 2,
            px: 3,
          }}
        >
          Add Todo
        </Button>
      </DialogActions>
    </Dialog>
  );
}
