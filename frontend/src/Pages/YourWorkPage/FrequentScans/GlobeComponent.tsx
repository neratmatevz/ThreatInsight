// src/GlobeComponent.tsx
import React, { useEffect, useRef } from 'react';
import Globe from 'react-globe.gl';

const GlobeComponent: React.FC = () => {
  const globeEl = useRef<any>(null);

  useEffect(() => {
    const N = 300;
    const gData = Array.from({ length: N }, () => ({
      lat: (Math.random() - 0.5) * 180,
      lng: (Math.random() - 0.5) * 360,
      size: Math.random() / 3,
      color: ['red', 'white', 'blue', 'green'][Math.floor(Math.random() * 4)]
    }));

    if (globeEl.current) {
      // Check if globeEl.current has pointsData method before calling it
      if (typeof globeEl.current.pointsData === 'function') {
        globeEl.current.pointsData(gData)
          .globeImageUrl('https://unpkg.com/three-globe@2.31.0/example/img/earth-night.jpg');
      } else {
        console.error("globeEl.current does not have a pointsData method.");
      }
    }
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Globe ref={globeEl} />
    </div>
  );
};

export default GlobeComponent;
