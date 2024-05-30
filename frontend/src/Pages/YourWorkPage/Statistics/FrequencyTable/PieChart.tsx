import React, { useRef, useEffect, useState } from 'react';
import Chart, { ChartConfiguration } from 'chart.js/auto';

type Counts = {
  [key: string]: number;
};

interface BarChartProps {
  counts: Counts;
}

const BarChart: React.FC<BarChartProps> = ({ counts }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const [chartInstance, setChartInstance] = useState<Chart<'bar'> | null>(null);

  useEffect(() => {
    let newChartInstance: Chart<'bar'> | null = null;
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      if (ctx) {
        newChartInstance = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: Object.keys(counts),
            datasets: [
              {
                label: '# of Counts',
                data: Object.values(counts),
                backgroundColor: [
                  '#2BA8A4'
                ],
                borderColor: [
                 '#2BA8A4'
                ],
                borderWidth: 1,
              },
            ],
          },
          options: {
            plugins: {
              legend: {
                display: false,
                position: 'top',
              },
            },
            scales: {
              x: {
                beginAtZero: true,
                ticks: {
                  color: '#e5e7eb', 
                },
              },
              y: {
                beginAtZero: true,
                ticks: {
                  color: '#e5e7eb', 
                },
              },
            },
          },
        });
        setChartInstance(newChartInstance);
      }
    }
    return () => {
      if (newChartInstance) {
        newChartInstance.destroy();
      }
    };
  }, [counts]);

  return <canvas ref={chartRef} />;
};

export default BarChart;
