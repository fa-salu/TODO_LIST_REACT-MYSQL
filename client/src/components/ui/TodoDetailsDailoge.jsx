import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";
import { removeTask } from "../../api/TaskApi";
import { useState } from "react";

export default function TodoDetailsDialog({
  open,
  handleClose,
  todo,
  handleUpdate,
}) {
  const queryClient = useQueryClient();
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteMutation = useMutation({
    mutationFn: removeTask,
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]);
      handleClose();
    },
  });

  const handleDelete = () => {
    if (!todo?.id) return;
    setIsDeleting(true);
    deleteMutation.mutate(todo.id, {
      onSettled: () => setIsDeleting(false),
    });
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
        {todo?.title}
      </DialogTitle>
      <DialogContent>
        <Typography variant="body1" sx={{ marginBottom: 2 }}>
          {todo?.description}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Deadline: {todo?.deadline}
        </Typography>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center", padding: 2 }}>
        <Button
          onClick={handleDelete}
          disabled={isDeleting}
          sx={{
            backgroundColor: "#e63946",
            color: "white",
            "&:hover": { backgroundColor: "#d62839" },
            borderRadius: 2,
            px: 3,
          }}
        >
          {isDeleting ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Delete"
          )}
        </Button>
        <Button
          onClick={handleUpdate}
          sx={{
            backgroundColor: "#D367C7",
            color: "white",
            "&:hover": { backgroundColor: "#1d3557" },
            borderRadius: 2,
            px: 3,
          }}
        >
          Update
        </Button>
        <Button
          onClick={handleClose}
          sx={{
            backgroundColor: "#457b9d",
            color: "white",
            "&:hover": { backgroundColor: "#1d3557" },
            borderRadius: 2,
            px: 3,
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
