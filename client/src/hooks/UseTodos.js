import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useFolders = () => {
  return useQuery(["folders"], () =>
    axios.get("/api/folders").then((res) => res.data)
  );
};
