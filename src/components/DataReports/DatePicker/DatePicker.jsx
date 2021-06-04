import React from 'react';
import { DateRangePickerComponent } from '@syncfusion/ej2-react-calendars';
import './DatePicker.css';

export default function DatePicker() {
  // const [fromDate, setFromDate] = useState('');
  // const [toDate, setToDate] = useState('');
  //const[(startDate, setStartDate)] = useState(new Date());

  //useEffect(() => {}, [fromDate, toDate]);

  /* const onSubmit = (data, e) => {
    e.target.reset(); // reset after form submit
    console.log(data);
    alert('You are now logged in');
  };
*/
  return (
    <>
      {/*  <input type="text" onChange={(e) => setFromDate(e.target.value)} />
      <input type="text" onChange={(e) => setToDate(e.target.value)} /> */}
      <div className="date-picker">
        <DateRangePickerComponent id="date-range-picker" placeholder="Select a range" />
      </div>
    </>
  );
}
