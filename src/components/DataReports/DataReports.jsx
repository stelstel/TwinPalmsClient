import React, { useContext } from "react";
// Component
import DatePicker from "../DataReports/DatePicker/DatePicker";
import Chart from "../DataReports/Chart/Chart";
import { UserContext } from "../../App";

// style
import "./DataReports.css";

export default function DataReports( ) {
  const user = useContext(UserContext);

  return (
    <>
      <section className="table-section">
        <br />
        <div className="table-title">
          <h1>DATA REPORTS SUMMARY</h1>
        </div>
        <br />

        <div id="Maindiv">
          <h4 className="statistic-date">
            <DatePicker user={user} />
            <br />
            <br />
          </h4>
          <br />
          
          <hr />
          <Chart />
        </div>
      </section>
    </>
  );
}
