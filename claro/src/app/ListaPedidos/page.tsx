'use client'

import { useEffect, useState } from "react";

interface Pedido {
  id: number;
  cliente: string;
  nomeProduto: string;
  email: string;
  total: number;
  estado: string;
}

export default function Pedidos() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [itensPorPagina] = useState(10);
  const [busca, setBusca] = useState("");

  useEffect(() => {
    async function fetchPedidos() {
      try {
        const res = await fetch("http://localhost:8080/orders");
        if (!res.ok) throw new Error("Erro ao buscar pedidos");
        const data = await res.json();
        setPedidos(data);
      } catch (error) {
        console.error("Erro ao buscar pedidos:", error);
      }
    }

    fetchPedidos();
  }, []);

  const pedidosFiltrados = pedidos.filter((pedido) =>
    pedido.cliente.toLowerCase().includes(busca.toLowerCase())
  );

  const indexInicio = (paginaAtual - 1) * itensPorPagina;
  const indexFim = indexInicio + itensPorPagina;
  const pedidosPaginados = pedidosFiltrados.slice(indexInicio, indexFim);
  const totalPaginas = Math.ceil(pedidosFiltrados.length / itensPorPagina);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Todos os Pedidos</h1>

      <input
        type="text"
        placeholder="Pesquisar por nome do cliente"
        className="border p-2 rounded mb-4 w-full max-w-md"
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
      />

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Cliente</th>
              <th className="p-3 text-left">Produto</th>
              <th className="p-3 text-left">E-mail</th>
              <th className="p-3 text-left">Total</th>
              <th className="p-3 text-left">Estado</th>
            </tr>
          </thead>
          <tbody>
            {pedidosPaginados.map((pedido) => (
              <tr key={pedido.id} className="border-t hover:bg-gray-50">
                <td className="p-3">{pedido.id}</td>
                <td className="p-3">{pedido.cliente}</td>
                <td className="p-3">{pedido.nomeProduto}</td>
                <td className="p-3">{pedido.email}</td>
                <td className="p-3">R$ {pedido.total.toFixed(2)}</td>
                <td className="p-3">{pedido.estado}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center gap-2 mt-6">
        {Array.from({ length: totalPaginas }, (_, i) => (
          <button
            key={i}
            onClick={() => setPaginaAtual(i + 1)}
            className={`px-4 py-2 rounded ${
              paginaAtual === i + 1 ? "bg-red-600 text-white" : "bg-gray-200"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
