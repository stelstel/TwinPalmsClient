import {API_URL_OUTLETS_REVENUE} from "../utils/misc"
/* eslint-disable array-callback-return */
import React, { useState, useEffect } from "react";
import axios from "axios";
import Chart from "../Chart/Chart";
// style
import "./TableData.css";

export default function TableData( { user, getOutlet, loggedInUserOutlets }) {


    //REACT HOOKS
    const [revenue, setRevenue] = useState({
        1: {
            restaurantId: 1,
            restaurant: undefined,
            yesterdaysRev: undefined, 
            mtDs: undefined, 
            ytDs: undefined
        },
        2: {
            restaurantId: 2,
            restaurant: undefined,
            yesterdaysRev: undefined, 
            mtDs: undefined, 
            ytDs: undefined
        },
        3: {
            restaurantId: 3,
            restaurant: undefined,
            yesterdaysRev: undefined, 
            mtDs: undefined, 
            ytDs: undefined
        },
        4: {
            restaurantId: 4,
            restaurant: undefined,
            yesterdaysRev: undefined, 
            mtDs: undefined, 
            ytDs: undefined
        },
        5: {
            restaurantId: 5,
            restaurant: undefined,
            yesterdaysRev: undefined, 
            mtDs: undefined, 
            ytDs: undefined
        },
        6: {
            restaurantId: 6,
            restaurant: undefined,
            yesterdaysRev: undefined, 
            mtDs: undefined, 
            ytDs: undefined
        },
        7: {
            restaurantId: 7,
            restaurant: undefined,
            yesterdaysRev: undefined, 
            mtDs: undefined, 
            ytDs: undefined
        },
        8: {
            restaurantId: 8,
            restaurant: undefined,
            yesterdaysRev: undefined, 
            mtDs: undefined, 
            ytDs: undefined
        },
        9: {
            restaurantId: 9,
            restaurant: undefined,
            yesterdaysRev: undefined, 
            mtDs: undefined, 
            ytDs: undefined
        },
        10: {
            restaurantId: 10,
            restaurant: undefined,
            yesterdaysRev: undefined, 
            mtDs: undefined, 
            ytDs: undefined
        },
        11: {
            restaurantId: 11,
            restaurant: undefined,
            yesterdaysRev: undefined, 
            mtDs: undefined, 
            ytDs: undefined
        },
        12: {
            restaurantId: 12,
            restaurant: undefined,
            yesterdaysRev: undefined, 
            mtDs: undefined, 
            ytDs: undefined
        },
    })

    const [allOutletsMonthlyRev, setAllOutletsMonthlyRev] = useState()
    
    
    //GET REQUEST FOR FBREPORTS FROM DATEPICKER VALUES
    useEffect(() => {

        const sendGetRequest = async () => {

        const { data } = await axios(API_URL_OUTLETS_REVENUE);

        setRevenue({
            1: {restaurantId: 1, restaurant: "Catch Beach Club", yesterdaysRev: data.yesterdaysRevs[1], mtDs: data.mtDs[1], ytDs: data.ytDs[1]},
            2: {restaurantId: 2, restaurant: "The Lazy Coconut", yesterdaysRev: data.yesterdaysRevs[2], mtDs: data.mtDs[2], ytDs: data.ytDs[2]},
            3: {restaurantId: 3, restaurant: "Wagyu Steakhouse", yesterdaysRev: data.yesterdaysRevs[3], mtDs: data.mtDs[3], ytDs: data.ytDs[3]},
            4: {restaurantId: 4, restaurant: "Palm Seaside", yesterdaysRev: data.yesterdaysRevs[4], mtDs: data.mtDs[4], ytDs: data.ytDs[4]},
            5: {restaurantId: 5, restaurant: "Oriental Spoon", yesterdaysRev: data.yesterdaysRevs[5], mtDs: data.mtDs[5], ytDs: data.ytDs[5]},
            6: {restaurantId: 6, restaurant: "HQ Beach Lounge", yesterdaysRev: data.yesterdaysRevs[6], mtDs: data.mtDs[6], ytDs: data.ytDs[6]},
            7: {restaurantId: 7, restaurant: "Shimmer", yesterdaysRev: data.yesterdaysRevs[7], mtDs: data.mtDs[7], ytDs: data.ytDs[7]},
            8: {restaurantId: 8, restaurant: "Bake Laguna", yesterdaysRev: data.yesterdaysRevs[8], mtDs: data.mtDs[8], ytDs: data.ytDs[8]},
            9: {restaurantId: 9, restaurant: "Bake BIS", yesterdaysRev: data.yesterdaysRevs[9], mtDs: data.mtDs[9], ytDs: data.ytDs[9]},
            10: {restaurantId: 10, restaurant: "Bake Turtle Village", yesterdaysRev: data.yesterdaysRevs[10], mtDs: data.mtDs[10], ytDs: data.ytDs[10]},
            11: {restaurantId: 11, restaurant: "Bake Patong", yesterdaysRev: data.yesterdaysRevs[11], mtDs: data.mtDs[11], ytDs: data.ytDs[11]},
            12: {restaurantId: 12, restaurant: "Love Noodles", yesterdaysRev: data.yesterdaysRevs[12], mtDs: data.mtDs[12], ytDs: data.ytDs[12]},
        })
        setAllOutletsMonthlyRev(data.yearlyRev.monthlyRevs)
        // console.log("DATAAAAAAAAAA", data.yearlyRev.monthlyRevs)
        // console.log("DATA", data.yearlyRev.monthlyRevs[0])
        // setAllOutletsMonthlyRev({
        //     1: {restaurantId: data.yearlyRev.monthlyRevs[0].outletId}
        // })
        };
      
        sendGetRequest();
    }, []);

    const [ydaTotalRev, setYdaTotalRev] = useState()
    const [mtdTotalRev, setMtdTotalRev] = useState()
    const [ytdTotalRev, setYtdTotalRev] = useState()
    
    useEffect(() => {

        let ydaTotalRevenue = 0;
        let mtdTotalRevenue = 0;
        let ytdTotalRevenue = 0;
        
        Object.entries(revenue).map((item) => {
    
            if(!loggedInUserOutlets.includes(parseInt(item[0]))){
                // console.log("User dont have accces to outletId", item[0])
                return
            }

            if(item[1].yesterdaysRev !== undefined) {
                ydaTotalRevenue += item[1].yesterdaysRev
            }

            if(item[1].mtDs !== undefined) {
                mtdTotalRevenue += item[1].mtDs
            }

            if(item[1].ytDs !== undefined) {
                ytdTotalRevenue += item[1].ytDs
            }
        })
        setYdaTotalRev(ydaTotalRevenue)
        setMtdTotalRev(mtdTotalRevenue)
        setYtdTotalRev(ytdTotalRevenue)

        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [revenue]);




    


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
                    // console.log("User dont have accces to outletId", item[0])
                    return
                }
                else {
                    return (
                    <tr key={key} className="datareport-td-container">
                        <td onClick={() => getOutlet(item[1].restaurantId)} className="datareport-td datareportd-td-outlet">{item[1].restaurant}</td>
                        {
                        item[1].yesterdaysRev ? 
                        <td className="datareport-td">{Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB' }).format(item[1].yesterdaysRev)}</td> : 
                        <td className="datareport-td-error">Not reported</td>
                        }
                        {
                        item[1].mtDs ? 
                        <td className="datareport-td">{Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB' }).format(item[1].mtDs)}</td> : 
                        <td className="datareport-td-error"></td>
                        }
                        {
                        item[1].ytDs ? 
                        <td className="datareport-td">{Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB' }).format(item[1].ytDs)}</td> : 
                        <td className="datareport-td-error"></td>
                        }
                    </tr>
                    )
                }
            })
            }
            <tr className="datareport-total-td-container">
                <th className="datareport-total-td">Total</th>
                {
                    ydaTotalRev 
                    ? 
                    <th className="datareport-total-td">{Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB' }).format(ydaTotalRev)}</th>
                    :
                    <td className="datareport-td-error"></td>
                }
                {
                    mtdTotalRev
                    ? 
                    <th className="datareport-total-td">{Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB' }).format(mtdTotalRev)}</th>
                    :
                    <td className="datareport-td-error"></td>
                }
                {
                    ytdTotalRev
                    ? 
                    <th className="datareport-total-td">{Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB' }).format(ytdTotalRev)}</th>
                    :
                    <td className="datareport-td-error"></td>
                }
            </tr>
        </tbody>
      </table>
      <Chart allOutletsMonthlyRev={allOutletsMonthlyRev} loggedInUserOutlets={loggedInUserOutlets} />
      </>
  );
}
