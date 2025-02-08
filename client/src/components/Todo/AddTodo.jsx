import { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Box,
} from "@mui/material";

export default function AddTodo({
  open,
  handleClose,
  handleAddTodo,
  isEditing,
  selectedTodo,
}) {
  const [newTodo, setNewTodo] = useState({
    title: "",
    description: "",
    deadline: "",
  });
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);

  useEffect(() => {
    if (isEditing && selectedTodo) {
      setNewTodo({
        title: selectedTodo.title,
        description: selectedTodo.description,
        deadline: selectedTodo.deadline,
      });
    } else {
      setNewTodo({ title: "", description: "", deadline: "" });
    }
  }, [isEditing, selectedTodo]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTodo({ ...newTodo, [name]: value });
  };

  const handleSubmit = () => {
    if (newTodo.title && newTodo.description) {
      handleAddTodo({ ...newTodo, id: selectedTodo?.id });
      setNewTodo({ title: "", description: "", deadline: "" });
      handleClose();
    } else {
      setErrorDialogOpen(true);
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            borderRadius: 3,
            padding: 2,
            backgroundColor: "#f9fafb",
            minWidth: { xs: 350, md: 400 },
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
          {isEditing ? "Edit Todo" : "Add New Todo"}
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
            {isEditing ? "Save Changes" : "Add Todo"}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={errorDialogOpen}
        onClose={() => setErrorDialogOpen(false)}
        PaperProps={{
          sx: { borderRadius: 3, padding: 2, minWidth: 300 },
        }}
      >
        <DialogTitle sx={{ textAlign: "center", fontWeight: "bold" }}>
          Error
        </DialogTitle>
        <DialogContent sx={{ textAlign: "center" }}>
          {!newTodo.title ? "Please fill title" : "please fill description"}
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center" }}>
          <Button
            onClick={() => setErrorDialogOpen(false)}
            sx={{
              backgroundColor: "#e63946",
              color: "white",
              "&:hover": { backgroundColor: "#d62839" },
              borderRadius: 2,
              px: 3,
            }}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
