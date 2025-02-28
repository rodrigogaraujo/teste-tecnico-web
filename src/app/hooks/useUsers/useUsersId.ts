
import { getUserId } from "@/app/services/endpoints/getUsersId";
import { useQuery } from "@tanstack/react-query";

export const useUserId = (userId: string | undefined) => {
  return useQuery({
    queryKey: ["user", userId],
    queryFn: () => {
      if (userId) {
        return getUserId(userId);
      }
      return null;
    },
    enabled: !!userId, 
  });
};