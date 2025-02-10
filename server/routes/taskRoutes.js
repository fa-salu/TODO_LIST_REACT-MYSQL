import express from "express";
import {
  addFolder,
  addTask,
  editTask,
  fetchFolders,
  getTasks,
  getTasksByUserId,
  removeFolder,
  removeTask,
  reorderTasks,
} from "../controller/taskController.js";
import { verifyUser } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/tasks", verifyUser, addTask);
router.get("/tasks/:folderId", verifyUser, getTasks);
router.put("/tasks/:taskId", verifyUser, editTask);
router.get("/tasks/:userId", verifyUser, getTasksByUserId);
router.post("/tasks/reorder", verifyUser, reorderTasks);
router.delete("/tasks/:taskId", verifyUser, removeTask);

router.post("/folders", verifyUser, addFolder);
router.get("/folders", verifyUser, fetchFolders);
router.delete("/folders/:folderId", verifyUser, removeFolder);

export default router;
