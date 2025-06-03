'use client';

import React, { useEffect, useState } from 'react';

const QuantidadeDeProdutosEstoque: React.FC = () => {
  const [QuantidadeEstoque, setQuantidadeEstoque] = useState<number | null>(null);

  useEffect(() => {
    async function fetchQuantidadeEstoque() {
      const response = await fetch('http://localhost:8080/products');
      const data = await response.json();
      // Soma todos os estoques dos produtos
      const total = data.reduce(
        (acc: number, produto: any) => acc + (produto.stock || 0),
        0
      );
      setQuantidadeEstoque(total);
    }
    fetchQuantidadeEstoque();
  }, []);


  return (
    <div className="bg-white rounded-xl shadow p-4">
      <p className="text-sm text-gray-500">Quantidade de produto em estoque</p>
      <h2 className="text-2xl font-semibold">
        {QuantidadeEstoque !== null ? `${QuantidadeEstoque.toLocaleString()}` : 'Carregando...'}
      </h2>
    </div>
  );
};

export default QuantidadeDeProdutosEstoque;
