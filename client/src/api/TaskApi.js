import axiosInstance from "./axiosInstance";

export const fetchTasks = async (folderId) => {
  try {
    const response = await axiosInstance.get(`/tasks/${folderId}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch tasks");
  }
};

export const addTask = async ({ title, description, deadline, folderId }) => {
  try {
    const response = await axiosInstance.post("/tasks", {
      title,
      description,
      deadline,
      folderId,
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to add task");
  }
};

export const removeTask = async (taskId) => {
  try {
    const response = await axiosInstance.delete(`/tasks/${taskId}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to delete task");
  }
};
