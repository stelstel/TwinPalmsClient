/* eslint-disable array-callback-return */
import React, { useState, useEffect } from "react";
import axios from "axios";
// style
import "./TableData.css";

export default function TableData( { datePickerEndpoint, yearlyDataEndpoint, fromDate, toDate, handleClickOutlet }) {

  let total = 0;

  const [fbReport, setFbReport] = useState();
  const [fbReportCurrentYear, setFbReportCurrentYear] = useState();

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
    // getFbReportsCurrentYear()
  }, [datePickerEndpoint]);

  //GET FB REPORTS FOR WHOLE YEAR FROM API
  useEffect(() => {
  const sendGetRequest = async (url) => {
    try {
        const res = await axios.get(url);
        console.log('successfull get request for yearly data')
        setFbReportCurrentYear(res.data)
    } catch (err) {
        // Handle Error Here
        console.error(err);
    }};
        sendGetRequest(yearlyDataEndpoint)
  }, [yearlyDataEndpoint]) 

    useEffect(() => {
      console.log("API RESPONSE: ", fbReport)
    }, [fbReport])
    useEffect(() => {
      console.log("API RESPONSE: ", fbReportCurrentYear)
    }, [fbReportCurrentYear])

  



  return (
    <> 
      <table className="datareport-table-container">
        <tr className="datareport-th-container">
          <th className="datareport-th">Restaurant</th>
          <th className="datareport-th">Date</th>
          <th className="datareport-th">Revenue</th>
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
        <>
        <tr className="datareport-restaurant-container" key={key}>
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
          <td className="datareport-td">{outletReport.date.slice(2, 10)}</td>
          <td className="datareport-td">{outletTotalIncome}</td>
        </tr>
        <tr className="datareport-month-container">
        {fbReportCurrentYear &&
        fbReportCurrentYear.forEach((item) => {
          
          if(item.outletId === 1) {
            if(item.food && item.beverage && item.otherIncome) {
              total += item.food += item.beverage += item.otherIncome
            }
          }
          console.log(total)
          return <td className="datareport-td">{total}</td>
        })}
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
          <td className="datareport-td">Month</td>
          {
            outletReport.outletId === 1 ? <td className="datareport-td">{total}</td> :
            outletReport.outletId === 2 ? <td className="datareport-td">Monthly rev</td> :
            outletReport.outletId === 3 ? <td className="datareport-td">Monthly rev</td> :
            outletReport.outletId === 4 ? <td className="datareport-td">Monthly rev</td> :
            <td>Error</td>
          }
        </tr>
        <tr className="datareport-year-container">
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
          <td className="datareport-td">Year</td>
          <td className="datareport-td">Yearly rev</td>
        </tr>
        </>
      )  
      })}
      <tr className="datareport-total-td-container">
        <td className="datareport-total-td">Total</td>
        <td className="datareport-total-td">{outletTotalValues.totalIncome}</td>
        <td className="datareport-total-td"></td>
      </tr>
      </table>
    </>
  );
}
