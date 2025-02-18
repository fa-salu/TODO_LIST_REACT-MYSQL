import pool from "../config/db.js";
import {
  createFolder,
  createTask,
  deleteFolder,
  deleteTask,
  getAllTasks,
  getFolders,
  getTasksByFolder,
  updateTask,
  updateTaskOrder,
} from "../models/taskModel.js";

export const addTask = async (req, res) => {
  const { title, description, deadline, folderId } = req.body;
  const userId = req.user.id;

  try {
    const taskId = await createTask(
      title,
      description,
      deadline,
      folderId,
      userId
    );
    res
      .status(201)
      .json({ id: taskId, title, description, deadline, folderId, userId });
  } catch (error) {
    res.status(500).json({ error: "Failed to add task" });
  }
};

export const getTasksByUserId = async (req, res) => {
  const userId = req.user.id;
  console.log("userid", userId);
  try {
    const task = await getAllTasks(userId);
    console.log("taks", task);
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: "Failed to get tasks" });
  }
};

export const getTasks = async (req, res) => {
  const { folderId } = req.params;
  const userId = req.user.id;

  try {
    const tasks = await getTasksByFolder(folderId, userId);
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
};

export const editTask = async (req, res) => {
  const { taskId } = req.params;
  const { title, description, deadline } = req.body;
  const userId = req.user.id;

  try {
    const [task] = await pool.query("SELECT user_id FROM tasks WHERE id = ?", [
      taskId,
    ]);

    if (task.length === 0 || task[0].user_id !== userId) {
      return res
        .status(403)
        .json({ error: "Not authorized to edit this task" });
    }

    await updateTask(taskId, title, description, deadline);

    res.status(200).json({ message: "Task updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update task" });
  }
};

export const reorderTasks = async (req, res) => {
  const tasks = req.body;
  const userId = req.user.id;

  try {
    const taskIds = tasks.map((task) => task.id);

    const [userTasks] = await pool.query(
      "SELECT id FROM tasks WHERE id IN (?) AND user_id = ?",
      [taskIds, userId]
    );

    if (userTasks.length !== tasks.length) {
      return res
        .status(403)
        .json({ error: "Not authorized to reorder these tasks" });
    }

    await updateTaskOrder(tasks);

    res.status(200).json({ message: "Task order updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update task order" });
  }
};

export const removeTask = async (req, res) => {
  const { taskId } = req.params;
  const userId = req.user.id;
  console.log("userId", userId);
  console.log("task", taskId);

  try {
    const [task] = await pool.query(
      "SELECT * FROM tasks WHERE id = ? AND user_id = ?",
      [taskId, userId]
    );

    console.log("Task Query Result:", task);

    if (task.length === 0) {
      return res
        .status(403)
        .json({ error: "Not authorized to delete this task" });
    }

    await deleteTask(taskId);
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);

    res
      .status(500)
      .json({ error: "Failed to delete task", details: error.message });
  }
};

export const addFolder = async (req, res) => {
  const { folderName } = req.body;
  const user_id = req.user.id;

  if (!folderName) {
    return res.status(400).json({ error: "Folder name is required" });
  }

  try {
    const folderId = await createFolder(folderName, user_id);
    res.status(201).json({ id: folderId, name: folderName });
  } catch (error) {
    res.status(500).json({ error: "Failed to add folder" });
  }
};

export const fetchFolders = async (req, res) => {
  const user_id = req.user.id;

  try {
    const folders = await getFolders(user_id);
    res.status(200).json(folders);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch folders" });
  }
};

export const removeFolder = async (req, res) => {
  const { folderId } = req.params;
  const user_id = req.user.id;

  try {
    const result = await deleteFolder(folderId, user_id);
    if (!result) {
      return res
        .status(403)
        .json({ error: "Unauthorized to delete this folder" });
    }
    res
      .status(200)
      .json({ message: "Folder and its tasks deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete folder" });
  }
};
