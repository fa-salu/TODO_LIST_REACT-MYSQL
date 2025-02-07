import express from "express";
import {
  addFolder,
  addTask,
  editTask,
  fetchFolders,
  getTasks,
  removeFolder,
  removeTask,
} from "../controller/taskController.js";

const router = express.Router();

router.post("/tasks", addTask);
router.get("/tasks/:folderId", getTasks);
router.put("/tasks/:taskId", editTask);
router.delete("/tasks/:taskId", removeTask);
router.post("/folders", addFolder);
router.get("/folders", fetchFolders);
router.delete("/folders/:folderId", removeFolder);

export default router;
