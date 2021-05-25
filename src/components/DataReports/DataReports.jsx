import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import { Revenue3D, GuestPie3D } from './Charts';
// style
import './DataReports.css';

export default function DataReports() {
  const [reports, setReports] = useState({ blogs: [] });

  const url = 'https://localhost:44306/api/FbReports/';

  useEffect(() => {
    const sendGetRequest = async () => {
      const { data } = await axios(url);

      setReports({ blogs: data });
      console.log(data);
    };
    sendGetRequest();
  }, []);

  // Date time
  const currentDate = new Date();
  const date = currentDate.toDateString();

  const renderTableHeader = () => {
    let header = reports.blogs[0] && Object.keys(reports.blogs[0]);
    return (
      header &&
      // eslint-disable-next-line array-callback-return
      header.map((value, key) => {
        if (value !== 'isPublicHoliday') {
          return <th key={key}>{value.toUpperCase()}</th>;
        }
      })
    );
  };

  // Preparing the chart data
  // Preparing the chart data ______ REVENUE
  const chartData = [
    {
      label: 'Food',
      value: '88000',
    },
    {
      label: 'Beverage',
      value: '91000',
    },
    {
      label: 'Other Income',
      value: '17400',
    },
    {
      label: 'Total',
      value: '196400',
    },
  ];

  // Preparing the chart data ______ GUEST
  const chartData1 = [
    {
      label: 'Hotel',
      value: '29',
    },
    {
      label: 'Outside',
      value: '21',
    },
    {
      label: 'Average',
      value: '50',
    },
    {
      label: 'Total',
      value: '100',
    },
  ];

  return (
    <>
      <h1 className="title">Summary statistics</h1>
      <br />
      <h2>Todays Statistics: {date}</h2>
      <br />
      <h1>REVENUE</h1>
      <br />

      <Table striped bordered hover>
        <thead>
          <tr>{renderTableHeader()}</tr>
        </thead>

        <tbody>
          {reports.blogs &&
            reports.blogs.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.tables}</td>
                <td>{item.food}</td>
                <td>{item.beverage}</td>
                <td>{item.otherIncome}</td>
                <td>{item.guestsFromHotel}</td>
                <td>{item.guestsFromOutsideHotel}</td>
                <td>{item.notes}</td>
                <td>{item.date}</td>
                <td>{item.outletId}</td>
                <td>{item.userId}</td>
                <td>{item.localEventId}</td>
                <td>{item.guestSourceOfBusinesses}</td>
                <td>{item.weathers}</td>
              </tr>
            ))}
        </tbody>
      </Table>

      <Revenue3D data={chartData} />
      <GuestPie3D data={chartData1} />
    </>
  );
}
