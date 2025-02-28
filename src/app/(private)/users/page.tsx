"use client";

import { useState } from "react";
import { useUsersList } from "../../hooks/useUsers/useUsersList";
import Image from "next/image";
import Layout from "../../templates/layout";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useDeleteUser } from "@/app/hooks/useUsers/useDeleteUser";
import { Edit2, Trash2 } from "lucide-react";
import ConfirmDeleteModal from "./components/confirmDeleteModal";
import { useRouter } from "next/navigation";


export default function UsersPage() {
  const router = useRouter();
  const [page, setPage] = useState(0);
  const [selectedUser, setSelectedUser] = useState<{ id: string; name: string } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const limit = 10;
  
  const { users, isLoading, isError } = useUsersList(0, 10);
  const deleteUserMutation = useDeleteUser();

  const handleNextPage = () => setPage((prev) => prev + 1);
  const handlePrevPage = () => setPage((prev) => Math.max(prev - 1, 0));

  const handleOpenModal = (user: { id: string; name: string }) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handleDeleteUser = async () => {
    if (selectedUser) {
      await deleteUserMutation.mutateAsync(selectedUser.id);
      handleCloseModal();
    }
  };

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Lista de Usuários</h1>

        {isLoading && (
          <div className="flex justify-center items-center py-4">
            <div className="w-8 h-8 border-4 border-t-4 border-gray-500 border-solid rounded-full animate-spin"></div>
            <span className="ml-3 text-lg">Carregando...</span>
          </div>
        )}

        {isError && (
          <Alert className="my-4 bg-red-500 text-white">
            <AlertDescription>{isError}</AlertDescription>
          </Alert>
        )}

        {!isLoading && !isError && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <ul className="space-y-4">
              {users.map((user) => (
                  <li key={user?.id} className="flex items-center justify-between p-4 border-b">
                  <div className="flex items-center gap-4">
                    <Image
                      src={user?.picture}
                      alt={user?.firstName}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <span className="text-gray-700 font-medium">
                      {user?.firstName} {user?.lastName}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleOpenModal({ id: user.id, name: user.firstName })} className="text-red-500 hover:text-red-700">
                      <Trash2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => router.push(`/edit-users?id=${user.id}`)}
                      className="text-blue-500 hover:text-blue-700 transition"
                    >
                      <Edit2 size={20} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-6 flex justify-between items-center">
          <Button
            variant="outline"
            onClick={handlePrevPage}
            disabled={page === 0 || isLoading}
            className="w-28"
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            onClick={handleNextPage}
            disabled={users.length < limit || isLoading}
            className="w-28"
          >
            Próximo
          </Button>
        </div>
      </div>
      <ConfirmDeleteModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleDeleteUser}
        userName={selectedUser?.name || ""}
      />
    </Layout>
  );
}
