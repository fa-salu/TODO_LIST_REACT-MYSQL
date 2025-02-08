import pool from "../config/db.js";

export const createTask = async (title, description, deadline, folderId) => {
  const [result] = await pool.query(
    "INSERT INTO tasks (title, description, deadline, folder_id) VALUES (?, ?, ?, ?)",
    [title, description, deadline, folderId]
  );
  return result.insertId;
};

export const getTasksByFolder = async (folderId) => {
  const [rows] = await pool.query("SELECT * FROM tasks WHERE folder_id = ?", [
    folderId,
  ]);
  return rows;
};

export const updateTask = async (taskId, title, description, deadline) => {
  await pool.query(
    "UPDATE tasks SET title = ?, description = ?, deadline = ? WHERE id = ?",
    [title, description, deadline, taskId]
  );
};

export const deleteTask = async (taskId) => {
  await pool.query("DELETE FROM tasks WHERE id = ?", [taskId]);
};

export const createFolder = async (folderName) => {
  const [result] = await pool.query("INSERT INTO folders (name) VALUES (?)", [
    folderName,
  ]);
  return result.insertId;
};

export const getFolders = async () => {
  const [rows] = await pool.query(
    "SELECT * FROM folders ORDER BY created_at ASC"
  );
  return rows;
};

export const deleteFolder = async (folderId) => {
  await pool.query("DELETE FROM tasks WHERE folder_id = ?", [folderId]);

  await pool.query("DELETE FROM folders WHERE id = ?", [folderId]);
};
