'use client';

import React, { useEffect, useState } from 'react';
import { FiArrowLeft, FiPackage, FiCalendar, FiMapPin, FiDollarSign } from 'react-icons/fi';
import axios from 'axios';

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

type Product = {
  id: string;
  name: string;
  description: string;
  stock: number;
  category: string;
  price: number;
  imgUrl: string;
  createdAt: string;
  createdBy: {
    id: string;
    name: string;
    email: string;
  };
};

interface DetalhesPedidoProps {
  pedido: Pedido;
  onVoltar: () => void;
}

const DetalhesPedido: React.FC<DetalhesPedidoProps> = ({ pedido, onVoltar }) => {
  const [produtos, setProdutos] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarProdutos();
  }, []);

  const carregarProdutos = async () => {
    try {
      setLoading(true);
      const resposta = await axios.get('http://localhost:8080/products');
      setProdutos(resposta.data);
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
      setProdutos([]);
    } finally {
      setLoading(false);
    }
  };

  const obterProduto = (productId: string) => {
    return produtos.find(produto => produto.id === productId);
  };

  const formatarData = (data: string) => {
    const date = new Date(data);
    return date.toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
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

  return (
    <main className="flex-1 p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={onVoltar}
          className="inline-flex items-center text-red-600 hover:text-red-800 font-medium mb-4 transition-colors"
        >
          <FiArrowLeft className="mr-2 h-5 w-5" />
          Voltar para lista de pedidos
        </button>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Detalhes do Pedido
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center space-x-3">
              <div className="bg-red-100 p-2 rounded-lg">
                <FiPackage className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">ID do Pedido</p>
                <p className="font-semibold text-gray-800">{pedido.id.substring(0, 8)}...</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <FiCalendar className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Data do Pedido</p>
                <p className="font-semibold text-gray-800">{formatarData(pedido.orderDate)}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="bg-green-100 p-2 rounded-lg">
                <FiMapPin className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Região</p>
                <p className="font-semibold text-gray-800">{pedido.region}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="bg-yellow-100 p-2 rounded-lg">
                <FiDollarSign className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Valor Total</p>
                <p className="font-semibold text-gray-800">{formatarMoeda(pedido.totalValue)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Items do Pedido */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">
            Items do Pedido ({pedido.items.length})
          </h2>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
          </div>
        ) : (
          <div className="p-6">
            <div className="space-y-4">
              {pedido.items.map((item) => {
                const produto = obterProduto(item.productId);
                
                return (
                  <div
                    key={item.id}
                    className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
                      {/* Imagem do Produto */}
                      <div className="lg:col-span-2">
                        {produto?.imgUrl ? (
                          <img
                            src={produto.imgUrl}
                            alt={produto.name}
                            className="w-16 h-16 object-cover rounded-lg"
                            onError={(e) => {
                              e.currentTarget.src = '/placeholder-product.png';
                            }}
                          />
                        ) : (
                          <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                            <FiPackage className="h-8 w-8 text-gray-400" />
                          </div>
                        )}
                      </div>

                      {/* Informações do Produto */}
                      <div className="lg:col-span-6">
                        <h3 className="font-semibold text-gray-800 mb-1">
                          {produto?.name || 'Produto não encontrado'}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          {produto?.description || 'Descrição não disponível'}
                        </p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span>ID do Produto: {item.productId.substring(0, 8)}...</span>
                          {produto?.category && (
                            <span className="bg-gray-100 px-2 py-1 rounded">
                              {produto.category}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Quantidade */}
                      <div className="lg:col-span-2 text-center">
                        <p className="text-sm text-gray-500">Quantidade</p>
                        <p className="font-semibold text-gray-800 text-lg">{item.quantity}</p>
                      </div>

                      {/* Preço Unitário */}
                      <div className="lg:col-span-2 text-right">
                        <p className="text-sm text-gray-500">Preço Unit.</p>
                        <p className="font-semibold text-gray-800">
                          {produto ? formatarMoeda(produto.price) : 'N/A'}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">Subtotal</p>
                        <p className="font-bold text-red-600 text-lg">
                          {formatarMoeda(item.subtotal)}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Resumo do Pedido */}
            <div className="mt-8 border-t border-gray-200 pt-6">
              <div className="flex justify-end">
                <div className="w-full max-w-sm">
                  <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Subtotal ({pedido.items.length} items):</span>
                      <span className="font-medium">
                        {formatarMoeda(pedido.items.reduce((total, item) => total + item.subtotal, 0))}
                      </span>
                    </div>
                    <div className="border-t border-gray-200 pt-2">
                      <div className="flex justify-between">
                        <span className="font-semibold text-gray-800">Total:</span>
                        <span className="font-bold text-xl text-red-600">
                          {formatarMoeda(pedido.totalValue)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default DetalhesPedido;