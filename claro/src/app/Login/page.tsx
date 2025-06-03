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
      <div className="w-1/2 bg-red-600 flex items-center justify-center">
        <img
          src="/images/mobile.png"
          alt="Imagem do Login"
          className="w-[400px] h-auto object-contain"
        />
      </div>

      <div className="w-1/2 flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h1>

          {errorMessage && (
            <div className="bg-red-500 text-white p-2 rounded mb-4">{errorMessage}</div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col">
              <label htmlFor="email" className="text-sm font-medium text-gray-600 mb-2">E-mail</label>
              <input
                id="email"
                type="email"
                placeholder="Digite seu e-mail"
                className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="senha" className="text-sm font-medium text-gray-600 mb-2">Senha</label>
              <input
                id="senha"
                type="password"
                placeholder="Digite sua senha"
                className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={senha}
                onChange={e => setSenha(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition duration-300"
            >
              Entrar
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
