import axiosInstance from "./axiosInstance";

export const fetchFolders = async () => {
  const response = await axiosInstance.get("/folders");
  return response.data;
};

export const addFolder = async (folderName) => {
  const response = await axiosInstance.post("/folders", {
    folderName,
  });
  return response.data;
};

export const deleteFolder = async (folderId) => {
  await axiosInstance.delete(`/folders/${folderId}`);
};
