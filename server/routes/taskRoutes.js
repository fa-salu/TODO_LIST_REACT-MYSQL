import express from "express";
import {
  addFolder,
  addTask,
  fetchFolders,
  getTasks,
  removeTask,
} from "../controller/taskController.js";

const router = express.Router();

router.post("/tasks", addTask);
router.get("/tasks/:folderId", getTasks);
router.delete("/tasks/:taskId", removeTask);
router.post("/folders", addFolder);
router.get("/folders", fetchFolders);

export default router;
