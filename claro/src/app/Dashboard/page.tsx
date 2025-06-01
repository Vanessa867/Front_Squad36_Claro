'use client';

import { useState } from 'react';
import FaturamentoMensalChart from "@/app/Components/Charts/FaturamentoMensalChart";
import DistribuicaoVendasAnualChart from "../Components/Charts/DistribuicaoVendasAnualChart";
import DistribuicaoPorRegiaoChart from "@/app/Components/Charts/DistribuicaoPorRegiaoChart";
import UserMenu from "../Components/Charts/UserMenu";
import FaturamentoTotal from "../Components/Charts/FaturamentoTotal";
import QuantidadeDeProdutosEstoque from "../Components/Charts/QuantidadeDeProdutosEstoque";

export default function DashboardPage() {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen w-full">
      <div className="flex justify-end">
        <UserMenu />
      </div>

      {/* Primeira linha com Faturamento Total e Quantidade de Produtos em Estoque */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow p-0">
          <FaturamentoTotal />
        </div>
        <div className="bg-white rounded-xl shadow p-0">
          <QuantidadeDeProdutosEstoque />
        </div>
      </div>

      {/* Segunda linha com Mapa e Gráfico de Faturamento */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-1">
          <DistribuicaoPorRegiaoChart
            selectedRegion={selectedRegion}
            onRegionClick={setSelectedRegion}
          />
        </div>
        <div className="xl:col-span-2">
          <FaturamentoMensalChart region={selectedRegion} />
        </div>
      </div>

      {/* Terceira linha com Gráfico de Distribuição de Vendas Anual */}
      <div>
        <DistribuicaoVendasAnualChart />
      </div>
    </div>
  );
}
