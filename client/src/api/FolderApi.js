import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const fetchFolders = async () => {
  const response = await axios.get(`${API_URL}/folders`);
  return response.data;
};

export const addFolder = async (folderName) => {
  const response = await axios.post(`${API_URL}/folders`, { folderName });
  return response.data;
};

export const deleteFolder = async (folderId) => {
  await axios.delete(`${API_URL}/folders/${folderId}`);
};
