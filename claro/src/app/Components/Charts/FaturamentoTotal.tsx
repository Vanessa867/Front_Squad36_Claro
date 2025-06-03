'use client';

import React, { useEffect, useState } from 'react';

const FaturamentoTotal: React.FC = () => {
  const [faturamento, setFaturamento] = useState<number | null>(null);

  useEffect(() => {
    async function fetchFaturamento() {
      const response = await fetch('http://localhost:8080/orders');
      const data = await response.json();
      // Soma todos os totalValue dos pedidos
      const total = data.content.reduce(
        (acc: number, order: any) => acc + (order.totalValue || 0),
        0
      );
      setFaturamento(total);
    }
    fetchFaturamento();
  }, []);

  return (
    <div className="bg-white rounded-xl shadow p-4">
      <p className="text-sm text-gray-500">Faturamento total</p>
      <h2 className="text-2xl font-semibold">
        {faturamento !== null ? `R$ ${faturamento.toLocaleString()}` : 'Carregando...'}
      </h2>
    </div>
  );
};

export default FaturamentoTotal;
