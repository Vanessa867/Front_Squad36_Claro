'use client';

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export default function CadastrarUsuario() {
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [tipoUsuario, setTipoUsuario] = useState('administrador');

  return (
    <main className="min-h-screen bg-white px-6 py-8">
      <h1 className="text-xl font-semibold mb-6 text-black">Cadastrar Usuários</h1>

      <section className="bg-white border border-gray-300 rounded-xl p-6 mb-8 shadow-sm">
        <h2 className="font-medium mb-4 text-black">Tipo de Usuário</h2>
        <div className="flex gap-8">
          <label className="flex items-center gap-2 text-black">
            <input
              type="radio"
              name="tipoUsuario"
              value="administrador"
              checked={tipoUsuario === 'administrador'}
              onChange={() => setTipoUsuario('administrador')}
              className="accent-red-800"
            />
            Usuário Administrador
          </label>
          <label className="flex items-center gap-2 text-black">
            <input
              type="radio"
              name="tipoUsuario"
              value="comum"
              checked={tipoUsuario === 'comum'}
              onChange={() => setTipoUsuario('comum')}
              className="accent-red-800"
            />
            Usuário Comum
          </label>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Nome */}
        <div>
          <label className="block text-sm font-medium mb-1 text-black">Nome</label>
          <input
            type="text"
            placeholder=""
            className="w-full border border-gray-300 rounded-lg p-3 text-sm placeholder-gray-400 text-black shadow-sm"
          />
        </div>

        {/* E-mail */}
        <div>
          <label className="block text-sm font-medium mb-1 text-black">E-mail</label>
          <input
            type="email"
            placeholder="info@gmail.com"
            className="w-full border border-gray-300 rounded-lg p-3 text-sm placeholder-gray-400 text-black shadow-sm"
          />
        </div>

        {/* Senha */}
        <div className="relative">
          <label className="block text-sm font-medium mb-1 text-black">Senha</label>
          <input
            type={mostrarSenha ? 'text' : 'password'}
            placeholder=""
            className="w-full border border-gray-300 rounded-lg p-3 pr-10 text-sm placeholder-gray-400 text-black shadow-sm"
          />
          <button
            type="button"
            className="absolute right-3 top-[38px] text-gray-500"
            onClick={() => setMostrarSenha(!mostrarSenha)}
          >
            {mostrarSenha ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {/* Cargo */}
        <div>
          <label className="block text-sm font-medium mb-1 text-black">Cargo</label>
          <input
            type="text"
            placeholder="Analista de Sistemas"
            className="w-full border border-gray-300 rounded-lg p-3 text-sm placeholder-gray-400 text-black shadow-sm"
          />
        </div>

        {/* Cidade */}
        <div>
          <label className="block text-sm font-medium mb-1 text-black">Cidade</label>
          <input
            type="text"
            placeholder="Recife"
            className="w-full border border-gray-300 rounded-lg p-3 text-sm placeholder-gray-400 text-black shadow-sm"
          />
        </div>

        {/* Estado */}
        <div>
          <label className="block text-sm font-medium mb-1 text-black">Estado</label>
          <input
            type="text"
            placeholder="Pernambuco"
            className="w-full border border-gray-300 rounded-lg p-3 text-sm placeholder-gray-400 text-black shadow-sm"
          />
        </div>
      </section>

      <div className="flex justify-center">
        <button className="bg-red-900 text-white px-8 py-2 rounded-lg hover:bg-red-800 transition">
          Cadastrar
        </button>
      </div>
    </main>
  );
}
