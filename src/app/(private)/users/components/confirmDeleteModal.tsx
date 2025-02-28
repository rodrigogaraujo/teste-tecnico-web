import { Button } from "@/components/ui/button";

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  userName: string;
}

export default function ConfirmDeleteModal({
  isOpen,
  onClose,
  onConfirm,
  userName,
}: ConfirmDeleteModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-96 shadow-lg flex flex-col items-center text-center">
        <h2 className="text-lg font-semibold text-gray-800">Excluir Usuário</h2>
        <p className="text-gray-600 mt-2">
          Tem certeza que deseja excluir <strong>{userName}</strong>?
        </p>
        <p className="text-gray-600 mt-0">Essa ação não pode ser desfeita.</p>
        <div className="mt-4 flex justify-center gap-3 w-full">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            Excluir
          </Button>
        </div>
      </div>
    </div>
  );
}
