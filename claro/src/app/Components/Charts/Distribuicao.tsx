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

interface RegionData {
  region: string;
  customers: number;
  percentage: number;
}

interface Props {
  data: RegionData[];
  selectedRegion?: string | null;
}

export default function DistribuicaoPorRegiaoChart({ data, selectedRegion }: Props) {
  const filteredData = selectedRegion
    ? data.filter(d => d.region === selectedRegion)
    : data;

  if (!filteredData.length) {
    return (
      <div className="bg-white shadow-lg rounded-xl p-4 w-full h-full">
        <h2 className="text-md font-semibold mb-2">Distribuição por região</h2>
        <p className="text-sm text-gray-500">Nenhum dado disponível.</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-lg rounded-xl p-4 w-full h-full">
      <h2 className="text-md font-semibold mb-2">Distribuição por região</h2>
      <p className="text-sm text-gray-500 mb-4">Número de vendas baseado em região</p>

      <Bar
        data={{
          labels: filteredData.map(d => d.region),
          datasets: [
            {
              label: 'Clientes',
              data: filteredData.map(d => d.customers),
              backgroundColor: ['#8b0000', '#cd5c5c', '#a0522d'],
              borderRadius: 6,
              barThickness: 20,
            },
          ],
        }}
        options={{
          indexAxis: 'y',
          responsive: true,
          plugins: {
            legend: { display: false },
          },
          scales: {
            x: {
              display: false,
              max: Math.max(...filteredData.map(d => d.customers)) * 1.2,
            },
            y: {
              ticks: {
                callback: (_, index) =>
                  `${filteredData[index!].region} (${filteredData[index!].percentage}%)`,
              },
            },
          },
        }}
      />
    </div>
  );
}
