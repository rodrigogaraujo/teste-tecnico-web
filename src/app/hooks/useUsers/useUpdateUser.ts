import { updateUsersId } from "@/app/services/endpoints/updateUsersId";
import { User } from "@/app/services/endpoints/updateUsersId/types";
import { useMutation } from "@tanstack/react-query";

export const useUpdateUsersId = () => {
  return useMutation({
    mutationFn: (userData: User) => updateUsersId(userData),
  });
};
