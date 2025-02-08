import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  IconButton,
  CircularProgress,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import FolderDeleteIcon from "@mui/icons-material/FolderDelete";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import CloseIcon from "@mui/icons-material/Close";
import FolderIcon from "@mui/icons-material/Folder";
import { addFolder, fetchFolders, deleteFolder } from "../../api/FolderApi";
import CustomDialog from "../ui/CustomDialog";

export default function Sidebar({ onSelectFolder }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [folderName, setFolderName] = useState("");
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [folderToDelete, setFolderToDelete] = useState(null);
  const [openAlertDialog, setOpenAlertDialog] = useState(false);

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

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  const handleAddFolder = () => {
    if (folderName) {
      mutation.mutate(folderName);
      setFolderName("");
      setOpenDialog(false);
    } else {
      setOpenAlertDialog(true);
    }
  };

  const handleCloseAlertDialog = () => setOpenAlertDialog(false);

  const handleOpenDeleteDialog = (folderId) => {
    setFolderToDelete(folderId);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setFolderToDelete(null);
  };

  const handleConfirmDelete = () => {
    if (folderToDelete) {
      mutationDeleteFolder.mutate(folderToDelete);
    }
    handleCloseDeleteDialog();
  };

  return (
    <div className="w-64 bg-[#CADCFC] text-gray-600 h-screen p-6 border-r">
      <div className="flex justify-between items-center mb-4 border-b">
        <h2 className="text-2xl font-bold ml-5 md:ml-0">
          <span className="absolute top-6 left-3 md:hidden">
            <CloseIcon />
          </span>{" "}
          Todo
        </h2>
        <IconButton onClick={handleOpenDialog}>
          <CreateNewFolderIcon style={{ color: "#FFE79D" }} />
        </IconButton>
      </div>

      <div className="h-[calc(100vh-10rem)] overflow-y-auto">
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
                  onClick={() => handleOpenDeleteDialog(folder.id)}
                  size="small"
                >
                  <FolderDeleteIcon style={{ color: "red" }} />
                </IconButton>
              </li>
            ))}
          </ul>
        )}
      </div>

      <CustomDialog
        open={openDialog}
        onClose={handleCloseDialog}
        title="Create New Folder"
        actions={
          <>
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
          </>
        }
      >
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
      </CustomDialog>

      <CustomDialog
        open={openAlertDialog}
        onClose={handleCloseAlertDialog}
        title="Error"
        actions={
          <Button
            onClick={handleCloseAlertDialog}
            sx={{ backgroundColor: "#e63946", color: "white" }}
          >
            OK
          </Button>
        }
      >
        <Typography sx={{ textAlign: "center", color: "#333" }}>
          Please enter a folder name.
        </Typography>
      </CustomDialog>

      <CustomDialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        title="Confirm Deletion"
        actions={
          <>
            <Button
              onClick={handleCloseDeleteDialog}
              sx={{
                backgroundColor: "#457b9d",
                color: "white",
                "&:hover": { backgroundColor: "#1d3557" },
                borderRadius: 2,
                px: 3,
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirmDelete}
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
          </>
        }
      >
        <Typography sx={{ textAlign: "center", color: "#333" }}>
          Are you sure you want to delete this folder? This action cannot be
          undone.
        </Typography>
      </CustomDialog>
    </div>
  );
}
