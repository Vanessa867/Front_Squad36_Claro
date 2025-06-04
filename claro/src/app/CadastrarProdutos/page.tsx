'use client';

import { useState } from "react";
import SideNav from "@/app/Dashboard/sidenav";
import { jwtDecode } from "jwt-decode";

export default function CadastrarProduto() {
  const [form, setForm] = useState({
    name: '',
    description: '',
    stock: '',
    category: '',
    price: '',
    imageUrl: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  type JwtPayload = {
    sub: string;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      alert('Usuário não autenticado');
      return;
    }

    const decoded = jwtDecode<JwtPayload>(token);
    const email = decoded.sub;
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    try {
      const customerResponse = await fetch(`${apiUrl}/customer/email/${email}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!customerResponse.ok) {
        console.error("Erro ao buscar usuário:", await customerResponse.text());
        alert("Não foi possível buscar informações do usuário.");
        return;
      }

      const customerData = await customerResponse.json();
      const createdBy = customerData.id;

      const produto = {
        name: form.name,
        description: form.description,
        stock: parseInt(form.stock),
        category: form.category,
        price: parseFloat(form.price),
        imgUrl: form.imageUrl,
        createdBy,
      };

      const response = await fetch(`${apiUrl}/products/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(produto),
      });

      if (response.ok) {
        alert("Produto cadastrado com sucesso!");
        setForm({
          name: '',
          description: '',
          stock: '',
          category: '',
          price: '',
          imageUrl: '',
        });
      } else {
        console.error(await response.text());
        alert("Erro ao cadastrar produto.");
      }
    } catch (err) {
      console.error(err);
      alert("Erro de conexão com o servidor.");
    }
  };

  return (
    <div className="flex min-h-screen">
      <SideNav />

      <div className="flex-1 p-8 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Cadastrar Produtos</h1>

        <div className="max-w-5xl mx-auto">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-lg shadow">
            <div className="space-y-4 col-span-2">
              <h2 className="text-lg font-semibold text-gray-700">Informações do Produto</h2>

              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                type="text"
                placeholder="Nome"
                className="w-full p-2 border border-gray-300 rounded text-black"
                required
              />
              <input
                name="stock"
                value={form.stock}
                onChange={handleChange}
                type="number"
                placeholder="Estoque"
                className="w-full p-2 border border-gray-300 rounded text-black"
                required
                min={0}
              />
              <input
                name="price"
                value={form.price}
                onChange={handleChange}
                type="number"
                step="0.01"
                placeholder="Preço"
                className="w-full p-2 border border-gray-300 rounded text-black"
                required
                min={0.01}
              />
              <input
                name="imageUrl"
                value={form.imageUrl}
                onChange={handleChange}
                type="text"
                placeholder="URL da Imagem"
                className="w-full p-2 border border-gray-300 rounded text-black"
                required
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded text-gray-700 text-black"
                  required
                >
                  <option value="">Selecione uma opção</option>
                  <option value="eletronicos">Eletrônicos</option>
                  <option value="acessorios">Acessórios</option>
                  <option value="smartphones">Smartphones</option>
                </select>
              </div>

              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Descrição"
                className="w-full p-2 border border-gray-300 rounded min-h-[100px] text-black"
                required
              />

              <button
                type="submit"
                className="w-full bg-red-700 hover:bg-red-800 text-white py-2 rounded font-medium"
              >
                Cadastrar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
