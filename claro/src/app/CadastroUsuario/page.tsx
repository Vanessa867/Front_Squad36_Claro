'use client';

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export default function CadastrarUsuario() {
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [tipoUsuario, setTipoUsuario] = useState('admin');

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [cargo, setCargo] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');

  const handleCadastro = async () => {
    const usuario = {
      name: nome,
      email,
      password: senha,
      cargo,
      cidade,
      estado,
      role: tipoUsuario.toUpperCase(), // Enviar como ADMINISTRADOR ou COMUM
    };

    try {
      const response = await fetch('http://localhost:8080/customer/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(usuario),
      });

      if (response.ok) {
        alert('Usuário cadastrado com sucesso!');
        // Limpa os campos
        setNome('');
        setEmail('');
        setSenha('');
        setCargo('');
        setCidade('');
        setEstado('');
        setTipoUsuario('admin');
      } else {
        const erro = await response.text();
        alert('Erro ao cadastrar usuário: ' + erro);
      }
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      alert('Erro na comunicação com o servidor.');
    }
  };

  return (
    <main className="min-h-screen bg-white px-6 py-8">
      <h1 className="text-xl font-semibold mb-6 text-black">Cadastrar Usuários</h1>

      {/* Tipo de Usuário */}
      <section className="bg-white border border-gray-300 rounded-xl p-6 mb-8 shadow-sm">
        <h2 className="font-medium mb-4 text-black">Tipo de Usuário</h2>
        <div className="flex gap-8">
          <label className="flex items-center gap-2 text-black">
            <input
              type="radio"
              name="tipoUsuario"
              value="admin"
              checked={tipoUsuario === 'admin'}
              onChange={() => setTipoUsuario('admin')}
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

      {/* Campos do Formulário */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-sm font-medium mb-1 text-black">Nome</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 text-sm text-black shadow-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-black">E-mail</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 text-sm text-black shadow-sm"
          />
        </div>

        <div className="relative">
          <label className="block text-sm font-medium mb-1 text-black">Senha</label>
          <input
            type={mostrarSenha ? 'text' : 'password'}
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 pr-10 text-sm text-black shadow-sm"
          />
          <button
            type="button"
            className="absolute right-3 top-[38px] text-gray-500"
            onClick={() => setMostrarSenha(!mostrarSenha)}
          >
            {mostrarSenha ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-black">Cargo</label>
          <input
            type="text"
            value={cargo}
            onChange={(e) => setCargo(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 text-sm text-black shadow-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-black">Cidade</label>
          <input
            type="text"
            value={cidade}
            onChange={(e) => setCidade(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 text-sm text-black shadow-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-black">Estado</label>
          <input
            type="text"
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 text-sm text-black shadow-sm"
          />
        </div>
      </section>

      <div className="flex justify-center">
        <button
          onClick={handleCadastro}
          className="bg-red-900 text-white px-8 py-2 rounded-lg hover:bg-red-800 transition"
        >
          Cadastrar
        </button>
      </div>
    </main>
  );
}
