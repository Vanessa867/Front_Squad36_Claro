'use client';

import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const data = {
  labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
  datasets: [
    {
      label: 'Faturamento',
      data: [500, 600, 700, 650, 720, 690],
      backgroundColor: '#9A3412',
      borderRadius: 6,
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
    },
  },
};

export default function FaturamentoMensalChart() {
  return (
    <div className="bg-white p-4 rounded-2xl shadow">
      <h2 className="text-lg font-medium mb-2">Faturamento mensal</h2>
      <Bar data={data} options={options} />
    </div>
  );
}
