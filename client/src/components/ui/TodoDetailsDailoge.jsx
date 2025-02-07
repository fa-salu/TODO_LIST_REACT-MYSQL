import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

export default function TodoDetailsDialog({
  open,
  handleClose,
  todo,
  handleDelete,
}) {
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
          onClick={() => handleDelete(todo?.id)}
          sx={{
            backgroundColor: "#e63946",
            color: "white",
            "&:hover": { backgroundColor: "#d62839" },
            borderRadius: 2,
            px: 3,
          }}
        >
          Delete
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
