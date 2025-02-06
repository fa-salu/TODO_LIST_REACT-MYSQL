import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useFolders = () => {
  return useQuery({
    queryKey: ["folders"],
    queryFn: () =>
      axios.get("http://localhost:5000/api/folders").then((res) => res.data),
  });
};
