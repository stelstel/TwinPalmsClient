import React, {useState, useEffect} from 'react';
import { DateRangePickerComponent } from '@syncfusion/ej2-react-calendars';
import axios from 'axios';
import './DatePicker.css';

 
export default function DatePicker() {
 
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
 
  //We still need to get the outlet ids from the user that is logged in, different users have access to different outlets.
  const sendGetRequest = async () => {
 
    console.log("Try get request to endpoint:")
    console.log(`https://localhost:44306/outlets/fbReports?outletIds=1&fromDate=${fromDate}&toDate=${toDate}`)
 
    const { data } = await axios(`https://localhost:44306/outlets/fbReports?outletIds=1&fromDate=${fromDate}&toDate=${toDate}`);
    
    console.log("sucessfull get request")
    console.log(data);
  };
 
  //This does a get request after every render
  useEffect(() => {
    sendGetRequest()
  })
 
  let val;
 
  const handleChange = () => {
    
 
      //Targets the date picker component
      val = document.getElementById("date-range-picker")
 
      
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
 
  return (
    <>
      <div className="date-picker">
        <DateRangePickerComponent
        id="date-range-picker"
        placeholder="Select a range"
        startDate={startValue}
        endDate={endValue}
        format="dd-MMM-yyyy"
        onChange={handleChange}
        />
      </div>
    </>
  );
}

