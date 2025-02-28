/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";

import { Alert, AlertDescription } from "@/components/ui/alert";
import Layout from "../../templates/layout";
import { useUserId } from "@/app/hooks/useUsers/useUsersId";
import { useUpdateUsersId } from "@/app/hooks/useUsers/useUpdateUser";

import { UserEdit } from "@/app/services/endpoints/updateUsersId/types";
import { useSearchParams } from "next/navigation"; 
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function EditUserPage() {
  const searchParams = useSearchParams();
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const [formData, setFormData] = useState<UserEdit>({
    firstName: '',
    lastName: '',
    email: '',
    gender: '',
    phone: '',
    location: {
      street: '',
      city: '',
      state: '',
      country: '',
      timezone: '',
    },
  });
  
  const [errors, setErrors] = useState<{ [key: string]: string }>({}); // To handle form errors

  useEffect(() => {
    const id = searchParams.get("id");
    if (id) {
      setUserId(id); 
    }
  }, [searchParams]);

  const { data: user, isLoading, isError } = useUserId(userId as string); 
  const { mutate: updateUser, isPending: isUpdating, isError: updateError, isSuccess: updateSuccess } = useUpdateUsersId();

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        gender: user.gender,
        phone: user.phone,
        location: user.location,
      });
    }
  }, [user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors: { [key: string]: string } = {};
    if (!formData.firstName) validationErrors.firstName = "Primeiro Nome é obrigatório";
    if (!formData.lastName) validationErrors.lastName = "Último Nome é obrigatório";
    if (!formData.email) validationErrors.email = "Email é obrigatório";
    if (!formData.gender) validationErrors.gender = "Sexo é obrigatório";
    if (!formData.phone) validationErrors.phone = "Telefone é obrigatório";
    if (!formData.location.street) validationErrors.street = "Rua é obrigatória";
    if (!formData.location.city) validationErrors.city = "Cidade é obrigatória";
    if (!formData.location.state) validationErrors.state = "Estado é obrigatório";
    if (!formData.location.country) validationErrors.country = "País é obrigatório";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      if (userId) {
        updateUser({ ...formData, id: userId });
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
  
    if (name in formData.location) {
      setFormData({
        ...formData,
        location: {
          ...formData.location,
          [name]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  
  if (isLoading) return <p>Carregando dados...</p>;
  if (isError) return <p>Erro ao carregar dados do usuário.</p>;

  return (
    <Layout>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-6 text-gray-800">Editar Usuário</h1>

          {updateError && (
            <Alert className="bg-red-500 text-white my-4 transition-opacity duration-300">
              <AlertDescription>Erro ao editar usuário</AlertDescription>
            </Alert>
          )}

          {updateSuccess && (
            <Alert className="bg-green-500 text-white my-4 transition-opacity duration-300">
              <AlertDescription>Usuário editado com sucesso!</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-center mb-6">
              <img src={user?.picture} alt="Foto do usuário" className="w-32 h-32 rounded-full" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Campos do formulário */}
              <div className="w-full">
                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="firstName">
                  Primeiro Nome
                </label>
                <Input
                  id="firstName"
                  type="text"
                  name="firstName"
                  placeholder="Primeiro Nome"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="bg-white p-3 rounded-md border-2 border-gray-300 w-full"
                  required
                />
                {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
              </div>

              <div className="w-full">
                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="lastName">
                  Último Nome
                </label>
                <Input
                  id="lastName"
                  type="text"
                  name="lastName"
                  placeholder="Último Nome"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="bg-white p-3 rounded-md border-2 border-gray-300 w-full"
                  required
                />
                {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
              </div>

              <div className="w-full">
                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="email">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-white p-3 rounded-md border-2 border-gray-300 w-full"
                  required
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              <div className="w-full">
                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="phone">
                  Telefone
                </label>
                <Input
                  id="phone"
                  type="text"
                  name="phone"
                  placeholder="Telefone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="bg-white p-3 rounded-md border-2 border-gray-300 w-full"
                  required
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>

              <div className="w-full">
                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="gender">
                  Sexo
                </label>
                <div className="flex gap-4">
                  <label>
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      checked={formData.gender === "male"}
                      onChange={handleChange}
                    />
                    Masculino
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      checked={formData.gender === "female"}
                      onChange={handleChange}
                    />
                    Feminino
                  </label>
                </div>
                {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
              </div>

              <div className="w-full">
                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="street">
                  Rua
                </label>
                <Input
                  id="street"
                  type="text"
                  name="street"
                  placeholder="Rua"
                  value={formData?.location?.street || ""}
                  onChange={handleChange}
                  className="bg-white"
                  required
                />
                {errors.street && <p className="text-red-500 text-xs mt-1">{errors.street}</p>}
              </div>

              <div className="w-full">
                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="city">
                  Cidade
                </label>
                <Input
                  id="city"
                  type="text"
                  name="city" 
                  placeholder="Cidade"
                  value={formData?.location?.city || ""}
                  onChange={handleChange}
                  className="bg-white"
                />
                {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
              </div>

              <div className="w-full">
                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="state">
                  Estado
                </label>
                <Input
                  id="state"
                  type="text"
                  name="state"
                  placeholder="Estado"
                  value={formData?.location?.state || ""}
                  onChange={handleChange}
                  className="bg-white"
                />
                {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
              </div>

              <div className="w-full">
                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="country">
                  País
                </label>
                <Input
                  id="country"
                  type="text"
                  name="country"
                  placeholder="País"
                  value={formData?.location?.country || ""}
                  onChange={handleChange}
                  className="bg-white"
                />
                {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country}</p>}
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <Button type="submit" disabled={isUpdating} className="text-white bg-blue-500 hover:bg-blue-700 py-2 px-6 rounded-md">
                {isUpdating ? "Atualizando..." : "Atualizar Usuário"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}

