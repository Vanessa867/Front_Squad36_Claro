'use client';

import { useState } from "react";
import SideNav from "@/app/Dashboard/sidenav";

export default function CadastrarProduto() {
  const [imagem, setImagem] = useState<File | null>(null);

  const handleImagemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImagem(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Produto cadastrado");
  };

  return (
    <div className="flex">
      <SideNav />

      <main className="flex-1 p-6">
        <h1 className="text-2xl font-semibold mb-6">Cadastrar Produtos</h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Coluna 1: Informações do Produto */}
          <div className="md:col-span-2 space-y-4 border p-4 rounded-md">
            <h2 className="text-lg font-medium">Informações do Produto</h2>

            <input type="text" placeholder="Nome" className="w-full p-2 border rounded" />
            <input type="text" placeholder="ID do produto" className="w-full p-2 border rounded" />
            <input type="text" placeholder="Loja" className="w-full p-2 border rounded" />
            <input type="text" placeholder="Preço" className="w-full p-2 border rounded" />

            <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
            <select className="w-full p-2 border rounded text-gray-500">
              <option value="">Selecione uma opção</option>
              <option value="eletronicos">Eletrônicos</option>
              <option value="Acessorios">Acessorios</option>
              <option value="smartphones">Smartphones</option>
            </select>

            <textarea placeholder="Descrição" className="w-full p-2 border rounded min-h-[100px]" />
          </div>

          {/* Coluna 2: Upload de Imagem */}
          <div className="space-y-4 border p-4 rounded-md">
            <h2 className="text-lg font-medium">Adicionar imagem</h2>

            <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded cursor-pointer hover:bg-gray-50 text-gray-500">
              <input type="file" accept="image/*" className="hidden" onChange={handleImagemChange} />
              <span>📤</span>
              <p>Adicione a imagem aqui</p>
              <small>Formato PNG, JPG, WebP, SVG</small>
            </label>

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
