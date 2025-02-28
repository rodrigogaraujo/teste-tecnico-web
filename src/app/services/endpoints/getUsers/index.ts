
import { setupAPIClient } from "../../api";
import { User } from "./types";

export const getUsers = async (page: number = 0, limit: number = 10) => {
  const apiClient  = setupAPIClient()
  const response = await apiClient.get<{ data: User[] }>(`/user`, {
    params: { page, limit },
  });
  return response.data;
};