import React, { useContext } from "react";
// Component
import Table from "../DataReports/Table/TableData";
import DatePicker from "../DataReports/DatePicker/DatePicker";
import Chart from "../DataReports/Chart/Chart";
import { UserContext } from "../../App";

// style
import "./DataReports.css";

export default function DataReports( ) {
  const user = useContext(UserContext);

  // Date time
  const currentDate = new Date();
  const date = currentDate.toDateString();

  return (
    <>
      <section className="table-section">
        <br />
        <h1 className="table-title">Data Reports Summary</h1>
        <br />

        <div id="Maindiv">
          <h4 className="statistic-date">
            Todays Statistics: {date}
            <DatePicker user={user} />
            <br />
            <br />
          </h4>
          <br />
          <Table />
          <hr />
          <Chart />
        </div>
      </section>
    </>
  );
}
