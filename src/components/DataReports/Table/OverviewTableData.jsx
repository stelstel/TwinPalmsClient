import {API_URL_OUTLETS_REVENUE} from "../utils/misc"
/* eslint-disable array-callback-return */
import React, { useState, useEffect } from "react";
import axios from "axios";
import Chart from "../Chart/Chart";
// style
import "./TableData.css";

export default function TableData( { user }) {

    //ARRAY HOLDING ALL OUTLET IDS LOGGED IN USER HAVE ACCESS TO
    const loggedInUserOutlets = [];
    //LOOPS THORUGH USERS COMPANIES AND GETS ALL OUTLET IDS
    user.companies.forEach((companies) => {

        for (const [key, value] of Object.entries(companies)) {
            if(key === "outlets") {
                value.forEach((outlet) => {
                    loggedInUserOutlets.push(outlet.id)
                })
            }
          }
    })

    //REACT HOOKS
    const [revenue, setRevenue] = useState({
        1: {
            restaurant: undefined,
            yesterdaysRev: undefined, 
            mtDs: undefined, 
            ytDs: undefined
        },
        2: {
            restaurant: undefined,
            yesterdaysRev: undefined, 
            mtDs: undefined, 
            ytDs: undefined
        },
        3: {
            restaurant: undefined,
            yesterdaysRev: undefined, 
            mtDs: undefined, 
            ytDs: undefined
        },
        4: {
            restaurant: undefined,
            yesterdaysRev: undefined, 
            mtDs: undefined, 
            ytDs: undefined
        },
        5: {
            restaurant: undefined,
            yesterdaysRev: undefined, 
            mtDs: undefined, 
            ytDs: undefined
        },
        6: {
            restaurant: undefined,
            yesterdaysRev: undefined, 
            mtDs: undefined, 
            ytDs: undefined
        },
        7: {
            restaurant: undefined,
            yesterdaysRev: undefined, 
            mtDs: undefined, 
            ytDs: undefined
        },
        8: {
            restaurant: undefined,
            yesterdaysRev: undefined, 
            mtDs: undefined, 
            ytDs: undefined
        },
        9: {
            restaurant: undefined,
            yesterdaysRev: undefined, 
            mtDs: undefined, 
            ytDs: undefined
        },
        10: {
            restaurant: undefined,
            yesterdaysRev: undefined, 
            mtDs: undefined, 
            ytDs: undefined
        },
        11: {
            restaurant: undefined,
            yesterdaysRev: undefined, 
            mtDs: undefined, 
            ytDs: undefined
        },
        12: {
            restaurant: undefined,
            yesterdaysRev: undefined, 
            mtDs: undefined, 
            ytDs: undefined
        },
    })
    
    
    //GET REQUEST FOR FBREPORTS FROM DATEPICKER VALUES
    useEffect(() => {

        const sendGetRequest = async () => {

        const { data } = await axios(API_URL_OUTLETS_REVENUE);

        setRevenue({
            1: {restaurant: "Catch Beach Club", yesterdaysRev: 0, mtDs: data.mtDs[1], ytDs: data.ytDs[1]},
            2: {restaurant: "The Lazy Coconut", yesterdaysRev: 0, mtDs: data.mtDs[2], ytDs: data.ytDs[2]},
            3: {restaurant: "Wagyu Steakhouse", yesterdaysRev: 0, mtDs: data.mtDs[3], ytDs: data.ytDs[3]},
            4: {restaurant: "Palm Seaside", yesterdaysRev: 0, mtDs: data.mtDs[4], ytDs: data.ytDs[4]},
            5: {restaurant: "Oriental Spoon", yesterdaysRev: 0, mtDs: data.mtDs[5], ytDs: data.ytDs[5]},
            6: {restaurant: "HQ Beach Lounge", yesterdaysRev: 0, mtDs: data.mtDs[6], ytDs: data.ytDs[6]},
            7: {restaurant: "Shimmer", yesterdaysRev: 0, mtDs: data.mtDs[7], ytDs: data.ytDs[7]},
            8: {restaurant: "Bake Laguna", yesterdaysRev: 0, mtDs: data.mtDs[8], ytDs: data.ytDs[8]},
            9: {restaurant: "Bake BIS", yesterdaysRev: 0, mtDs: data.mtDs[9], ytDs: data.ytDs[9]},
            10: {restaurant: "Bake Turtle Village", yesterdaysRev: 0, mtDs: data.mtDs[10], ytDs: data.ytDs[10]},
            11: {restaurant: "Bake Patong", yesterdaysRev: 0, mtDs: data.mtDs[11], ytDs: data.ytDs[11]},
            12: {restaurant: "Love Noodles", yesterdaysRev: 0, mtDs: data.mtDs[12], ytDs: data.ytDs[12]},
        })
        };

        sendGetRequest();
    }, []);

  return (
    <> 
        <div className="table-title">
          <h1>DATA REPORTS</h1>
        </div>
        <table className="datareport-table-container">
          <tbody>
            <tr className="datareport-th-container">
                <th className="datareport-th">Outlet</th>
                <th className="datareport-th">YDA</th>
                <th className="datareport-th">MTD</th>
                <th className="datareport-th">YTD</th>
            </tr>
            {revenue &&
            Object.entries(revenue).map((item, key) => {
    
                if(!loggedInUserOutlets.includes(parseInt(item[0]))){
                    console.log("User dont have accces to outletId", item[0])
                    return
                }
                else {
                    return (
                    <tr key={key} className="datareport-td-container">
                        
                        <td className="datareport-td">{item[1].restaurant}</td>
                        {
                        item[1].yesterdaysRev ? 
                        <td className="datareport-td">{Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB' }).format(item[1].yesterdaysRev)}</td> : 
                        <td className="datareport-td-error">Not reported</td>
                        }
                        {
                        item[1].mtDs ? 
                        <td className="datareport-td">{Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB' }).format(item[1].mtDs)}</td> : 
                        <td className="datareport-td-error">Not reported</td>
                        }
                        {
                        item[1].ytDs ? 
                        <td className="datareport-td">{Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB' }).format(item[1].ytDs)}</td> : 
                        <td className="datareport-td-error">Not reported</td>
                        }
                    </tr>
                    )
                }
            })
            }
            <tr className="datareport-total-td-container">
                <th className="datareport-total-td">Total</th>
                <th className="datareport-total-td">{Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB' }).format(1000)}</th>
                <th className="datareport-total-td">{Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB' }).format(1000)}</th>
                <th className="datareport-total-td">{Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB' }).format(1000)}</th>
            </tr>
        </tbody>
      </table>
      <Chart />
      </>
  );
}
