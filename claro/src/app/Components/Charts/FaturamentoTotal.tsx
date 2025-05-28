'use client';

import React, { useEffect, useState } from 'react';

const FaturamentoTotal: React.FC = () => {
  const [faturamento, setFaturamento] = useState<number | null>(null);

  useEffect(() => {
    async function fetchFaturamento() {
      const response = await fetch('/api/faturamento'); // ou URL real
      const data = await response.json();
      setFaturamento(data.total);
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
