import React, { useState, useContext } from "react";
import OverviewTableData from "../DataReports/Table/OverviewTableData";
import OutletTableData from "../DataReports/Table/OutletTableData";
import { UserContext } from "../../App";

// style
import "./DataReports.css";

export default function DataReports( ) {
  const user = useContext(UserContext);
  const [activeTable, setActiveTable] = useState({
    overviewTable: true,
    outletTable: false
  })

  return (
    <>
      <section className="table-section">
        <br />
        <br />

        <div onClick={() => ( 
          setActiveTable(
            {
              overviewTable: !activeTable.overviewTable, 
              outletTable: !activeTable.outletTable
            }
            )
            )
          } 
            id="Maindiv">
          {
          activeTable.overviewTable ? <OverviewTableData user={user} /> :
          activeTable.outletTable ? <OutletTableData /> : 
          console.log("error rendering tables")
          }
          
          
        </div>
      </section>
    </>
  );
}
