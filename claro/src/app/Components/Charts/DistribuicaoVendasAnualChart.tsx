"use client";

import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const labels = [
  "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
  "Jul", "Ago", "Set", "Out", "Nov", "Dez"
];

const options = {
  responsive: true,
  plugins: {
    legend: { display: false },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        stepSize: 1,
      },
      grid: {
        color: "#f0f0f0",
      },
    },
    x: {
      grid: {
        display: false,
      },
    },
  },
};

export default function DistribuicaoVendasAnualChart() {
  const [vendasPorMes, setVendasPorMes] = useState<number[]>(Array(12).fill(0));

  useEffect(() => {
    async function fetchVendas() {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL
      const response = await fetch(`${apiUrl}/orders`, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
      const result = await response.json();
      const pedidos = result.content || [];

      const vendas = Array(12).fill(0);
      pedidos.forEach((order: any) => {
        const date = new Date(order.orderDate);
        const mes = date.getMonth();
        vendas[mes] += 1;
      });
      setVendasPorMes(vendas);
    }
    fetchVendas();
  }, []);

  const data = {
    labels,
    datasets: [
      {
        label: "Vendas",
        data: vendasPorMes,
        fill: true,
        borderColor: "#ff6900",
        backgroundColor: "rgba(153, 27, 27, 0.1)",
        tension: 0.4,
        pointRadius: 0,
      },
    ],
  };

  return (
    <div className="bg-white p-4 rounded-2xl shadow col-span-1 md:col-span-2 xl:col-span-3">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Distribuição de vendas anual</h2>
        <span className="text-sm text-gray-500">Ano atual</span>
      </div>
      <Line data={data} options={options} height={100} />
    </div>
  );
}