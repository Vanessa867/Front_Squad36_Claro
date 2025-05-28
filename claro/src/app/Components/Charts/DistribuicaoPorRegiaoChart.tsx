'use client';

import React from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
} from 'react-simple-maps';

const geoUrl =
  'https://raw.githubusercontent.com/codeforamerica/click_that_hood/main/public/data/brazil-states.geojson';

interface BrazilMapProps {
  onRegionClick: (regionId: string) => void;
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

export default function BrazilMap({ onRegionClick }: BrazilMapProps) {
  function getRegionColor(geoId: string) {
    const region = dataRegion[geoId];
    if (region) {
      return regionColors[region] || '#888';
    }
    return '#888'; // cinza médio
  }

  return (
    <div className="p-4 bg-white rounded-xl shadow-lg w-full max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Mapa do Brasil por região</h2>

      <ComposableMap projection="geoMercator" projectionConfig={{ scale: 800, center: [-55, -15] }}>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map(geo => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill={getRegionColor(geo.properties.sigla)}
                stroke="#666"
                style={{
                  default: { outline: 'none' },
                  hover: { fill: '#f0a500', outline: 'none', cursor: 'pointer' },
                  pressed: { outline: 'none' },
                }}
                onClick={() => onRegionClick(geo.properties.sigla)}
              />
            ))
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
}
