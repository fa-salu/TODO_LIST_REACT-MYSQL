import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  IconButton,
  CircularProgress,
} from "@mui/material";
import FolderDeleteIcon from "@mui/icons-material/FolderDelete";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import FolderIcon from "@mui/icons-material/Folder";
import { addFolder, fetchFolders, deleteFolder } from "../../api/FolderApi";

export default function Sidebar({ onSelectFolder }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [folderName, setFolderName] = useState("");

  const {
    data: folders,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["folders"],
    queryFn: fetchFolders,
  });

  useEffect(() => {
    if (folders && folders.length > 0) {
      onSelectFolder(folders[0].name, folders[0].id);
    }
  }, [folders]);

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: addFolder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["folders"] });
    },
  });

  const mutationDeleteFolder = useMutation({
    mutationFn: deleteFolder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["folders"] });
    },
  });

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleAddFolder = () => {
    if (folderName) {
      mutation.mutate(folderName);
      setFolderName("");
      setOpenDialog(false);
    } else {
      alert("Please enter a folder name");
    }
  };

  const handleDeleteFolder = (folderId) => {
    if (window.confirm("Are you sure you want to delete this folder?")) {
      mutationDeleteFolder.mutate(folderId);
    }
  };

  return (
    <div className="w-64 bg-[#CADCFC] text-gray-600 h-screen p-6 border-r">
      <div className="flex justify-between items-center mb-4 border-b">
        <h2 className="text-2xl font-bold">Todo</h2>
        <IconButton onClick={handleOpenDialog}>
          <CreateNewFolderIcon style={{ color: "#FFE79D" }} />
        </IconButton>
      </div>

      <div className="h-[calc(100vh-10rem)] overflow-y-auto">
        {" "}
        {isLoading ? (
          <Button
            variant="contained"
            color="primary"
            fullWidth
            disabled
            startIcon={<CircularProgress size={24} />}
          >
            Loading Folders...
          </Button>
        ) : isError ? (
          <div>Error: {error.message}</div>
        ) : (
          <ul>
            {folders?.map((folder) => (
              <li
                key={folder.id}
                className="flex justify-between items-center cursor-pointer p-2 hover:bg-gray-100 rounded"
              >
                <span
                  className="flex-auto capitalize"
                  onClick={() => onSelectFolder(folder.name, folder.id)}
                >
                  <FolderIcon style={{ color: "#FFE79D" }} /> {folder.name}
                </span>
                <IconButton
                  onClick={() => handleDeleteFolder(folder.id)}
                  size="small"
                >
                  <FolderDeleteIcon style={{ color: "red" }} />
                </IconButton>
              </li>
            ))}
          </ul>
        )}
      </div>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
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
          Create New Folder
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Folder Name"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
            fullWidth
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
          />
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", padding: 2 }}>
          <Button
            onClick={handleCloseDialog}
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
            onClick={handleAddFolder}
            disabled={mutation.isLoading}
            sx={{
              backgroundColor: "#457b9d",
              color: "white",
              "&:hover": { backgroundColor: "#1d3557" },
              borderRadius: 2,
              px: 3,
            }}
          >
            {mutation.isLoading ? "Creating..." : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
