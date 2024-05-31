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
        const data = Object.keys(counts).map((key, index) => ({
          label: key,
          data: [counts[key]],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ][index % 6],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ][index % 6],
          borderWidth: 1,
        }));

        newChartInstance = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ['Counts'], // Single label for the dataset
            datasets: data,
          },
          options: {
            plugins: {
              legend: {
                display: true,
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
