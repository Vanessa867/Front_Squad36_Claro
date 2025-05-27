'use client';

import dynamic from "next/dynamic";
import React, { useEffect, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import axios from 'axios';

type Pedido = {
  nomeCliente: string;
  idProduto: number;
  nomeProduto: string;
  email: string;
  total: number;
  estado: string;
};

const PedidosPage = () => {
  const SideNav = dynamic(() => import('../Dashboard/sidenav'), { ssr: false });
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [busca, setBusca] = useState('');
  const [totalPedidos, setTotalPedidos] = useState(0);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');


  const itensPorPagina = 9;
  const baseUrl = 'http://localhost:8080/orders';

 
  const carregarPedidos = async (page: number, query: string) => {
  setLoading(true);
  try {
    const resposta = await axios.get(baseUrl, {
      params: {
        page: page - 1,
        size: itensPorPagina,
        busca: query,
      },
    });

    setPedidos(resposta.data.content);
    setTotalPedidos(resposta.data.total);
  } catch (error) {
 
    console.error('Erro ao carregar pedidos', error);
    
    setPedidos([]);
    setTotalPedidos(0);
  } finally {
    setLoading(false);
  }
};

 
  useEffect(() => {
    carregarPedidos(paginaAtual, busca);
  }, [paginaAtual, busca]);


  const handleBuscaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBusca(e.target.value);
    setPaginaAtual(1);
  };

  const totalPaginas = Math.ceil(totalPedidos / itensPorPagina);

  return (
    <div className="flex min-h-screen bg-white">
      <SideNav />
      <main className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
          <h1 className="text-xl font-bold">Listar Pedidos</h1>
          <span className="text-gray-700 font-medium">João Silva</span>
        </div>

        <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
          <h2 className="text-lg font-semibold">Todos os pedidos</h2>
          <div className="relative w-full md:w-[360px]">
            <input
              type="text"
              placeholder="Pesquisar"
              value={busca}
              onChange={handleBuscaChange}
              className="w-full border border-gray-300 rounded-md py-2 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-red-700"
            />
            <FiSearch className="absolute left-3 top-2.5 text-gray-500" />
          </div>
        </div>

        {loading && <p className="py-4 text-center">Carregando pedidos...</p>}
        {erro && <p className="py-4 text-center text-red-600">{erro}</p>}

        {!loading && !erro && (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead>
                  <tr className="text-red-800 font-semibold text-sm text-left border-b border-gray-200">
                    <th className="px-4 py-3">Nome do Cliente</th>
                    <th className="px-4 py-3">ID Produto</th>
                    <th className="px-4 py-3">Nome do Produto</th>
                    <th className="px-4 py-3">E-mail</th>
                    <th className="px-4 py-3">Total</th>
                    <th className="px-4 py-3">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {pedidos.length > 0 ? (
                    pedidos.map((pedido, idx) => (
                      <tr
                        key={idx}
                        className="text-sm border-b border-gray-200 hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-4 py-4">{pedido.nomeCliente}</td>
                        <td className="px-4 py-4">{pedido.idProduto}</td>
                        <td className="px-4 py-4">{pedido.nomeProduto}</td>
                        <td className="px-4 py-4">{pedido.email}</td>
                        <td className="px-4 py-4">
                          {pedido.total.toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                          })}
                        </td>
                        <td className="px-4 py-4">{pedido.estado}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={6}
                        className="text-center py-4 text-gray-500 italic"
                      >
                        Nenhum pedido encontrado.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

           <div className="flex justify-between items-center mt-6">

  <div className="flex justify-center space-x-1 flex-1 max-w-[300px] mx-auto">
    <button
      onClick={() => setPaginaAtual((p) => Math.max(p - 1, 1))}
      disabled={paginaAtual === 1}
      className="px-3 py-1 rounded bg-gray-100 text-red-800 hover:bg-red-800 hover:text-white disabled:opacity-50 transition-colors"
    >
      {'<'}
    </button>

      {Array.from({ length: totalPaginas }, (_, i) => (
      <button
      key={i}
        onClick={() => setPaginaAtual(i + 1)}
       className={`px-3 py-1 rounded ${
        paginaAtual === i + 1
        ? 'bg-red-800 text-white'
        : 'bg-gray-100 text-red-800 hover:bg-gray-100'
}`}
      >
        {i + 1}
      </button>
                ))}

                    <button
      onClick={() => setPaginaAtual((p) => Math.min(p + 1, totalPaginas))}
      disabled={paginaAtual === totalPaginas}
      className="px-3 py-1 rounded bg-gray-100 text-red-800 hover:bg-red-800 hover:text-white disabled:opacity-50 transition-colors"
    >
      {'>'}
    </button>
              </div>

              <span className="text-gray-700 text-sm">
                Página {paginaAtual} de {totalPaginas}
              </span>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default PedidosPage;
