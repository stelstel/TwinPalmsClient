import React from 'react';
import { DateRangePickerComponent } from '@syncfusion/ej2-react-calendars';

import './DatePicker.css';

 
export default function DatePicker( { user, handleChange } ) {

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
    </>
  );
}

