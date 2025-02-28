import { deleteUser } from "@/app/services/endpoints/deleteUsers";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: (deletedUserId) => {
      queryClient.invalidateQueries({ queryKey: ["users"] }); 
      console.log(`Usuário ${deletedUserId} deletado com sucesso`);
    },
    onError: (error) => {
      console.error("Erro ao deletar usuário:", error);
    },
  });
};
