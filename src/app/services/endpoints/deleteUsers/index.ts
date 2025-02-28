import { setupAPIClient } from "../../api";

export const deleteUser = async (userId: string) => {
  const apiClient = setupAPIClient();
  const response = await apiClient.delete<{ data: string }>(`/user/${userId}`);
  return response.data;
};
