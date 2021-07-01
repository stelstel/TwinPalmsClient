/* eslint-disable array-callback-return */
import React, { useState, useEffect } from "react";
import axios from "axios";
// style
import "./TableData.css";

export default function TableData( { datePickerEndpoint, fromDate, toDate, handleClickOutlet }) {

  const [fbReport, setFbReport] = useState();

  let outletTotalValues = {
    totalIncome: 0,
    totalTables: 0,
    totalFood: 0,
    totalBeverage: 0,
    totalOtherIncome: 0,
    totalNumberOfGuests: 0,
    totalAverageSpendPerGuest: 0
  }

  useEffect(() => {

      const sendGetRequest = async () => {

      console.log("TRYING GET REQUEST", datePickerEndpoint)
      const { data } = await axios(datePickerEndpoint);
      setFbReport(data);
    };

    sendGetRequest();
  }, [datePickerEndpoint]);

  useEffect(() => {
    console.log("API RESPONSE: ", fbReport)
  }, [fbReport])


  return (
    <> 
    {/* {fromDate === toDate 
    ? 
    <h4>Yesterdays reports {fromDate}</h4> 
    :
    <h4>Showing reports from {fromDate} - {toDate}</h4>
    } */}

    
      <table className="datareport-table-container">
        <tr className="datareport-th-container">
          <th className="datareport-th">Restaurant</th>
          <th className="datareport-th">Revenue</th>
          {/* <th className="datareport-th">Tables/Checks</th>
          <th className="datareport-th">Food</th>
          <th className="datareport-th">Beverage</th>
          <th className="datareport-th">Other</th>
          <th className="datareport-th">Number of guests</th>
          <th className="datareport-th">Average spend per guest</th> */}
          <th className="datareport-th">Reported</th>
      </tr>
      {fbReport &&
      fbReport.map((outletReport, key) => {

        const outletTotalIncome = outletReport.tables + outletReport.food + outletReport.beverage + outletReport.otherIncome;
        const outlettotalNumberOfGuests = outletReport.guestsFromHotelTP + outletReport.guestsFromHotelTM + outletReport.guestsFromOutsideHotel;
         
        outletTotalValues.totalIncome += outletTotalIncome
        outletTotalValues.totalTables += outletReport.tables
        outletTotalValues.totalFood += outletReport.food
        outletTotalValues.totalBeverage += outletReport.beverage
        outletTotalValues.totalOtherIncome += outletReport.otherIncome
        outletTotalValues.totalNumberOfGuests += outlettotalNumberOfGuests
        outletTotalValues.totalAverageSpendPerGuest += outlettotalNumberOfGuests / outletTotalIncome

      return (
        <tr className="datareport-td-container" key={key}>
          <td onClick={handleClickOutlet} className="datareport-td">{
          outletReport.outletId === 1 ? "Catch Beach Club" :
          outletReport.outletId === 2 ? "The Lazy Coconut" :
          outletReport.outletId === 3 ? "Wagyu Steakhouse" :
          outletReport.outletId === 4 ? "Palm Seaside" :
          outletReport.outletId === 5 ? "Oriental Spoon" :
          outletReport.outletId === 6 ? "HQ Beach Lounge" :
          outletReport.outletId === 7 ? "Shimmer" :
          outletReport.outletId === 8 ? "Bake Laguna" :
          outletReport.outletId === 9 ? "Bake BIS" :
          outletReport.outletId === 10 ? "Bake Turtle Village" :
          outletReport.outletId === 11 ? "Bake Patong" :
          outletReport.outletId === 12 ? "Love Noodles" :
          "Outlet"
        }
          </td>
          <td className="datareport-td">{outletTotalIncome}</td>
          {/* <td className="datareport-td">{outletReport.tables}</td>
          <td className="datareport-td">{outletReport.food}</td>
          <td className="datareport-td">{outletReport.beverage}</td>
          <td className="datareport-td">{outletReport.otherIncome}</td>
          <td className="datareport-td">{outlettotalNumberOfGuests}</td>
          <td className="datareport-td">{Math.round(outletTotalIncome / outlettotalNumberOfGuests)}</td> */}
          <td className="datareport-td">{outletReport.date.slice(2, 10)}</td>
        </tr>
      )  
      })}
      <tr className="datareport-total-td-container">
        <td className="datareport-total-td">Total</td>
        <td className="datareport-total-td">{outletTotalValues.totalIncome}</td>
        {/* <td className="datareport-total-td">{outletTotalValues.totalTables}</td>
        <td className="datareport-total-td">{outletTotalValues.totalFood}</td>
        <td className="datareport-total-td">{outletTotalValues.totalBeverage}</td>
        <td className="datareport-total-td">{outletTotalValues.totalOtherIncome}</td>
        <td className="datareport-total-td">{outletTotalValues.totalNumberOfGuests}</td>
        <td className="datareport-total-td">{Math.round(outletTotalValues.totalAverageSpendPerGuest)}</td> */}
        <td className="datareport-total-td"></td>
      </tr>
      </table>
    </>
  );
}
