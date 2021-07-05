import React, { useContext } from 'react';
import { UserContext } from "../../../App";
import DatePicker from "../DatePicker/DatePicker";
import { Button } from "../../home/Button"
import { Chart } from "react-google-charts";
import "./OutletTableData.css";

function OutletTableData() {

    const user = useContext(UserContext);
    console.log(user)
    return (
        <>
        <main style={{display: "flex", flexDirection: "column", justifyContent: "center"}}>

{/* public holiday,
weather, */}


            <div>
            <div className="table-title">
                <h1>Catch Beach Club</h1>
            </div>
            <h4 className="statistic-date">
                <DatePicker user={user} />
            </h4>
            <table className="datareport-table-container" >
                    <tr className="datareport-th-container" >
                        <th className="datareport-th">Reveneu</th>
                        <th className="datareport-th">Guests</th>
                        <th className="datareport-th">Tables & Checks</th>
                        <th className="datareport-th">Avg <span>&#3647;</span> /Guest</th>
                    </tr>
                    <tr className="datareport-td-container">
                        <td className="datareport-td">{Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB' }).format(1000)}</td>
                        <td className="datareport-td">{Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB' }).format(1000)}</td>
                        <td className="datareport-td">1000</td>
                        <td className="datareport-td">{Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB' }).format(1000)}</td>
                    </tr>
            </table>
            <div className="outlet-table-data-comments">
                        <div style={{fontSize: "40px"}}><i class="fas fa-comments"></i><h4>Comments</h4></div>
                        <div className="outlet-table--data-comment-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae vero sed corrupti et molestias nostrum officiis eveniet autem cupiditate sint!
                        </div>
            </div>
            <div className="pie-chart-container">
                <h4 className="outlet-table-data-header">Revenue</h4>
                <Chart
                    width={'100%'}
                    height={'300px'}
                    chartType="PieChart"
                    loader={<div>Loading Chart</div>}
                    data={[
                        ['Task', 'Hours per Day'],
                        ['Food: 10000', 11],
                        ['Beverage: 1000', 12],
                        ['Other: 1000', 16],
                    ]}
                    options={{
                    }}
                    rootProps={{ 'data-testid': '1' }}
                />
                    <div className="outlet-table-data-btn-container">
                        <Button>Picture on cash registry</Button>
                    </div>
                    <div className="outlet-table-data-comments">
                        <div style={{fontSize: "40px"}}><i class="fas fa-comments"></i><h4>Revenue</h4></div>
                        <div className="outlet-table--data-comment-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae vero sed corrupti et molestias nostrum officiis eveniet autem cupiditate sint!
                    </div>
                    </div>
                </div>
                </div>
                <div className="pie-chart-container">
                    <h4 className="outlet-table-data-header">Source of business</h4>
                    <Chart
                        width={'100%'}
                        height={'300px'}
                        chartType="PieChart"
                        loader={<div>Loading Chart</div>}
                        data={[
                            ['Task', 'Hours per Day'],
                            ['Guests from TPP: 1000', 11],
                            ['Guests from TPM: 1000', 20],
                            ['Guests from outside: 1000', 20],
                        ]}
                        options={{
                            slices: {
                                0: { color: 'red' },
                                1: { color: '#494949' },
                            },
                        }}
                        rootProps={{ 'data-testid': '1' }}
                    />
                    <Chart
                        width={'100%'}
                        height={'500px'}
                        chartType="BarChart"
                        loader={<div>Loading Chart</div>}
                        data={[
                            ['Guests', 'Guests'],
                            ['Hotel wbsite', 100],
                            ['Hungry hub', 379],
                            ['Facebook referal', 269],
                            ['Google search', 209],
                            ['Instagram referal', 152],
                            ['Hotel referal', 152],
                            ['Other hotel referal', 152],
                            ['Agent referal', 152],
                            ['Walk in', 152],
                            ['Other', 152]
                        ]}
                    options={{
                        chartArea: { width: '50%' },
                        hAxis: {
                        minValue: 0,
                        },
                    }}
                    // For tests
                    rootProps={{ 'data-testid': '1' }}
                    />
                <div className="outlet-table-data-comments">
                        <div style={{fontSize: "40px"}}><i class="fas fa-comments"></i><h4>Source of business</h4></div>
                        <div className="outlet-table--data-comment-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae vero sed corrupti et molestias nostrum officiis eveniet autem cupiditate sint!
                    </div>
                </div>
            </div>
            <div className="pie-chart-container">
                <h4 className="outlet-table-data-header">Events</h4>
                <div>Events</div>
                <div className="outlet-table-data-comments">
                        <div style={{fontSize: "40px"}}><i class="fas fa-comments"></i><h4>Events</h4></div>
                        <div className="outlet-table--data-comment-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae vero sed corrupti et molestias nostrum officiis eveniet autem cupiditate sint!
                    </div>
                </div>
            </div>
        </main>
        </>
    )
}

export default OutletTableData
