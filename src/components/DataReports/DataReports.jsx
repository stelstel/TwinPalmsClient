import React, { useState, useContext } from "react";
import OverviewTableData from "../DataReports/Table/OverviewTableData";
import OutletTableData from "../DataReports/Table/OutletTableData";
import { UserContext } from "../../App";

// style
import "./DataReports.css";

export default function DataReports( ) {
  const user = useContext(UserContext);

  //ARRAY HOLDING ALL OUTLET IDS LOGGED IN USER HAVE ACCESS TO
  const loggedInUserOutlets = [];
  //LOOPS THORUGH USERS COMPANIES AND GETS ALL OUTLET IDS
  user.companies.forEach((companies) => {

      for (const [key, value] of Object.entries(companies)) {
          if(key === "outlets") {
              value.forEach((outlet) => {
                  loggedInUserOutlets.push(outlet.id)
              })
          }
        }
  })

  const [activeTable, setActiveTable] = useState({
    overviewTable: true,
    outletTable: false
  })

  const [activeOutlet, setActivevOutlet] = useState()

  const getOutlet = (restaurant) => {
    setActivevOutlet(restaurant)
    onClickOutlet()
  }

      //Gets yesterdays date since owners will be checking yesterdays data reports by default
      const today = new Date()
      const yesterday = new Date(today)
      yesterday.setDate(yesterday.getDate() - 1)
    
   
      //Deafault values for date picker
      const startValue = yesterday.toISOString().slice(0, 10)
      const endValue =  yesterday.toISOString().slice(0, 10)
  
      //React hooks for api endpoint
      const [fromDate, setFromDate] = useState(startValue)
      const [toDate, setToDate] = useState(endValue)
  
    let val;
   
    const handleChange = () => {
      
      
        //Targets the date picker component
        val = document.getElementById("date-range-picker")
        console.log(val.value)
   
        
        //Function that changes month from text to a numbered string
        const monthNameToNum = (monthName) => {
   
          const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
          let month = months.indexOf(monthName) + 1;
   
          if(month <= 9) {
            return month ? "0" + month : 0;
          }
          else {
            return month.toString()
          }
        }
   
        //Sets fromDate to be uset in api call
        const fromDay = val.value.slice(0, 2)
        let fromMonth = val.value.slice(3, 6)
        const fromYear = val.value.slice(7, 11)
   
        fromMonth = monthNameToNum(fromMonth)
       
        setFromDate(`${fromYear}-${fromMonth}-${fromDay}`)
   
        //Sets toDate to be uset in api call
        const toDay = val.value.slice(14, 16)
        let toMonth = val.value.slice(17, 20)
        const toYear = val.value.slice(21)
   
        toMonth = monthNameToNum(toMonth) 
   
        setToDate(`${toYear}-${toMonth}-${toDay}`)
  
    }

    const onClickOutlet = () => {
      setActiveTable(
        {
          overviewTable: !activeTable.overviewTable, 
          outletTable: !activeTable.outletTable
        }
        )
    }

  return (
    <>
      <section className="table-section">
        <br />
        <br />

        <div id="Maindiv">
          {
          activeTable.overviewTable ? <OverviewTableData user={user} loggedInUserOutlets={loggedInUserOutlets} getOutlet={getOutlet} /> :
          activeTable.outletTable ? <OutletTableData onClickOutlet={onClickOutlet} loggedInUserOutlets={loggedInUserOutlets} activeOutlet={activeOutlet} fromDate={fromDate} toDate={toDate} handleChange={handleChange} /> : 
          console.log("error rendering tables")
          }  
        </div>
      </section>
    </>
  );
}
