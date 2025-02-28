import { setupAPIClient } from "../../api";
import { CreateUserPayload, User } from "./types";

export const createUser = async (userData: CreateUserPayload) => {
  const apiClient = setupAPIClient();
  const response = await apiClient.post<{ data: User }>("/user/create", userData);
  return response.data;
};
