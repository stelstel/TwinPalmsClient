import React, { useState, useEffect } from 'react'
import axios from 'axios'

function Overview() {

    const [fbReport, setFbReport] = useState()

    const [fromDate, setFromDate] = useState("")
    const [toDate, setToDate] = useState("")


    const url = `https://localhost:44306/outlets/fbReports?outletIds=1&fromDate=${fromDate}&toDate=${toDate}`;

    const sendGetRequest = async () => {
        const { data } = await axios(url)
        console.log(data)
        setFbReport(data)
    }

    useEffect(() => {
        sendGetRequest()
    }, [fromDate, toDate])

    return (
        <>
        <input type="text" onChange={e => setFromDate(e.target.value)}/>
        <input type="text" onChange={e => setToDate(e.target.value)}/>
            {
                fbReport &&
                fbReport.map((obj, key) => {
                        console.log(obj)
                    return (
                        <section key={key}>
                            {
                                Object.entries(obj).map(([key, value]) => {
                                    if(key === "gsobNrOfGuest" || key === "guestSourceOfBusinesses" || key === "weathers") {
                                        //Theese are nested arrays with object, we have to map throught theese again or something
                                        console.log(value)
                                    }
                                    else {
                                        return (
                                            <div style={{border: '1px solid black'}}>
                                                <div>{key}</div>
                                                <div>{value}</div>
                                            </div>
                                        )
                                    }

                                })
                            }
                        </section>
                    )
                })
            }
        </>
    )
}

export default Overview
