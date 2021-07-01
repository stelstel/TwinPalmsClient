import React, { useContext } from "react";
import DatePicker from "../DataReports/DatePicker/DatePicker";
import OverviewTableData from "../DataReports/Table/OverviewTableData";
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
          <h1>DATA REPORTS</h1>
        </div>
        <br />

        <div id="Maindiv">
          <h4 className="statistic-date">
            <DatePicker user={user} />
          </h4>
          <OverviewTableData user={user} />
        </div>
      </section>
    </>
  );
}
