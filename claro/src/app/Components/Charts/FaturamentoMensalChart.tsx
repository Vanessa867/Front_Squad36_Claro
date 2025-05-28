'use client';

import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

interface Props {
  region?: string | null;
}

const mockDataGlobal = {
  labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
  datasets: [
    {
      label: 'Faturamento Global',
      data: [30000, 40000, 35000, 50000, 45000, 60000],
      backgroundColor: '#8b0000',
      borderRadius: 6,
      barThickness: 20,
    },
  ],
};

const mockDataPorRegiao: Record<string, number[]> = {
  Sul: [10000, 15000, 12000, 17000, 14000, 18000],
  Sudeste: [15000, 20000, 18000, 22000, 21000, 25000],
  Nordeste: [5000, 8000, 7000, 11000, 10000, 17000],
  CentroOeste: [4000, 6000, 5000, 7000, 6000, 8000],
  Norte: [3000, 5000, 4000, 6000, 5500, 7000],
};

export default function FaturamentoMensalChart({ region }: Props) {
  // Se tem região, usa dados filtrados, senão usa dados globais
  const data = {
    labels: mockDataGlobal.labels,
    datasets: [
      {
        label: region ? `Faturamento - ${region}` : 'Faturamento Global',
        data: region ? mockDataPorRegiao[region] || [] : mockDataGlobal.datasets[0].data,
        backgroundColor: '#8b0000',
        borderRadius: 6,
        barThickness: 20,
      },
    ],
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-4 w-full h-full">
      <h2 className="text-md font-semibold mb-2">Faturamento Mensal</h2>
      <Bar data={data} options={{ responsive: true }} />
    </div>
  );
}
