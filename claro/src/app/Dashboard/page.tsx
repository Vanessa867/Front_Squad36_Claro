'use client';

import FaturamentoMensalChart from "@/app/Components/Charts/FaturamentoMensalChart";
import DistribuicaoVendasAnualChart from "../Components/Charts/DistribuicaoVendasAnualChart";

export default function DashboardPage() {
  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      <FaturamentoMensalChart />
      <DistribuicaoVendasAnualChart />
    </div>
  );
}
