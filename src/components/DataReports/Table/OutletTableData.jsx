import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from "../../../App";
import DatePicker from "../DatePicker/DatePicker";
import { Button } from "../../home/Button"
import { Chart } from "react-google-charts";
import axios from "axios";
import "./OutletTableData.css";

function OutletTableData ( { activeOutlet, fromDate, toDate, handleChange, loggedInUserOutlets } ) {

    console.log(loggedInUserOutlets.length)
    
    //Date, weather, public holiday

    const user = useContext(UserContext);

    const [activeOutletName, setActiveOutletName] = useState("")
    const [activeRestaurant, setActiveRestaurant] = useState(activeOutlet)

    let [outletData, setOutletData] = useState({})

    let localEvents = []

    let restaurantData = {
        //missing comments
        tables: 0,
        food: 0,
        beverage: 0,
        otherIncome: 0,
        totalIncome: 0,
        avgSpendPerGuest : 0,
        guestsFromHotelTP: 0,
        guestsFromHotelTM: 0,
        guestsFromOutsideHotel: 0,
        totalGuests: 0,
        guestSourceOfBusinesses: [], //unused
        gsobNrOfGuest: [], //unused
        gSourceOfBusinessNotes: "",
        localEventId: [],
        eventNotes: "",  
        active: false

    }
    
    //GET REQUEST FOR FBREPORTS FROM DATEPICKER VALUES
    useEffect(() => {


    //FETCH EVENTS FROM API AND STORE IT IN EVENTS
    const sendGetRequest = async () => {
        try {
            console.log("Trying get request from: ", `https://localhost:44306/outlets/fbReports?outletIds=${activeRestaurant}&fromDate=${fromDate}&toDate=${toDate}`)
            const { data } = await axios.get(`https://localhost:44306/outlets/fbReports?outletIds=${activeRestaurant}&fromDate=${fromDate}&toDate=${toDate}`);

        data.forEach((item) => {
 
            localEvents.push(item.localEventId)
            console.log(item)
            restaurantData.tables += item.tables
            restaurantData.food += item.food
            restaurantData.beverage += item.beverage
            restaurantData.otherIncome += item.otherIncome
            restaurantData.totalIncome += (item.food + item.beverage + item.otherIncome)

            restaurantData.guestsFromHotelTP += item.guestsFromHotelTP
            restaurantData.guestsFromHotelTM += item.guestsFromHotelTM
            restaurantData.guestsFromOutsideHotel += item.guestsFromOutsideHotel
            restaurantData.totalGuests += (item.guestsFromHotelTP + item.guestsFromHotelTM + item.guestsFromOutsideHotel)
            restaurantData.avgSpendPerGuest = (restaurantData.totalIncome / restaurantData.totalGuests)


            restaurantData.guestSourceOfBusinesses += item.guestSourceOfBusinesses //unused
            restaurantData.gsobNrOfGuest += item.gsobNrOfGuest //unused
            restaurantData.gSourceOfBusinessNotes = item.gSourceOfBusinessNotes //Gets 1 comment

            // restaurantData.localEventId += localEvents
            restaurantData.localEventId.push(item.localEventId)
            restaurantData.eventNotes = item.eventNotes // Gets 1 comment

            restaurantData.active = true
            console.log(restaurantData)

        })
            setOutletData(restaurantData)
        } catch (err) {
            // Handle Error Here
            console.error(err);
            setOutletData("")
        }
    };
        sendGetRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fromDate, toDate, activeRestaurant]);

    const getOutlets = async () => {
        const { data } = await axios('https://localhost:44306/api/Outlets');

        let restaurantName;

        data.forEach((item) => {
            if(item.id === activeRestaurant) {
                return restaurantName = item.name
            }
        })
        setActiveOutletName(restaurantName);
      };
      useEffect(() => {
        getOutlets();
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [activeRestaurant]);

      //FILTERS ON AVAILABLE OUTLETS WHEN CLICKING PREV & NEXT BUTTONS
      const [loggedInUserOutletsIndex, setLoggedInUserOutletsIndex] = useState(activeOutlet - 1)


      const handleNext = () => {
        if(loggedInUserOutletsIndex < loggedInUserOutlets.length - 1) {
            setLoggedInUserOutletsIndex(prev => prev + 1)
        }
    }

      const handlePrev = () => {
      
        if(loggedInUserOutletsIndex > 0) {   
            setLoggedInUserOutletsIndex(prev => prev - 1)
        }
    }       

    useEffect(() => {

        setActiveRestaurant(loggedInUserOutlets[loggedInUserOutletsIndex])

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loggedInUserOutletsIndex])

      

    return (
        <>
        <main style={{display: "flex", flexDirection: "column", justifyContent: "center"}}>

{/* public holiday,
weather, */}


            {/* <div> */}
            <div className="outlet-table-title">
                <button onClick={handlePrev}>Prev</button><h1>{activeOutletName}</h1><button onClick={handleNext}>Next</button>
            </div>
            <h4 className="statistic-date">
                <DatePicker user={user} handleChange={handleChange} />
            </h4>
            <table className="datareport-table-container" >
                <tbody>
                    <tr className="datareport-th-container" >
                        <th className="datareport-th">Reveneu</th>
                        <th className="datareport-th">Guests</th>
                        <th className="datareport-th">Tables & Checks</th>
                        <th className="datareport-th">Avg <span>&#3647;</span> /Guest</th>
                    </tr>
                    <tr className="datareport-td-container">
                        <td className="datareport-td">{outletData.totalIncome ? Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB' }).format(outletData.totalIncome) : "Not reported"}</td>
                        <td className="datareport-td">{outletData.totalGuests ? outletData.totalGuests : "Not Reported"}</td>
                        <td className="datareport-td">{outletData.tables ? outletData.tables : "Not reported"}</td>
                        <td className="datareport-td">{outletData.avgSpendPerGuest ? Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB' }).format(outletData.avgSpendPerGuest) : "Not reported"}</td>
                    </tr>
                </tbody>
            </table>
            {outletData.active ?
            <div>
            <div className="outlet-table-data-comments">
                        <div style={{fontSize: "40px"}}><i className="fas fa-comments"></i><h4>Comments</h4></div>
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
                        [`Food: ${Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB' }).format(outletData.food)}`, outletData.food],
                        [`Beverage: ${Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB' }).format(outletData.beverage)}`, outletData.beverage],
                        [`Other: ${Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB' }).format(outletData.otherIncome)}`, outletData.otherIncome],
                    ]}
                    options={{
                    }}
                    rootProps={{ 'data-testid': '1' }}
                />

                    <div className="outlet-table-data-comments">
                        <div style={{fontSize: "40px"}}>
                        <i className="fas fa-image"></i>
                        <h4>Cash registry picture</h4>
                                <Button>Show</Button>
                        </div>
                    </div>
                </div>

                {/* </div> */}
                <div className="pie-chart-container">
                    <h4 className="outlet-table-data-header">Source of business</h4>
                    <Chart
                        width={'100%'}
                        height={'300px'}
                        chartType="PieChart"
                        loader={<div>Loading Chart</div>}
                        data={[
                            ['Task', 'Hours per Day'],
                            [`Guests from TPP: ${outletData.guestsFromHotelTP}`, outletData.guestsFromHotelTP],
                            [`Guests from TPM: ${outletData.guestsFromHotelTM}`, outletData.guestsFromHotelTM],
                            [`Guests from outside: ${outletData.guestsFromOutsideHotel}`, outletData.guestsFromOutsideHotel],
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
                        <div style={{fontSize: "40px"}}><i className="fas fa-comments"></i><h4>Source of business</h4></div>
                        <div className="outlet-table--data-comment-text">{outletData.gSourceOfBusinessNotes ? outletData.gSourceOfBusinessNotes : "No comments made"}</div>
                </div>
            </div>

            <div className="pie-chart-container">
                <h4 className="outlet-table-data-header">Events</h4>
                <div>Events</div>
                <div className="outlet-table-data-comments">
                        <div style={{fontSize: "40px"}}><i className="fas fa-comments"></i><h4>Events</h4></div>
                        <div className="outlet-table--data-comment-text">{outletData.eventNotes ? outletData.eventNotes : "No comments made"}</div>
                </div>
            </div>
            </div>
            : <h1 style={{borderBottom: "1px solid #fff", fontSize: "25px", fontWeight: "500", height: "100%", width: "100vw", padding: "60px", backgroundColor: "#494949", color: "white", margin: "0px", textAlign: "center"}}>Nothing to report</h1>
            }
        </main>
        </>
    )
}

export default OutletTableData
