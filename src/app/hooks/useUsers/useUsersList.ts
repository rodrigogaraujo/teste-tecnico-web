import { useQuery } from "@tanstack/react-query";
import { getUsers } from "@/app/services/endpoints/getUsers";
import { User } from "@/app/services/endpoints/getUsers/types";

export const useUsersList = (page: number = 0, limit: number = 10) => {
  const { data, isLoading, isError, error } = useQuery<{ data: User[] }, Error>({
    queryKey: ["users", page, limit],
    queryFn: () => getUsers(page, limit),
    staleTime: 1000 * 60 * 5,
  });

  return {
    users: data?.data || [],
    isLoading,
    isError,
    error,
  };
};
