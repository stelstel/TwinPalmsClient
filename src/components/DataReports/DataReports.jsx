import React from 'react';
// Component
import Table from '../DataReports/Table/TableData';
import DatePicker from '../DataReports/DatePicker/DatePicker';


// style
import './DataReports.css';


export default function DataReports() {
  // Date time
  const currentDate = new Date();
  const date = currentDate.toDateString();

  return (
    <>
      <section className="table-section">
        <br />
        <h1 className="Table-title">Data Reports Summary</h1>
        <br />
        <div id="Maindiv">
          <h4 className="statistic-date">
            Todays Statistics: {date}
            <DatePicker />
          </h4>
          <div>
            <br />
            <Table />
          </div>
        </div>
      </section>
    </>
  );
}
