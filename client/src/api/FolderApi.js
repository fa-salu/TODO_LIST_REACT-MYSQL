import axiosInstance from "./axiosInstance";

const API_URL = "http://localhost:5000/api";

export const fetchFolders = async () => {
  const response = await axiosInstance.get(`${API_URL}/folders`);
  return response.data;
};

export const addFolder = async (folderName) => {
  const response = await axiosInstance.post(`${API_URL}/folders`, {
    folderName,
  });
  return response.data;
};

export const deleteFolder = async (folderId) => {
  await axiosInstance.delete(`${API_URL}/folders/${folderId}`);
};
