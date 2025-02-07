import {
  createFolder,
  createTask,
  deleteFolder,
  deleteTask,
  getFolders,
  getTasksByFolder,
  updateTask,
} from "../models/taskModel.js";

export const addTask = async (req, res) => {
  const { title, description, deadline, folderId } = req.body;
  try {
    const taskId = await createTask(title, description, deadline, folderId);
    res
      .status(201)
      .json({ id: taskId, title, description, deadline, folderId });
  } catch (error) {
    res.status(500).json({ error: "Failed to add task" });
  }
};

export const getTasks = async (req, res) => {
  const { folderId } = req.params;
  console.log("id", folderId);
  try {
    const tasks = await getTasksByFolder(folderId);
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
};

export const editTask = async (req, res) => {
  const { taskId } = req.params;
  const { title, description, deadline } = req.body;
  try {
    await updateTask(taskId, title, description, deadline);
    res.status(200).json({ message: "Task updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update task" });
  }
};

export const removeTask = async (req, res) => {
  const { taskId } = req.params;
  try {
    await deleteTask(taskId);
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete task" });
  }
};

export const addFolder = async (req, res) => {
  const { folderName } = req.body;
  try {
    const folderId = await createFolder(folderName);
    res.status(201).json({ id: folderId, name: folderName });
  } catch (error) {
    res.status(500).json({ error: "Failed to add folder" });
  }
};

export const fetchFolders = async (req, res) => {
  try {
    const folders = await getFolders();
    res.status(200).json(folders);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch folders" });
  }
};

export const removeFolder = async (req, res) => {
  const { folderId } = req.params;

  try {
    await deleteFolder(folderId);
    res
      .status(200)
      .json({ message: "Folder and its tasks deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete folder" });
  }
};
