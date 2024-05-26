import React, { useRef, useEffect, useState } from 'react';
import Chart, { ChartConfiguration } from 'chart.js/auto';

type Counts = {
  [key: string]: number;
};

interface PieChartProps {
  counts: Counts;
}

const PieChart: React.FC<PieChartProps> = ({ counts }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const [chartInstance, setChartInstance] = useState<Chart<'pie'> | null>(null);

  useEffect(() => {
    let newChartInstance: Chart<'pie'> | null = null;
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      if (ctx) {
        newChartInstance = new Chart(ctx, {
          type: 'pie',
          data: {
            labels: Object.keys(counts),
            datasets: [
              {
                label: '# of Counts',
                data: Object.values(counts),
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
              },
            ],
          },
          options: {
            plugins: {
              legend: {
                display: true,
                position: 'top',
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

export default PieChart;
