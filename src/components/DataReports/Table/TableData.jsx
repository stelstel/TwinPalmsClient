/* eslint-disable array-callback-return */
import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { Col } from 'react-bootstrap';
import { API_URL } from '../../DataReports/utils/misc';


import axios from 'axios';
// style
import './TableData.css';

export default function TableData() {
  const [fbReport, setFbReport] = useState();

  const sendGetRequest = async () => {
    const { data } = await axios(API_URL);
    console.log(data);
    setFbReport(data);
  };

  useEffect(() => {
    sendGetRequest();
  }, []);

  // Table header method
  const tableHeader = () => {
    let header = fbReport && Object.keys(fbReport[0]);
    return (
      header &&
      // eslint-disable-next-line array-callback-return
      header.map((value, key) => {
        if (value !== 'isPublicHoliday') {
          return (
            <th className="column-title" key={key}>
              {value.toUpperCase()}
            </th>
          );
        }
      })
    );
  };

  return (
    <>
      <Col md={12} sm={12}>
        <div >
          <Table
            striped
            bordered
            hover
            responsive="sm"
            className=" table-striped jambo_table " >

            <thead>
              <th className="headings">TABELS</th>
              <th className="headings">FOOD</th>
              <th className="headings">BEVERAGE </th>
              <th className="headings"> OTHER INCOME</th>
              <th className="headings">DATE </th>
              <th className="headings">GUESTS FROM HOTEL</th>
              <th className="headings">GUESTS FROM OUTSIDE HOTEL</th>
              <th className="headings"></th>
              <th className="headings">EVENT NOTES</th>
              <th className="headings">BUSINESS NOTES</th>
              <th className="headings">OUTLET ID</th>
              <th className="headings">USER ID</th>
              <th className="headings">GUESTSSOURCE OF BUSINESS EVENTS</th>

            </thead>

            <tbody>
              {fbReport &&
                fbReport.map((obj, key) => {
                  console.log(obj);
                  return (
                    <tr key={key}>
                      {Object.entries(obj).map(([key, value]) => {
                        if (
                          key === 'gsobNrOfGuest' ||
                          key === 'guestSourceOfBusinesses' ||
                          key === 'weathers'
                        ) {
                          //Theese are nested arrays with object, we have to map throught theese again or something
                          console.log(value);
                        } else {
                          return <td key={key}>{value}</td>;
                        }
                      })}
                    </tr>
                  );
                  
                })}
            </tbody>
            <tfoot id="footer">
              <tr>
                <th>Total Revenue </th>
                <td>
                  20000
                </td>
                 
              </tr>
              <tr>
                <th>Total Income </th>
                <td></td> <td> </td>
                
                 <td>
                  10000
                </td>
              </tr>
    
              <tr>
                <th>Total Guests </th>
                <td></td><td></td><td></td><td></td>
                <td>500</td>
                
                 
              </tr>
            </tfoot> 
          </Table>
        </div>
      </Col>
    </>
  );
}
