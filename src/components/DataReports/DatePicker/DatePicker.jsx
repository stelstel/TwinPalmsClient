import React, {useState } from 'react';
import { DateRangePickerComponent } from '@syncfusion/ej2-react-calendars';
import TableData from "../Table/TableData";
import './DatePicker.css';

 
export default function DatePicker( {user} ) {


  const [outletForApiEndpoint, setOutletForApiEndpoint] = useState()

  const handleClickOutlet = (e) => {
    switch(e.target.innerHTML) {
      case "Catch Beach Club":
        setOutletForApiEndpoint(1)
        console.log("Catch Beach Club")
        break;
      case "The Lazy Coconut":
        setOutletForApiEndpoint(2)
        console.log("The Lazy Coconut")
        break;
      case "Wagyu Steakhouse":
        setOutletForApiEndpoint(3)
        console.log("Wagyu Steakhouse")
        break;
      case "Palm Seaside":
        setOutletForApiEndpoint(4)
        console.log("Palm Seaside")
        break;
      case "Oriental Spoon":
        setOutletForApiEndpoint(5)
        console.log("Oriental Spoon")
        break;
      case "HQ Beach Lounge":
        setOutletForApiEndpoint(6)
        console.log("HQ Beach Lounge")
        break;
      case "Shimmer":
        setOutletForApiEndpoint(7)
        console.log("Shimmer")
        break;
      case "Bake Laguna":
        setOutletForApiEndpoint(8)
        console.log("Bake Laguna")
        break;
      case "Bake BIS":
        setOutletForApiEndpoint(9)
        console.log("Bake BIS")
        break;
      case "Bake Turtle Village":
        setOutletForApiEndpoint(10)
        console.log("Bake Turtle Village")
        break;
      case "Bake Patong":
        setOutletForApiEndpoint(11)
        console.log("Bake Patong")
        break;
      case "Love Noodles":
        setOutletForApiEndpoint(12)
        console.log("Love Noodles")
        break;    
      default:
        return "Something went wrong"
    }

  }

  let userOutlets = []

  //Loops over the companies the logged in users has access to and pushes to userOutlets to be used in api endpoint
  user.companies.forEach((obj) => {
    //Destructuring all key/value pairs in all objects in the array
    Object.entries(obj).map(([key, value]) => {
      //Accesses only the outlets and pushes all outlet ids to userOutlets
      if(key === "outlets") {
        //Checks if this company outlets has values
        if(value.length > 0) { 
              value.forEach((outlets) => {
              userOutlets.push(`outletIds=${outlets.id}&`)
            })
        }
        //Checks if this company outlets has 0 values
        else if(value.length <= 0) {
          return null
        }
      }
      return null
    })
  })
  userOutlets = userOutlets.toString().replace(/,/g, "")
 
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


  const datePickerEndpoint = `https://localhost:44306/outlets/fbReports?${userOutlets}fromDate=${fromDate}&toDate=${toDate}`
 
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
  // useEffect(() => {
  //   handleChange()
  // })
 
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
      <TableData 
        fromDate={fromDate}
        toDate={toDate}
        datePickerEndpoint={datePickerEndpoint}
        handleClickOutlet={handleClickOutlet}
      />

    </>
  );
}

