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
      <Col md={11} sm={11}>
        <div >
          <Table
            striped
            bordered
            hover
            responsive="sm"
            className=" table-striped jambo_table bulk_action"
          >
            <thead>
              <tr className="headings">{tableHeader()}</tr>
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
          </Table>
        </div>
      </Col>
    </>
  );
}
