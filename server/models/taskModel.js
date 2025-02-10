import pool from "../config/db.js";

export const createTask = async (
  title,
  description,
  deadline,
  folderId,
  userId
) => {
  const [result] = await pool.query(
    "INSERT INTO tasks (title, description, deadline, folder_id, user_id) VALUES (?, ?, ?, ?, ?)",
    [title, description, deadline, folderId, userId]
  );
  return result.insertId;
};

export const getAllTasks = async (userId) => {
  const [result] = await pool.query("SELECT * FROM tasks WHERE user_id = ?", [
    userId,
  ]);
  console.log("model", result);
  return result;
};

export const getTasksByFolder = async (folderId, userId) => {
  const [rows] = await pool.query(
    "SELECT * FROM tasks WHERE folder_id = ? AND user_id = ? ORDER BY position ASC",
    [folderId, userId]
  );
  return rows;
};

export const updateTask = async (taskId, title, description, deadline) => {
  await pool.query(
    "UPDATE tasks SET title = ?, description = ?, deadline = ? WHERE id = ?",
    [title, description, deadline, taskId]
  );
};

export const updateTaskOrder = async (tasks) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    for (const task of tasks) {
      await connection.query("UPDATE tasks SET position = ? WHERE id = ?", [
        task.position,
        task.id,
      ]);
    }

    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

export const deleteTask = async (taskId) => {
  const [result] = await pool.query("DELETE FROM tasks WHERE id = ?", [taskId]);
  console.log("Delete Query Result:", result);
};

export const createFolder = async (folderName, user_id) => {
  const [result] = await pool.query(
    "INSERT INTO folders (name, user_id) VALUES (?, ?)",
    [folderName, user_id]
  );
  return result.insertId;
};

export const getFolders = async (user_id) => {
  const [rows] = await pool.query(
    "SELECT * FROM folders WHERE user_id = ? ORDER BY created_at ASC",
    [user_id]
  );
  return rows;
};

export const deleteFolder = async (folderId, user_id) => {
  const [folder] = await pool.query(
    "SELECT id FROM folders WHERE id = ? AND user_id = ?",
    [folderId, user_id]
  );

  if (folder.length === 0) return false;

  await pool.query("DELETE FROM tasks WHERE folder_id = ?", [folderId]);

  await pool.query("DELETE FROM folders WHERE id = ?", [folderId]);

  return true;
};
