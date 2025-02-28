
import { setupAPIClient } from "../../api";
import { User } from "./types";

export const getUserId = async (id: string) => {
  const apiClient = setupAPIClient();
  const response = await apiClient.get<User>(`/user/${id}`);
  return response.data;
};
