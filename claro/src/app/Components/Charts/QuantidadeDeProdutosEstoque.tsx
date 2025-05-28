'use client';

import React, { useEffect, useState } from 'react';

const QuantidadeDeProdutosEstoque: React.FC = () => {
  const [QuantidadeEstoque, setQuantidadeEstoque] = useState<number | null>(null);

  useEffect(() => {
    async function fetchQuantidadeEstoque() {
      const response = await fetch('/api/QuantidadeEstoque'); // ou URL real
      const data = await response.json();
      setQuantidadeEstoque(data.total);
    }
    fetchQuantidadeEstoque();
  }, []);

  return (
    <div className="bg-white rounded-xl shadow p-4">
      <p className="text-sm text-gray-500">Faturamento total</p>
      <h2 className="text-2xl font-semibold">
        {QuantidadeEstoque !== null ? `R$ ${QuantidadeEstoque.toLocaleString()}` : 'Carregando...'}
      </h2>
    </div>
  );
};

export default QuantidadeDeProdutosEstoque;
