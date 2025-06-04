'use client';

import { useState } from "react";
import SideNav from "@/app/Dashboard/sidenav";
import { jwtDecode } from "jwt-decode";

export default function CadastrarProduto() {
  const [imagem, setImagem] = useState<File | null>(null);
  const [form, setForm] = useState({
    name: '',
    description: '',
    stock: '',
    category: '',
    price: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleImagemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImagem(e.target.files[0]);
    }
  };

  type JwtPayload = {
  sub: string; // ou 'id', depende do token do seu backend
  // outros campos se precisar
};

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const token = localStorage.getItem('token'); // ou onde você guarda o JWT
  if (!token) {
    alert('Usuário não autenticado');
    return;
  }

  const decoded = jwtDecode<JwtPayload>(token);
  const createdBy = decoded.sub; // ou decoded.id dependendo do seu token

  let imgUrl = "";
  if (imagem) {
    // Atenção: Isso cria uma URL local temporária, que o backend não consegue acessar.
    // Você precisa subir a imagem para um serviço e pegar a URL real.
    imgUrl = URL.createObjectURL(imagem); // só para preview, não para envio real
  }

  const produto = {
    name: form.name,
    description: form.description,
    stock: parseInt(form.stock),
    category: form.category,
    price: parseFloat(form.price),
    imgUrl,
    createdBy, // envia só o id (string)
  };

  try {
    const response = await fetch("http://localhost:8080/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, // IMPORTANTE: enviar o token no header
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
        
      });
      setImagem(null);
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
    <div className="flex">
      <SideNav />

      <main className="flex-1 p-6">
        <h1 className="text-2xl font-semibold mb-6">Cadastrar Produtos</h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4 border p-4 rounded-md">
            <h2 className="text-lg font-medium">Informações do Produto</h2>

            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              type="text"
              placeholder="Nome"
              className="w-full p-2 border rounded"
              required
            />
            <input
              name="stock"
              value={form.stock}
              onChange={handleChange}
              type="number"
              placeholder="Estoque"
              className="w-full p-2 border rounded"
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
              className="w-full p-2 border rounded"
              required
              min={0.01}
            />

            <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full p-2 border rounded text-gray-500"
              required
            >
              <option value="">Selecione uma opção</option>
              <option value="eletronicos">Eletrônicos</option>
              <option value="acessorios">Acessórios</option>
              <option value="smartphones">Smartphones</option>
            </select>

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Descrição"
              className="w-full p-2 border rounded min-h-[100px]"
              required
            />
          </div>

          <div className="space-y-4 border p-4 rounded-md">
            <h2 className="text-lg font-medium">Adicionar imagem</h2>

            <label
              className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded cursor-pointer hover:bg-gray-50 text-gray-500"
            >
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImagemChange}
              />
              <span>📤</span>
              <p>Adicione a imagem aqui</p>
              <small>Formato PNG, JPG, WebP, SVG</small>
            </label>

            {imagem && (
              <img
                src={URL.createObjectURL(imagem)}
                alt="Prévia da imagem"
                className="w-full max-h-40 object-contain rounded"
              />
            )}

            <button
              type="submit"
              className="w-full bg-red-700 hover:bg-red-800 text-white py-2 rounded font-medium"
            >
              Cadastrar
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
