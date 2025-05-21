'use client'
import SideNav from '../Dashboard/sidenav';
import React, { useState, useEffect } from 'react';
import { FiSearch } from 'react-icons/fi';

type Pedido = {
  nomeCliente: string;
  idProduto: number;
  nomeProduto: string;
  email: string;
  total: number;
  estado: string;
};

const estados = [
  'Pernambuco', 'Bahia', 'São Paulo', 'Rio de Janeiro', 'Minas Gerais',
  'Paraná', 'Santa Catarina', 'Rio Grande do Sul', 'Goiás', 'Ceará'
];

const pedidosMockados: Pedido[] = Array.from({ length: 50 }, (_, i) => ({
  nomeCliente: `Cliente ${i + 1}`,
  idProduto: 5000 + i,
  nomeProduto: `Produto ${i + 1}`,
  email: `cliente${i + 1}@email.com`,
  total: 100 + i * 10,
  estado: estados[i % estados.length],
}));

const PedidosPage = () => {
  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 9;
  const [busca, setBusca] = useState('');
  const [pedidos, setPedidos] = useState<Pedido[]>(pedidosMockados);


  useEffect(() => {
    // async function fetchPedidos() {
    //   try {
    //     const resposta = await fetch('http://localhost:3000/api/pedidos'); 
    //     const dados = await resposta.json();
    //     setPedidos(dados);
    //   } catch (erro) {
    //     console.error('Erro ao buscar pedidos:', erro);
    //   }
    // }
    // fetchPedidos();
  }, []);
  // 

  const pedidosFiltrados = pedidos.filter((pedido) =>
    Object.values(pedido).some((valor) =>
      valor.toString().toLowerCase().includes(busca.toLowerCase())
    )
  );

  const totalPaginas = Math.ceil(pedidosFiltrados.length / itensPorPagina);

  const pedidosPagina = pedidosFiltrados.slice(
    (paginaAtual - 1) * itensPorPagina,
    paginaAtual * itensPorPagina
  );

  return (
    <div className="flex min-h-screen bg-white">
      <SideNav />
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
          <h1 className="text-xl font-bold">Listar Pedidos</h1>
          <span className="text-gray-700 font-medium">João Silva</span>
        </div>

        <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
          <h2 className="text-lg font-semibold">Todos os pedidos</h2>
          <div className="relative w-full md:w-130">
            <input
              type="text"
              placeholder="Pesquisar"
              value={busca}
              onChange={(e) => {
                setBusca(e.target.value);
                setPaginaAtual(1);
              }}
              className="w-full border border-gray-300 rounded-md py-2 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-red-700"
            />
            <FiSearch className="absolute left-3 top-2.5 text-gray-500" />
          </div>
        </div>

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
              {pedidosPagina.length > 0 ? (
                pedidosPagina.map((pedido, index) => (
                  <tr key={index} className="text-sm border-b border-gray-200">
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
                  <td colSpan={6} className="text-center py-4 text-gray-500">
                    Nenhum pedido encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-6">
          <div></div>
          <div className="flex items-center space-x-1">
            <button
              onClick={() => setPaginaAtual((p) => Math.max(p - 1, 1))}
              disabled={paginaAtual === 1}
              className="px-3 py-1 rounded bg-gray-100 text-red-800 disabled:opacity-50"
            >
              {'<'}
            </button>
            {Array.from({ length: totalPaginas }, (_, i) => (
              <button
                key={i}
                className={`px-3 py-1 rounded ${
                  paginaAtual === i + 1
                    ? 'bg-red-800 text-white'
                    : 'bg-gray-100 text-red-800'
                }`}
                onClick={() => setPaginaAtual(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setPaginaAtual((p) => Math.min(p + 1, totalPaginas))}
              disabled={paginaAtual === totalPaginas}
              className="px-3 py-1 rounded bg-gray-100 text-red-800 disabled:opacity-50"
            >
              {'>'}
            </button>
          </div>
          <span className="text-gray-700 text-sm">
            Mostrando {paginaAtual} página de {totalPaginas}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PedidosPage;
