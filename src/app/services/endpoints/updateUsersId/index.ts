
import { setupAPIClient } from "../../api";
import { UserEdit } from "./types";

export const updateUsersId = async (user: UserEdit) => {
  const apiClient = setupAPIClient();
  const response = await apiClient.put(`/user/${user.id}`, user);
  return response.data;
};