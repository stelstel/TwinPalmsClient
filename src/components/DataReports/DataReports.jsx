import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import { Col } from 'react-bootstrap';

// style
import './DataReports.css';

export default function DataReports() {
  const [reports, setReports] = useState({ blogs: [] });

  const url = 'https://localhost:44306/api/FbReports/';

  const sendGetRequest = async () => {
    const { data } = await axios(url);
    setReports({ blogs: data });
    console.log(data);
  };

  useEffect(() => {
    sendGetRequest();
  }, []);

  // Date time
  const currentDate = new Date();
  const date = currentDate.toDateString();

  // Table header method
  const renderTableHeader = () => {
    let header = reports.blogs[0] && Object.keys(reports.blogs[0]);
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
      <section className="table-section">
        <br />
        <h1 className="title">Summary statistics</h1>
        <br />
        <h2>Todays Statistics: {date}</h2>
        <br />
        <h1>REVENUE</h1>
        <br />

        <div>
          <Col md={12} sm={12}>
            <div className="table-responsive">
              <Table
                striped
                bordered
                hover
                responsive="sm"
                className=" table-striped jambo_table bulk_action"
              >
                <thead>
                  <tr className="headings">{renderTableHeader()}</tr>
                </thead>

                <tbody>
                  {reports.blogs &&
                    reports.blogs.map((item) => (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.tables}</td>
                        <td>{item.food}</td>
                        <td>{item.beverage}</td>
                        <td>{item.otherIncome}</td>
                        <td>{item.guestsFromHotel}</td>
                        <td>{item.guestsFromOutsideHotel}</td>
                        <td>{item.notes}</td>
                        <td>{item.date}</td>
                        <td>{item.outletId}</td>
                        <td>{item.userId}</td>
                        <td>{item.localEventId}</td>
                        <td>{item.guestSourceOfBusinesses}</td>
                        <td>{item.weathers}</td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </div>
          </Col>
        </div>
      </section>
    </>
  );
}
