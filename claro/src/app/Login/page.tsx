'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !senha) {
      setErrorMessage('Por favor, preencha todos os campos.')
      return
    }

    const apiUrl = process.env.NEXT_PUBLIC_API_URL

    try {
      const response = await fetch(`${apiUrl}/customer/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: senha,
        }),
      })

      if (!response.ok) {
        throw new Error('Falha ao autenticar.')
      }

      const data = await response.json()

      localStorage.setItem('token', data.token)
      localStorage.setItem('email', data.email)

      setSuccessMessage('Login realizado com sucesso!')
      setErrorMessage('')

      // Redireciona após 2 segundos
      setTimeout(() => {
        router.push('/Dashboard')
      }, 2000)
    } catch (error) {
      setErrorMessage('E-mail ou senha inválidos.')
      setSuccessMessage('')
    }
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

          {/* Mensagens de erro ou sucesso */}
          {errorMessage && (
            <div className="bg-[#7D0000] text-white p-2 rounded mb-4">{errorMessage}</div>
          )}
          {successMessage && (
            <div className="bg-green-500 text-white p-2 rounded mb-4">
              {successMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col">
              <label htmlFor="email" className="text-sm font-medium text-gray-600 mb-1">E-mail</label>
              <input
                id="email"
                type="email"
                placeholder="Insira seu e-mail"
                className="border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7D0000] bg-white text-gray-900 text-base shadow-sm"
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
                className="border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7D0000] bg-white text-gray-900 text-base shadow-sm"
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
        </div>
      </div>
    </div>
  )
}
