// src/components/Chart.js

import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { useEffect, useState } from 'react';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function Chart({ data }) {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    if (data) {
      const labels = data.prices.map(price => new Date(price[0]).toLocaleDateString());
      const prices = data.prices.map(price => price[1]);

      setChartData({
        labels,
        datasets: [
          {
            label: 'Price in USD',
            data: prices,
            borderColor: 'rgba(75,192,192,1)',
            backgroundColor: 'rgba(75,192,192,0.2)',
            fill: true,
          }
        ]
      });
    }
  }, [data]);

  return (
    <div                                                                  >
      {chartData.labels && <Line data={chartData} />}
    </div>
  );
}