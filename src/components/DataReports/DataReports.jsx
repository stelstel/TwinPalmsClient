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
        <h1 className="title">Data Reports Summary</h1>
        <br />
        <h4 className="statistic-date">Todays Statistics: {date}</h4>
        <br />
        <h5 className="revenue">Choose Dates</h5>

        <DatePicker />
        <br />
        <div>
          <br />
          <Table />
        </div>
      </section>
    </>
  );
}
