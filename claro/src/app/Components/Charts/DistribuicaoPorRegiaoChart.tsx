'use client';

import React from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
} from 'react-simple-maps';

const geoUrl =
  'https://raw.githubusercontent.com/codeforamerica/click_that_hood/main/public/data/brazil-states.geojson';

interface DistribuicaoPorRegiaoChartProps {
  selectedRegion: string | null;
  onRegionClick: (regionId: string | null) => void; // aceita null para limpar seleção
}

const regionColors: Record<string, string> = {
  Sul: '#8b0000',
  Sudeste: '#cd5c5c',
  Nordeste: '#a0522d',
  CentroOeste: '#deb887',
  Norte: '#f4a261',
};

const dataRegion: Record<string, string> = {
  PR: 'Sul',
  RS: 'Sul',
  SC: 'Sul',
  SP: 'Sudeste',
  RJ: 'Sudeste',
  MG: 'Sudeste',
  ES: 'Sudeste',
  BA: 'Nordeste',
  CE: 'Nordeste',
  PE: 'Nordeste',
  PB: 'Nordeste',
  RN: 'Nordeste',
  AL: 'Nordeste',
  SE: 'Nordeste',
  MA: 'Nordeste',
  PI: 'Nordeste',
  AP: 'Norte',
  AM: 'Norte',
  PA: 'Norte',
  RO: 'Norte',
  RR: 'Norte',
  TO: 'Norte',
  AC: 'Norte',
  MT: 'CentroOeste',
  MS: 'CentroOeste',
  GO: 'CentroOeste',
  DF: 'CentroOeste',
};

export default function DistribuicaoPorRegiaoChart({
  selectedRegion,
  onRegionClick,
}: DistribuicaoPorRegiaoChartProps) {
  function getRegionColor(geoId: string) {
    const region = dataRegion[geoId];
    if (region) {
      return regionColors[region] || '#888';
    }
    return '#888';
  }

  return (
    <div className="p-4 bg-white rounded-xl shadow-lg w-full max-w-4xl mx-auto">
      <h2 className="text-xl text-black font-semibold mb-4">Mapa do Brasil por região</h2>
      <p className="mb-4 text-sm text-gray-600">
        Clique em um estado para filtrar. Clique fora dos estados para mostrar o Brasil completo.
      </p>

      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ scale: 800, center: [-55, -15] }}
      >
        {/* Área clicável transparente para "Brasil completo" */}
        <rect
          width="100%"
          height="100%"
          fill="transparent"
          style={{ cursor: 'pointer' }}
          onClick={() => onRegionClick(null)}
        />

        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const sigla = geo.properties.sigla;
              const isSelected = sigla === selectedRegion;

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={isSelected ? '#f0a500' : getRegionColor(sigla)}
                  stroke={isSelected ? '#333' : '#666'}
                  style={{
                    default: { outline: 'none' },
                    hover: { fill: '#f0a500', outline: 'none', cursor: 'pointer' },
                    pressed: { outline: 'none' },
                  }}
                  onClick={() => onRegionClick(dataRegion[sigla])}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
}
