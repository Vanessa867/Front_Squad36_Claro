'use client'

import { useState } from 'react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [userData, setUserData] = useState<{ email: string; senha: string } | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !senha) {
      setErrorMessage('Por favor, preencha todos os campos.')
      return
    }

    setUserData({ email, senha })
    setErrorMessage('')
  }

  return (
    <div className="min-h-screen flex">
      {/* Lado esquerdo */}
      <div className="w-1/2 bg-[#7D0000] flex items-center justify-center relative">
        <h1 className="text-white text-3xl md:text-4xl font-bold z-10">Ustore</h1>
      </div>

      {/* Lado direito */}
      <div className="w-1/2 flex items-center justify-center bg-white">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
          <h1 className="text-2xl font-bold mb-2 text-gray-800">Login</h1>
          <p className="text-sm text-gray-500 mb-6">
            Insira seu e-mail e senha para acessar sua conta
          </p>

          {errorMessage && (
            <div className="bg-[#7D0000] text-white p-2 rounded mb-4">{errorMessage}</div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col">
              <label htmlFor="email" className="text-sm font-medium text-gray-600 mb-1">E-mail</label>
              <input
                id="email"
                type="email"
                placeholder="Insira seu e-mail"
                className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7D0000]"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="senha" className="text-sm font-medium text-gray-600 mb-1">Senha</label>
              <input
                id="senha"
                type="password"
                placeholder="Digite sua senha"
                className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7D0000]"
                value={senha}
                onChange={e => setSenha(e.target.value)}
                required
              />
              <a href="#" className="text-xs text-right text-gray-600 mt-1 hover:underline">
                Esqueceu sua senha?
              </a>
            </div>

            <button
              type="submit"
              className="bg-[#7D0000] hover:bg-[#660000] text-white font-semibold py-3 rounded-lg transition duration-300"
            >
              Acessar
            </button>
          </form>

          {userData && (
            <div className="mt-6 p-4 bg-green-200 rounded">
              <h2 className="font-bold text-lg">Dados do usuário:</h2>
              <p><strong>E-mail:</strong> {userData.email}</p>
              <p><strong>Senha:</strong> {userData.senha}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
