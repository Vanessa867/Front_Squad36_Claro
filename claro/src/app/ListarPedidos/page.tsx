'use client';

import dynamic from "next/dynamic";
import React, { useEffect, useState, useCallback } from 'react';
import { FiSearch, FiEye } from 'react-icons/fi';
import axios from 'axios';
import DetalhesPedido from './DetalhesPedido';

type OrderItem = {
  id: string;
  productId: string;
  quantity: number;
  subtotal: number;
};

type Pedido = {
  id: string;
  userId: string;
  region: string;
  orderDate: string;
  totalValue: number;
  items: OrderItem[];
};

type Customer = {
  id: string;
  name: string;
  email: string;
};

type PaginatedResponse = {
  content: Pedido[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      empty: boolean;
      unsorted: boolean;
      sorted: boolean;
    };
    offset: number;
    unpaged: boolean;
    paged: boolean;
  };
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    unsorted: boolean;
    sorted: boolean;
  };
  first: boolean;
  numberOfElements: number;
  empty: boolean;
};

const PedidosPage = () => {
  const SideNav = dynamic(() => import('../Dashboard/sidenav'), { ssr: false });
  const [todosOsPedidos, setTodosOsPedidos] = useState<Pedido[]>([]);
  const [pedidosFiltrados, setPedidosFiltrados] = useState<Pedido[]>([]);
  const [pedidosExibidos, setPedidosExibidos] = useState<Pedido[]>([]);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [busca, setBusca] = useState('');
  const [buscaDebounced, setBuscaDebounced] = useState('');
  const [loading, setLoading] = useState(false);
  const [totalPaginas, setTotalPaginas] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [pedidoSelecionado, setPedidoSelecionado] = useState<Pedido | null>(null);
  const [mostrarDetalhes, setMostrarDetalhes] = useState(false);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loadingCustomers, setLoadingCustomers] = useState(false);

  const itensPorPagina = 10;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  const baseUrl = `${apiUrl}/orders`
  const customersUrl = `${apiUrl}/customer/`;


  useEffect(() => {
    const timer = setTimeout(() => {
      setBuscaDebounced(busca);
      setPaginaAtual(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [busca]);


  const carregarCustomers = useCallback(async () => {
    setLoadingCustomers(true);
    try {
      const resposta = await axios.get(customersUrl, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
      console.log('Customers carregados:', resposta.data);

      if (Array.isArray(resposta.data)) {
        setCustomers(resposta.data);
      } else if (resposta.data.content && Array.isArray(resposta.data.content)) {
        setCustomers(resposta.data.content);
      } else {
        console.error('Estrutura de resposta de customers inesperada:', resposta.data);
        setCustomers([]);
      }
    } catch (error) {
      console.error('Erro ao carregar customers:', error);
      setCustomers([]);
    } finally {
      setLoadingCustomers(false);
    }
  }, []);


  useEffect(() => {
    carregarCustomers();
  }, [carregarCustomers]);


  const buscarCustomer = useCallback((userId: string): Customer | null => {
    return customers.find(customer => customer.id === userId) || null;
  }, [customers]);


  const carregarTodosOsPedidos = useCallback(async () => {
    setLoading(true);
    try {
      const params = {
        page: 0,
        size: 1000,
      };

      console.log('Carregando todos os pedidos...');

      const resposta = await axios.get<PaginatedResponse>(baseUrl, { params, headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });

      console.log('Resposta da API:', resposta.data);

      const data = resposta.data;

      if (data && Array.isArray(data.content)) {
        setTodosOsPedidos(data.content);
        console.log(`✅ Carregados ${data.content.length} pedidos`);
      } else {
        console.error('Estrutura de resposta inesperada:', data);
        setTodosOsPedidos([]);
      }
    } catch (error) {
      console.error('Erro ao carregar pedidos:', error);
      setTodosOsPedidos([]);
    } finally {
      setLoading(false);
    }
  }, []);


  useEffect(() => {
    carregarTodosOsPedidos();
  }, [carregarTodosOsPedidos]);

  const filtrarPedidos = useCallback((pedidos: Pedido[], termoBusca: string) => {
    if (!termoBusca.trim()) {
      return pedidos;
    }

    const termo = termoBusca.toLowerCase().trim();

    return pedidos.filter(pedido => {
      const customer = buscarCustomer(pedido.userId);

      const buscaId = pedido.id.toLowerCase().includes(termo);
      const buscaRegiao = pedido.region.toLowerCase().includes(termo);
      const buscaData = pedido.orderDate.toLowerCase().includes(termo);
      const buscaValor = pedido.totalValue.toString().includes(termo);
      const buscaEmail = customer?.email?.toLowerCase().includes(termo) || false;


      return buscaId || buscaRegiao || buscaData || buscaValor || buscaEmail;
    });
  }, [buscarCustomer]);


  useEffect(() => {
    const pedidosParaExibir = filtrarPedidos(todosOsPedidos, buscaDebounced);
    setPedidosFiltrados(pedidosParaExibir);
    setTotalItems(pedidosParaExibir.length);
    setTotalPaginas(Math.ceil(pedidosParaExibir.length / itensPorPagina));

    console.log(`Filtro aplicado: "${buscaDebounced}" retornou ${pedidosParaExibir.length} de ${todosOsPedidos.length} pedidos`);
  }, [todosOsPedidos, buscaDebounced, filtrarPedidos]);


  useEffect(() => {
    const inicio = (paginaAtual - 1) * itensPorPagina;
    const fim = inicio + itensPorPagina;
    const pedidosPaginados = pedidosFiltrados.slice(inicio, fim);
    setPedidosExibidos(pedidosPaginados);

    console.log(`📄 Página ${paginaAtual}: mostrando ${pedidosPaginados.length} pedidos (${inicio + 1}-${Math.min(fim, pedidosFiltrados.length)} de ${pedidosFiltrados.length})`);
  }, [pedidosFiltrados, paginaAtual]);

  const handleBuscaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBusca(e.target.value);
  };

  const limparBusca = () => {
    setBusca('');
    setBuscaDebounced('');
    setPaginaAtual(1);
  };

  const formatarData = (data: string) => {
    const date = new Date(data);
    return date.toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatarMoeda = (valor: number) => {
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  const abrirDetalhes = (pedido: Pedido) => {
    setPedidoSelecionado(pedido);
    setMostrarDetalhes(true);
  };

  const fecharDetalhes = () => {
    setMostrarDetalhes(false);
    setPedidoSelecionado(null);
  };

  const temProximaPagina = paginaAtual < totalPaginas;
  const temPaginaAnterior = paginaAtual > 1;

  const paginaAnterior = () => {
    if (temPaginaAnterior) {
      setPaginaAtual((prev) => prev - 1);
    }
  };

  const proximaPagina = () => {
    if (temProximaPagina) {
      setPaginaAtual((prev) => prev + 1);
    }
  };

  const irParaPagina = (numeroPagina: number) => {
    if (numeroPagina >= 1 && numeroPagina <= totalPaginas) {
      setPaginaAtual(numeroPagina);
    }
  };

  const gerarNumerosPaginas = () => {
    const paginas = [];
    const inicio = Math.max(1, paginaAtual - 2);
    const fim = Math.min(totalPaginas, paginaAtual + 2);

    for (let i = inicio; i <= fim; i++) {
      paginas.push(i);
    }
    return paginas;
  };

  if (mostrarDetalhes && pedidoSelecionado) {
    return (
      <div className="flex min-h-screen bg-white">
        <SideNav />
        <DetalhesPedido
          pedido={pedidoSelecionado}
          onVoltar={fecharDetalhes}
        />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-white">
      <SideNav />
      <main className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
          <h1 className="text-2xl font-bold text-gray-800">Listar Pedidos</h1>
          <span className="text-gray-700 font-medium">João Silva</span> {/* Aqui pode ser introduzido o usuário logado */}
        </div>

        <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
          <h2 className="text-lg font-semibold text-gray-700">
            Todos os pedidos
            {todosOsPedidos.length > 0 && (
              <span className="ml-2 text-sm font-normal text-gray-500">
                ({totalItems} {buscaDebounced ? 'filtrados' : 'total'} de {todosOsPedidos.length})
              </span>
            )}
          </h2>
          <div className="relative w-full md:w-[360px]">
            <input
              type="text"
              placeholder="Pesquisar por ID, email, nome, região..."
              value={busca}
              onChange={handleBuscaChange}
              className="w-full border border-gray-300 rounded-lg py-3 pl-12 pr-10 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm"
            />
            <FiSearch className="absolute left-4 top-3.5 text-gray-400 h-5 w-5" />
            {busca && (
              <button
                onClick={limparBusca}
                className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600 transition-colors"
                title="Limpar busca"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {buscaDebounced && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-700">
              🔍 Filtro ativo: <strong>"{buscaDebounced}"</strong>
              <span className="ml-2 text-green-600">
                ({totalItems} resultado{totalItems !== 1 ? 's' : ''} encontrado{totalItems !== 1 ? 's' : ''})
              </span>
              <button
                onClick={limparBusca}
                className="ml-2 text-green-600 hover:text-green-800 underline transition-colors"
              >
                Limpar filtro
              </button>
            </p>
          </div>
        )}

        {loadingCustomers && (
          <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-700">
              Carregando dados dos usuários...
            </p>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
            <span className="ml-3 text-gray-600">Carregando pedidos...</span>
          </div>
        ) : pedidosExibidos.length === 0 ? (
          <div className="bg-gray-50 rounded-lg p-12 text-center">
            <p className="text-gray-500 text-lg">
              {buscaDebounced ? 'Nenhum pedido encontrado para este filtro.' : 'Nenhum pedido encontrado.'}
            </p>
            {buscaDebounced && (
              <div className="mt-4">
                <p className="text-gray-400 text-sm mb-2">
                  Tente ajustar os termos de busca
                </p>
                <button
                  onClick={limparBusca}
                  className="text-red-600 hover:text-red-800 font-medium transition-colors"
                >
                  Ver todos os pedidos
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        ID do Pedido
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Email do Usuário
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Região
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Data do Pedido
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Items
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Valor Total
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Ações
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {pedidosExibidos.map((pedido) => {
                      const customer = buscarCustomer(pedido.userId);

                      return (
                        <tr key={pedido.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            <span title={pedido.id} className="font-semibold">
                              {pedido.id}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                            {customer ? (
                              <div>
                                <div className="font-medium text-gray-900">
                                  {customer.email}
                                </div>
                              </div>
                            ) : (
                              <div>
                                <div className="text-gray-500 italic">
                                  Email não encontrado
                                </div>
                                <div className="text-xs text-gray-400" title={pedido.userId}>
                                  ID: {pedido.userId.substring(0, 8)}...
                                </div>
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${pedido.region === 'SUL' ? 'bg-blue-100 text-blue-800' :
                              pedido.region === 'NORTE' ? 'bg-green-100 text-green-800' :
                                pedido.region === 'CENTRO-OESTE' ? 'bg-yellow-100 text-yellow-800' :
                                  pedido.region === 'NORDESTE' ? 'bg-purple-100 text-purple-800' :
                                    pedido.region === 'SUDESTE' ? 'bg-indigo-100 text-indigo-800' :
                                      'bg-red-100 text-red-800'
                              }`}>
                              {pedido.region}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                            {formatarData(pedido.orderDate)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                            <button
                              onClick={() => abrirDetalhes(pedido)}
                              className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium bg-red-50 text-red-700 hover:bg-red-100 transition-colors"
                            >
                              {pedido.items.length} item{pedido.items.length !== 1 ? 's' : ''}
                              <FiEye className="ml-1 h-4 w-4" />
                            </button>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                            {formatarMoeda(pedido.totalValue)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                            <button
                              onClick={() => abrirDetalhes(pedido)}
                              className="text-red-600 hover:text-red-800 font-medium transition-colors"
                            >
                              Ver detalhes
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between mt-6 gap-4">
              <div className="text-sm text-gray-700 text-center sm:text-left">
                Mostrando {pedidosExibidos.length} de {totalItems} pedidos
                {buscaDebounced && (
                  <span className="block sm:inline sm:ml-2 text-gray-500">
                    (filtro: "{buscaDebounced}")
                  </span>
                )}
              </div>

              {totalPaginas > 1 && (
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => irParaPagina(1)}
                    disabled={paginaAtual === 1}
                    className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    ««
                  </button>

                  <button
                    onClick={paginaAnterior}
                    disabled={!temPaginaAnterior}
                    className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    ‹
                  </button>

                  {gerarNumerosPaginas().map((numeroPagina) => (
                    <button
                      key={numeroPagina}
                      onClick={() => irParaPagina(numeroPagina)}
                      className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${numeroPagina === paginaAtual
                        ? 'bg-red-600 text-white border border-red-600'
                        : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                        }`}
                    >
                      {numeroPagina}
                    </button>
                  ))}

                  <button
                    onClick={proximaPagina}
                    disabled={!temProximaPagina}
                    className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    ›
                  </button>

                  <button
                    onClick={() => irParaPagina(totalPaginas)}
                    disabled={paginaAtual === totalPaginas}
                    className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    »»
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default PedidosPage;