import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { API_URL } from '../utils/misc';
import axios from 'axios';

//Get request from date picker minus months
//push all the days in to the data for the line chart

var date = new Date();

// add a day
date.setDate(date.getDate() + 1);
console.log(date)

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
          labels: ["Jan", "Feb", "Mars", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          datasets: [
            {
              label: "Revenue",
              data: [9000, 11000, 8000, 12000, 15000, 17000, 14000, 12000, 9000, 7000, 14000, 18000],
              chartData,
              backgroundColor: ["red"],
              borderColor: ["green"],
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
