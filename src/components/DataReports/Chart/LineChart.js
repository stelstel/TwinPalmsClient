import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { API_URL } from '../utils/misc';
import axios from 'axios';

const LineChart = () => {
  const [chartData, setChartData] = useState([]);

  const getChartData = async () => {
    const { data } = await axios(API_URL);
    console.log(data);
    setChartData(data);
    console.log(chartData); // empty array
  };
  useEffect(() => {
    getChartData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Line
        data={{
          labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
          datasets: [
            {
              label: '# of Votes',
              data: [12, 19, 3, 5, 2, 3], // data
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
              borderWidth: 2,
            },
            {
              label: 'Revenue',
              //  data: [100, 104, 67, 508, 900, 50], - here we can pass the api data 
              chartData,
              backgroundColor: ['red'],
              borderColor: ['green'],
              borderWidth: 2,
            },
          ],
        }}
        width={400}
        height={400}
        options={{
          maintainAspectRatio: false,
          scales: {
            yAxes: {
              beginAtZero: true,
            },
          },
        }}
      />
    </div>
  );
};

export default LineChart;
