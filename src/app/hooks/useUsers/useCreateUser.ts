import { createUser } from "@/app/services/endpoints/createUsers";
import { CreateUserPayload } from "@/app/services/endpoints/createUsers/types";
import { useMutation } from "@tanstack/react-query";

export const useCreateUser = () => {
  return useMutation({
    mutationFn: (userData: CreateUserPayload) => createUser(userData),
  });
};
