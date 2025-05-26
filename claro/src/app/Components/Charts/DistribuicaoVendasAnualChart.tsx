"use client";

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

const data = {
  labels,
  datasets: [
    {
      label: "Vendas",
      data: [420, 450, 460, 480, 500, 530, 550, 580, 600, 620, 650, 700],
      fill: true,
      borderColor: "#991B1B", // vermelho escuro
      backgroundColor: "rgba(153, 27, 27, 0.1)", // sombra
      tension: 0.4,
      pointRadius: 0,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: { display: false },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        stepSize: 100,
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
  return (
    <div className="bg-white p-4 rounded-2xl shadow col-span-1 md:col-span-2 xl:col-span-3">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Distribuição de vendas anual</h2>
        <span className="text-sm text-gray-500">05 Fev – 04 Mar</span>
      </div>
      <Line data={data} options={options} height={100} />
    </div>
  );
}
