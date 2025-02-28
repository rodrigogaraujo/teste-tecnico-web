"use client";

import { useState } from "react";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import Layout from "../../templates/layout";
import { useCreateUser } from "../../hooks/useUsers/useCreateUser";

export default function CreateUserPage() {
  const { mutate, isPending, isError, error, isSuccess } = useCreateUser();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const errors: string[] = [];
    if (!formData.firstName) errors.push("O primeiro nome é obrigatório.");
    if (!formData.lastName) errors.push("O último nome é obrigatório.");
    if (!formData.email) errors.push("O email é obrigatório.");
    if (!formData.password) errors.push("A senha é obrigatória.");

    if (errors.length > 0) {
      setErrorMessages(errors); 
      return;
    }

    setErrorMessages([]);

    mutate(formData);
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Criar Novo Usuário</h1>

      {isError && (
        <Alert className="bg-red-500 text-white my-4 transition-opacity duration-300">
          <AlertDescription>{error?.message || "Erro ao criar usuário"}</AlertDescription>
        </Alert>
      )}

      {isSuccess && (
        <Alert className="bg-green-500 text-white my-4 transition-opacity duration-300">
          <AlertDescription>Usuário criado com sucesso!</AlertDescription>
        </Alert>
      )}

      {errorMessages.length > 0 && (
        <Alert className="bg-yellow-500 text-white my-4 transition-opacity duration-300">
          <AlertDescription>
            {errorMessages.map((message, index) => (
              <div key={index}>{message}</div>
            ))}
          </AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 w-1/2">
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="firstName">
            Primeiro Nome
          </label>
          <Input
            id="firstName"
            type="text"
            name="firstName"
            placeholder="Primeiro Nome"
            value={formData.firstName}
            onChange={handleChange}
            className="bg-white"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="lastName">
            Último Nome
          </label>
          <Input
            id="lastName"
            type="text"
            name="lastName"
            placeholder="Último Nome"
            value={formData.lastName}
            onChange={handleChange}
            className="bg-white"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="email">
            Email
          </label>
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="bg-white"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="password">
            Senha
          </label>
          <Input
            id="password"
            type="password"
            name="password"
            placeholder="Senha"
            value={formData.password}
            onChange={handleChange}
            className="bg-white"
            required
          />
        </div>

        <Button type="submit" disabled={isPending} className="flex items-center gap-2 text-white">
          {isPending && <Loader className="w-4 h-4 animate-spin" />}
          {isPending ? "Criando..." : "Criar Usuário"}
        </Button>
      </form>
    </Layout>
  );
}
