import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

export default function CustomDialog({
  open,
  onClose,
  title,
  children,
  actions,
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: 3,
          padding: 2,
          backgroundColor: "#f9fafb",
          minWidth: 350,
        },
      }}
    >
      <DialogTitle sx={{ fontWeight: "bold", textAlign: "center" }}>
        {title}
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions sx={{ justifyContent: "center", padding: 2 }}>
        {actions}
      </DialogActions>
    </Dialog>
  );
}
