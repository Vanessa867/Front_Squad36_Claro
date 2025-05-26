'use client';

import FaturamentoMensalChart from "@/app/Components/Charts/FaturamentoMensalChart";
import DistribuicaoVendasAnualChart from "../Components/Charts/DistribuicaoVendasAnualChart";
import DistribuicaoPorRegiaoChart from "@/app/Components/Charts/DistribuicaoPorRegiaoChart";

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">

      {/* Header do usuário */}
      <div className="flex justify-end">
        <div className="text-sm text-gray-700 font-medium">
          João Silva ⌄
        </div>
      </div>

      {/* Linha 1: Indicadores */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow p-4">
          <p className="text-sm text-gray-500">Faturamento total</p>
          <h2 className="text-2xl font-semibold">R$ 500.000</h2>
        </div>
        <div className="bg-white rounded-xl shadow p-4">
          <p className="text-sm text-gray-500">Quantidade de produtos em estoque</p>
          <h2 className="text-2xl font-semibold">10.000</h2>
        </div>
      </div>

      {/* Linha 2: Gráficos lado a lado */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-1">
          <DistribuicaoPorRegiaoChart data={[]} />
        </div>
        <div className="xl:col-span-2">
          <FaturamentoMensalChart />
        </div>
      </div>

      {/* Linha 3: Gráfico de linha anual */}
      <div>
        <DistribuicaoVendasAnualChart />
      </div>
    </div>
  );
}
