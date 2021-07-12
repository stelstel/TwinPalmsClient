import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from "../../../App";
import DatePicker from "../DatePicker/DatePicker";
import { Button } from "../../home/Button"
import { Chart } from "react-google-charts";
import axios from "axios";
import "./OutletTableData.css";

function OutletTableData ( { activeOutlet, fromDate, toDate, handleChange, loggedInUserOutlets, onClickOutlet } ) {

    /*public holiday,
      weather, */


    //Variables for get get request
    const allOutlets = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    const [allOutletInex, setAllOutletIndex] = useState(activeOutlet - 1)

    //Date, weather, public holiday
    
    const user = useContext(UserContext);

    const [activeOutletName, setActiveOutletName] = useState("")
    

    let [outletData, setOutletData] = useState({localEventId: []})

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
        hotelWebsite: 0,
        hungryHub: 0,
        facebookReferral: 0,
        googleSearch: 0,
        instagramReferral: 0,
        hotelReferral: 0,
        otherHotelReferral: 0,
        agentReferral: 0,
        walkIn: 0,
        other: 0,
        gSourceOfBusinessNotes: "",
        localEventId: [],
        eventNotes: "",  
        notes: "",
        imagepath: undefined,
        active: false

    }
    
    //GET REQUEST FOR FBREPORTS FROM DATEPICKER VALUES
    useEffect(() => {


    //FETCH EVENTS FROM API AND STORE IT IN EVENTS
    const sendGetRequest = async (outlet) => {
        try {
            console.log("Trying get request from: ", `https://localhost:44306/outlets/fbReports?outletIds=${outlet}&fromDate=${fromDate}&toDate=${toDate}`)
            const { data } = await axios.get(`https://localhost:44306/outlets/fbReports?outletIds=${outlet}&fromDate=${fromDate}&toDate=${toDate}`);
            console.log(data)
            data.forEach((item) => {
                
                
                //Checking if item length is 10 to filter out seeded data
                if(item.gsobNrOfGuest.length === 10) {

                    restaurantData.hotelWebsite += parseInt(item.gsobNrOfGuest[0])
                    restaurantData.hungryHub += parseInt(item.gsobNrOfGuest[1])
                    restaurantData.facebookReferral += parseInt(item.gsobNrOfGuest[2])
                    restaurantData.googleSearch += parseInt(item.gsobNrOfGuest[3])
                    restaurantData.instagramReferral += parseInt(item.gsobNrOfGuest[4])
                    restaurantData.hotelReferral += parseInt(item.gsobNrOfGuest[5])
                    restaurantData.otherHotelReferral += parseInt(item.gsobNrOfGuest[6])
                    restaurantData.agentReferral += parseInt(item.gsobNrOfGuest[7])
                    restaurantData.walkIn += parseInt(item.gsobNrOfGuest[8])
                    restaurantData.other += parseInt(item.gsobNrOfGuest[9])
                }
                   
            })

            data.forEach((item) => {
    
                restaurantData.tables += item.tables
                restaurantData.food += item.food
                restaurantData.beverage += item.beverage
                restaurantData.otherIncome += item.otherIncome
                restaurantData.totalIncome += (item.food + item.beverage + item.otherIncome)
                if(restaurantData.notes === "") {
                    restaurantData.notes = item.notes //Gets 1 comment
                }
                else {
                    restaurantData.notes= false
                }

                restaurantData.guestsFromHotelTP += item.guestsFromHotelTP
                restaurantData.guestsFromHotelTM += item.guestsFromHotelTM
                restaurantData.guestsFromOutsideHotel += item.guestsFromOutsideHotel
                restaurantData.totalGuests += (item.guestsFromHotelTP + item.guestsFromHotelTM + item.guestsFromOutsideHotel)
                restaurantData.avgSpendPerGuest = (restaurantData.totalIncome / restaurantData.totalGuests)


                restaurantData.guestSourceOfBusinesses += item.guestSourceOfBusinesses //unused
                restaurantData.gsobNrOfGuest += item.gsobNrOfGuest //unused
                if(restaurantData.gSourceOfBusinessNotes === "") {
                    restaurantData.gSourceOfBusinessNotes = item.gSourceOfBusinessNotes //Gets 1 comment
                }
                else {
                    restaurantData.gSourceOfBusinessNotes = false
                }
            

            // restaurantData.localEventId += localEvents
            restaurantData.localEventId.push(item.localEventId)

            localEvents.push({id: item.localEventId, localEventName: ""})
            
            if(restaurantData.eventNotes === "") {
                restaurantData.eventNotes = item.eventNotes // Gets 1 comment
            }
            else {
                restaurantData.eventNotes = false
            }

            if(restaurantData.imagepath === undefined && item.imagepath !== "fakeImagePath") {
                restaurantData.imagepath = `http://localhost:5000/${item.imagepath}`
            }
            else {
                restaurantData.imagepath = false
            }
         
            restaurantData.active = true

        })
            setOutletData(restaurantData)
        } catch (err) {
            // Handle Error Here
            console.error(err);
            setOutletData("")
        }
    };
        sendGetRequest(allOutlets[allOutletInex]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fromDate, toDate, allOutlets[allOutletInex]]);

    const getOutlets = async () => {
        const { data } = await axios('https://localhost:44306/api/Outlets');

        let restaurantName;

        data.forEach((item) => {
            if(item.id === allOutlets[allOutletInex]) {
                return restaurantName = item.name
            }
        })
        setActiveOutletName(restaurantName);
      };
      useEffect(() => {
        getOutlets();
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [allOutletInex]);

      //FILTERS ON AVAILABLE OUTLETS WHEN CLICKING PREV & NEXT BUTTONS
      const handleNext = () => {
            //Runs logic if user has access to both companies
            if(loggedInUserOutlets.length === 12 && loggedInUserOutlets[0] === 1 && loggedInUserOutlets[11] === 12) {
                if(allOutletInex < 11) {
                    setAllOutletIndex(prev => prev + 1)
                }
            }
            //Runs logic if user has access to comapny 1
            if(loggedInUserOutlets.length === 6 && loggedInUserOutlets[0] === 1 && loggedInUserOutlets[5] === 6) {
                if(allOutletInex < 5) {
                    setAllOutletIndex(prev => prev + 1)
              }
            }
            //Runs logic if user has access to company 2
            if(loggedInUserOutlets.length === 6 && loggedInUserOutlets[0] === 7 && loggedInUserOutlets[5] === 12) {
                if(allOutletInex < 11) {
                    setAllOutletIndex(prev => prev + 1)
                }
            }
    }
      const handlePrev = () => {

        //Runs logic if user has access to both companies
        if(loggedInUserOutlets.length === 12 && loggedInUserOutlets[0] === 1 && loggedInUserOutlets[11] === 12) {
            if(!allOutletInex < 1) {
                setAllOutletIndex(prev => prev - 1)
        }
        }
        //Runs logic if user has access to comapny 1
        if(loggedInUserOutlets.length === 6 && loggedInUserOutlets[0] === 1 && loggedInUserOutlets[5] === 6) {
            if(!allOutletInex < 1) {
                setAllOutletIndex(prev => prev - 1)
          }
        }
        //Runs logic if user has access to company 2
        if(loggedInUserOutlets.length === 6 && loggedInUserOutlets[0] === 7 && loggedInUserOutlets[5] === 12) {
            if(allOutletInex > 6) {
                setAllOutletIndex(prev => prev - 1)
        }
        }
    }       


        
        //GET LOCALEVENTS FROM DATABASE AND SETS NUMBER OF REPORTS FOR EACH EVENT FROM CURRENT
        //OUTLETFBREPORTS REQUEST
        
        const [reportedEvents, setReportedEvents] = useState()
        let arr = []
        useEffect(() => {      
            
            const sendGetRequest = async () => {


                //GET REQUEST FOR ALL LOCAL EVENTS
                const { data } = await axios('https://localhost:44306/api/LocalEvent');

                data.forEach((event) => {
                    
                    arr.push({id: event.id, event: event.event, reports: 0})
                })
                if(outletData.localEventId !== undefined) {

                outletData.localEventId.forEach((id) => {
                    if(id !== null) {
                        arr[id - 1].reports = arr[id - 1].reports + 1
                    }   
                })
                }
                setReportedEvents(arr)
            } 
            sendGetRequest(); 
            
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [outletData]);


      

    return (
        <>
        <main style={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
            <div style={{display: "flex", justifyContent: "center"}}>
                <button className="outlet-table-overview-btn" onClick={onClickOutlet}>Back to overview</button>
            </div>
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
                    
                        {
                        outletData.totalIncome 
                        ? <td className="datareport-td">{Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB' }).format(outletData.totalIncome)}</td>
                        : <td className="datareport-td-error">Not reported</td>
                        }
                        {
                        outletData.totalGuests 
                        ? <td className="datareport-td">{outletData.totalGuests}</td>
                        : <td className="datareport-td-error">Not reported</td>
                        }
                        {
                        outletData.tables
                        ? <td className="datareport-td">{outletData.tables}</td>
                        : <td className="datareport-td-error">Not reported</td>
                        }
                        {
                        outletData.avgSpendPerGuest
                        ? <td className="datareport-td">{Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB' }).format(outletData.avgSpendPerGuest)}</td>
                        : <td className="datareport-td-error">Not reported</td>
                        }
                    </tr>
                </tbody>
            </table>
            {outletData.active ?
            <div>
            {outletData.notes &&
            <div className="outlet-table-data-comments">
                    <div style={{fontSize: "40px"}}>
                        <i className="fas fa-comments"></i>
                        <h4>Comments</h4>
                    </div>
                    <div className="outlet-table--data-comment-text">
                        {outletData.notes && outletData.notes !== "undefined"
                        ? outletData.notes
                        : "No comments made"}
                    </div>
            </div>
            }

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
                {outletData.imagepath && 
                    <div className="outlet-table-data-comments">
                        <div style={{fontSize: "40px"}}>
                        <i className="fas fa-image"></i>
                        <h4>Cash registry picture</h4>
                                {/* <Button>Show</Button> */}
                                <a href={outletData.imagepath} target="_blank" rel="noreferrer"><Button>Show cash registry</Button></a>
                        </div>
                    </div>
                }
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
                            ['Hotel website', outletData.hotelWebsite],
                            ['Hungry Hub', outletData.hungryHub],
                            ['Facebook referral', outletData.facebookReferral],
                            ['Google search', outletData.googleSearch],
                            ['Instagram referral', outletData.instagramReferral],
                            ['Hotel referral', outletData.hotelReferral],
                            ['Other hotel referral', outletData.otherHotelReferral],
                            ['Agent referral', outletData.agentReferral],
                            ['Walk in', outletData.walkIn],
                            ['Other', outletData.other]
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
                {
                outletData.gSourceOfBusinessNotes &&
                <div className="outlet-table-data-comments">
                    <div style={{fontSize: "40px"}}>
                        <i className="fas fa-comments"></i>
                        <h4>Source of business</h4>
                    </div>
                    <div className="outlet-table--data-comment-text">
                        {
                        outletData.gSourceOfBusinessNotes && outletData.gSourceOfBusinessNotes !== "undefined"
                        ? outletData.gSourceOfBusinessNotes 
                        : "No comments made"}
                    </div>
                </div>
                }
                
            </div>

            <div className="pie-chart-container">
                <h4 className="outlet-table-data-header">Events</h4>
                <div className="reported-events-container">
                    {
                    reportedEvents ? 
                    reportedEvents.map((item, key) => {
                        if(item.reports !== 0) {
                            return <div key={key}>{item.event} x {item.reports}</div>
                        }
                        return null
                    })
                    : <div>No reported events</div>
                    }
                </div>
                {outletData.eventNotes  &&
                <div className="outlet-table-data-comments">
                        <div style={{fontSize: "40px"}}>
                            <i className="fas fa-comments"></i>
                            <h4>Events</h4>
                        </div>
                        <div className="outlet-table--data-comment-text">
                            {outletData.eventNotes && outletData.eventNotes !== "undefined"
                            ? outletData.eventNotes 
                            : "No comments made"}
                        </div>
                </div>
                }
            </div>
            </div>
            : <h1 style={{borderBottom: "1px solid #fff", fontSize: "25px", fontWeight: "500", height: "100%", width: "100vw", padding: "60px", backgroundColor: "#494949", color: "white", margin: "0px", textAlign: "center"}}>Nothing to report</h1>
            }
        </main>
        </>
    )
}

export default OutletTableData
