'use client';

import React, { useEffect, useState } from 'react';
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

const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

export default function FaturamentoMensalChart({ region }: Props) {
  const [data, setData] = useState<any>({
    labels: meses,
    datasets: [
      {
        label: 'Faturamento',
        data: Array(12).fill(0),
        backgroundColor: '#8b0000',
        borderRadius: 6,
        barThickness: 20,
      },
    ],
  });

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('http://localhost:8080/orders');
      const result = await response.json();
      const pedidos = result.content || [];

      const faturamentoPorMes = Array(12).fill(0);

      pedidos.forEach((order: any) => {
        if (region && order.region?.toLowerCase() !== region.toLowerCase()) return;

        const date = new Date(order.orderDate);
        const mes = date.getMonth();
        faturamentoPorMes[mes] += order.totalValue || 0;
      });

      setData({
        labels: meses,
        datasets: [
          {
            label: region ? `Faturamento - ${region}` : 'Faturamento Global',
            data: faturamentoPorMes,
            backgroundColor: '#8b0000',
            borderRadius: 6,
            barThickness: 20,
          },
        ],
      });
    }
    fetchData();
  }, [region]);

  return (
    <div className="bg-white shadow-lg rounded-xl p-4 w-full h-full">
      <h2 className="text-md font-semibold mb-2">Faturamento Mensal</h2>
      <Bar data={data} options={{ responsive: true }} />
    </div>
  );
}