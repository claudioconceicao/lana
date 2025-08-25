"use client";
import { useState } from "react";

const PersonalInformation = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    phone: "",
    address: "",
    city: "",
    state: "",
  });

  // Atualiza os valores dos inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submissão do formulário
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Dados do formulário:", formData);
    // aqui você pode enviar para sua API com fetch/axios
  };

  return (
    <div className="flex flex-col w-full h-full p-8  bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold mb-4">Informação Pessoal</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-row justify-start gap-4">
          <label htmlFor="firstName" className="flex flex-col w-full">
            Primeiro Nome:
            <input
              id="firstName"
              name="firstName"
              type="text"
              value={formData.firstName}
              onChange={handleChange}
              className="border p-2 rounded"
              placeholder="Primeiro nome"
              required
            />
          </label>
          <label htmlFor="lastName" className="flex flex-col w-full">
            Último Nome:
            <input
              id="lastName"
              name="lastName"
              type="text"
              value={formData.lastName}
              onChange={handleChange}
              className="border p-2 rounded"
              placeholder="Último nome"
              required
            />
          </label>
        </div>

        <label htmlFor="birthDate" className="flex flex-col">
          Data de Nascimento:
          <input
            id="birthDate"
            name="birthDate"
            type="date"
            value={formData.birthDate}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
        </label>

        <label htmlFor="phone" className="flex flex-col">
          Telefone:
          <input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            className="border p-2 rounded"
            placeholder="Seu telefone"
            required
          />
        </label>

        <label htmlFor="address" className="flex flex-col">
          Endereço:
          <input
            id="address"
            name="address"
            type="text"
            value={formData.address}
            onChange={handleChange}
            className="border p-2 rounded"
            placeholder="Seu endereço"
            required
          />
        </label>

        <label htmlFor="city" className="flex flex-col">
          Cidade:
          <input
            id="city"
            name="city"
            type="text"
            value={formData.city}
            onChange={handleChange}
            className="border p-2 rounded"
            placeholder="Sua cidade"
            required
          />
        </label>

        <label htmlFor="state" className="flex flex-col">
          País:
          <input
            id="state"
            name="state"
            type="text"
            value={formData.state}
            onChange={handleChange}
            className="border p-2 rounded"
            placeholder="País"
            required
          />
        </label>

        <button
          type="submit"
          className="bg-orange-500 hover:bg-orange-600 text-white p-2 rounded transition"
        >
          Salvar
        </button>
      </form>
    </div>
  );
};

export default PersonalInformation;
