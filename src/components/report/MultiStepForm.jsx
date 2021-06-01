import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {Stepper, Step, StepLabel, Grid, Button, Paper} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import axios from 'axios';
import './MultiStepForm.css';
import StepFour from './StepFour';


function MultiStepForm() {

    //STEPS FOR MULTISTEP FORM
    const [activeStep, setActiveStep] = useState(0);

    function getSteps() {
        return ["General", "Revenue", "Source", "Comments"];
    }
    const steps = getSteps();

    //STEP ONE FORM

    //RESTAURANT
    const [restaurant, setRestaurant] = useState('');
    const [restaurantUndefined, setRestaurantUndefined] = useState(false);

    const handleChangeRestaurant = e => {
        setRestaurant(e.target.value)
        setRestaurantUndefined(false)
    }

    //PUBLIC HOLLIDAY
    const [isPublicHoliday, setIsPublicHoliday] = useState('');
    const [isPublicHolidayUndefined, setIsPublicHolidayUndefined] = useState(false);
    const [isPublicHolidayChecked, setIsPublicHolidayChecked] = useState(false)
    const [isNotPublicHolidayChecked, setNotIsPublicHolidayChecked] = useState(false)

    const handleClickIsPublicHoliday = () => {
        setIsPublicHolidayChecked(!isPublicHolidayChecked)
        setNotIsPublicHolidayChecked(isPublicHolidayChecked)
    }
    const handleClickIsNotPublicHoliday = () => {
        setNotIsPublicHolidayChecked(!isNotPublicHolidayChecked)
        setIsPublicHolidayChecked(isNotPublicHolidayChecked)
    }

    const handleChangeIsPublicHoliday = e => {
        e.preventDefault()
        if(e.target.value === "yes") {
            setIsPublicHoliday(true);
            setIsPublicHolidayUndefined(false)
        }
        else if(e.target.value === "no") {
            setIsPublicHoliday(false);
            setIsPublicHolidayUndefined(false)
        }
        else {
            setIsPublicHoliday('');
        }
    }

    //WEATHER
    const [weather, setWeather] = useState([]);

    const [weatherUndefined, setWeatherUndefined] = useState(false)

    const handleChangeWeather = e => {
        let dataWeather = weather;
        dataWeather.push(e.target.value)
        setWeather(dataWeather)
    }
    const [isSunnyChecked, setIsSunnyChecked] = useState(false)
    const isWeatherSunny = () => {
        setIsSunnyChecked(!isSunnyChecked)
        setWeatherUndefined(false)
    }
    const [isPartiallyCloudyChecked, setIsPartiallyCloudy] = useState(false)
    const isWeatherPartiallyCloudy = () => {
        setIsPartiallyCloudy(!isPartiallyCloudyChecked)
        setWeatherUndefined(false)
    } 
    const [isOvercastChecked, setIsOvercastChecked] = useState(false)
    const isWeatherOvercast = () => {
        setIsOvercastChecked(!isOvercastChecked)
        setWeatherUndefined(false)
    }
    const [isRainChecked, setIsRainChecked] = useState(false)
    const isWeatherRain = () => {
        setIsRainChecked(!isRainChecked)
        setWeatherUndefined(false)
    }
    const [isShowersChecked, setIsShowersChecked] = useState(false)
    const isWeatherShowers = () => {
        setIsShowersChecked(!isShowersChecked)
        setWeatherUndefined(false)
    }
    const [isStormyChecked, setIsStormyChecked] = useState(false)
    const isWeatherStormy = () => {
        setIsStormyChecked(!isStormyChecked)
        setWeatherUndefined(false)
    }

    //EVENTS
    const [eventsUndefined, setEventsUndefined] = useState(false)
    const [events, setEvents] = useState([])
    const [selectedEvent, setSelectedEvent] = useState('')

    const handleChangeEvents = e => {
        let dataEvents = events;
        dataEvents.push(e.target.value)
        setEvents(dataEvents)
        setSelectedEvent(e.target.value)
        setEventsUndefined(false)
    }

    //FETCH EVENTS FROM API AND STORE IT IN EVENTS
    const sendGetRequest = async (url) => {
        try {
            const res = await axios.get(url);
            console.log(res.data);
            console.log('successfull get request')
            setEvents(res.data)
        } catch (err) {
            // Handle Error Here
            console.error(err);
        }
    };
    useEffect(() => {
        let url = 'https://localhost:44306/api/LocalEvent'
        sendGetRequest(url)
    }, []) 


    //STEP TWO FORM

    //TABLES
    const [tablesUndefined, setTablesUndefined] = useState(false)
    const [tables, setTables] = useState('');

    const handleChangeTables = input => e => {
        setTables({[input]: e.target.value})
        setTablesUndefined(false)
    }

    //FOOD REVENUE
    const [foodRevenueUndefined, setFoodRevenueUndefined] = useState(false)
    const [foodRevenue, setFoodRevenue] = useState('');

    const handleChangeFoodRevenue = input => e => {
        setFoodRevenue({[input]: e.target.value})
        setFoodRevenueUndefined(false)
    }

    //BEVERAGE REVENUE
    const [beverageRevenueUndefined, setBeverageRevenueUndefined] = useState(false)
    const [beverageRevenue, setBeverageRevenue] = useState('');

    const handleChangeBeverageRevenue = input => e => {
        setBeverageRevenue({[input]: e.target.value})
        setBeverageRevenueUndefined(false)
    }

    //OTHER REVENUE
    const [otherRevenueUndefined, setOtherRevenueUndefined] = useState(false)
    const [otherRevenue, setOtherRevenue] = useState('');

    const handleChangeOtherRevenue = input => e => {
        setOtherRevenue({[input]: e.target.value})
        setOtherRevenueUndefined(false)
    }

    //FILE TRANSFER, CASH REGISTRY
    const [fileUndefined, setFileUndefined] = useState()
    const [file, setFile] = useState("");

    const handleChangeFile = e => {
        let files = e.target.files;
        console.log()
        setFile(e.target.files[0].name)
        setFileUndefined(false)
        let reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload= (e) => {
            console.log(e.target.result)
            
            // const url = "url to api";
            // const formData={file:e.target.result}
            // return post(url, formData)
            // .then(response => console.log(response))
        }
    }

    //STEP THREE FORM

    //HOTEL 1
    const [hotelOneGuestsUndefined, setHotelOneGuestsUndefined] = useState(false)
    const [hotelOneGuests, setHotelOneGuests] = useState('');

    const handleChangeHotelOneGuests = input => e => {
        setHotelOneGuests({[input]: e.target.value})
        setHotelOneGuestsUndefined(false)
    }

    //HOTEL 2
    const [hotelTwoGuestsUndefined, setHotelTwoGuestsUndefined] = useState(false)
    const [hotelTwoGuests, setHotelTwoGuests] = useState('');

    const handleChangeHotelTwoGuests = input => e => {
        setHotelTwoGuests({[input]: e.target.value})
        setHotelTwoGuestsUndefined(false)
    }

    //GUESTS FROM OUTSIDE
    const [outsideGuestsUndefined, setOutsideGuestsUndefined] = useState(false)
    const [outsideGuests, setOutsideGuests] = useState('');

    const handleChangeOutsideGuests = input => e => {
        setOutsideGuests({[input]: e.target.value})
        setOutsideGuestsUndefined(false)
    }

    //SOURCE OF OUTSIDE GUESTS
    const [sourceOfBusinessUndefined, setSourceOfBusinessUndefined] = useState(false)
    const [sourceOfBusiness, setSourceOfBusiness] = useState('');
    //holds api response from source of business
    const [source, setSource] = useState([]);

    const sendGetRequestSource = async (url) => {
        try {
            const res = await axios.get(url);
            console.log(res.data);
            console.log('successfull get request')
            setSource(res.data)
        } catch (err) {
            // Handle Error Here
            console.error(err);
        }
    };
    useEffect(() => {
        let url = 'https://localhost:44306/api/GuestSourceOfBusiness'
        sendGetRequestSource(url)
    }, []) 

    const handleChangeSourceOfBusiness = (e) => {
        setSourceOfBusiness(e.target.value);
        setSourceOfBusinessUndefined(false)
    }

    //Data to be sent to api
    const dataToPost = {
        Tables: parseInt(tables.tables),
        IsPublicHoliday: isPublicHoliday,
        UserId: "b0b22e53-3ad2-4a0a-9e58-aa0a70a5a157",
        EventNotes: "HARD CODED",
        OutletId: 1,
        GSourceOfBusiness: 1,
        LocalEventsId: 1,
        Date: "2021-05-06T11:55:37.934Z",
        GuestsFromHotel: 1,
        GuestsFromOutsideHotel: 1,
        GuestSourceOfBusinesses: {
            guestSourceOfBusinessId: 1,
            gsobNrOfGuests: 10
        },
        OtherIncome: parseInt(otherRevenue.otherrevenue),
        File: "1",
        Food: parseInt(foodRevenue.foodrevenue),
        Beverage: parseInt(beverageRevenue.beveragerevenue)
        }

    //POST REQUEST
    const sendPostRequest = async (data) => {
        try {
            const res = await axios.post('https://localhost:44306/api/FbReports', data);
            console.log(data);
            console.log(res.data);
            console.log('successfull post request');
        } catch (err) {
            // Handle Error Here
            console.error(err);
            console.log('error with post request');
        }
    };

    //FUNCTIONS FOR PREV AND NEXT BUTTONS WITH ERROR HANDLING
    const handleNext = (e) => {
        e.preventDefault();
        
        if(activeStep === 0) {
            //sets undefined to true for error styling
            if(restaurant === "") {
                setRestaurantUndefined(true)
            }
            if(isPublicHolidayChecked === false && isNotPublicHolidayChecked === false) {
                setIsPublicHolidayUndefined(true)
            }
            if(
                isSunnyChecked === false &&
                isPartiallyCloudyChecked === false &&
                isOvercastChecked === false &&
                isRainChecked === false &&
                isShowersChecked === false &&
                isStormyChecked === false
                ) {
                setWeatherUndefined(true)
            }
            if(selectedEvent === '') {
                setEventsUndefined(true)
            }
            //return when clicking next button if not all fields have values
            if(!restaurant) {
                return
            }
            else if(isPublicHolidayChecked === false && isNotPublicHolidayChecked === false) {
                return
            }
            else if(                
                isSunnyChecked === false &&
                isPartiallyCloudyChecked === false &&
                isOvercastChecked === false &&
                isRainChecked === false &&
                isShowersChecked === false &&
                isStormyChecked === false) {
                    return
                }
            else if(selectedEvent === '') {
                return
            }
        }
        if(activeStep === 1) {
            //sets undefined to true for error styling
            if(tables === "") {
                setTablesUndefined(true)
            }
            if(foodRevenue === "") {
                setFoodRevenueUndefined(true)
            }
            if(beverageRevenue === "") {
                setBeverageRevenueUndefined(true)
            }
            if(otherRevenue === "") {
                setOtherRevenueUndefined(true)
            }
            if(file === "") {
                setFileUndefined(true)
            }
            //return when clicking next button if not all fields have values
            if(!tables) {
                return
            }
            else if(!foodRevenue) {
                return
            }
            else if(!beverageRevenue) {
                return
            }
            else if(!otherRevenue) {
                return
            }
            else if(!file) {
                return
            }
        }
        if(activeStep === 2) {
            //sets undefined to true for error styling
            if(hotelOneGuests === "") {
                setHotelOneGuestsUndefined(true)
            }
            if(hotelTwoGuests === "") {
                setHotelTwoGuestsUndefined(true)
            }
            if(outsideGuests === "") {
                setOutsideGuestsUndefined(true)
            }
            if(sourceOfBusiness === "") {
                setSourceOfBusinessUndefined(true)
            }
            //return when clicking next button if not all fields have values
            if(!hotelOneGuests) {
                return
            }
            else if(!hotelTwoGuests) {
                return
            }
            else if(!outsideGuests) {
                return
            }
            else if(!sourceOfBusiness) {
                return
            }
        }
        setActiveStep(prevActiveStep => prevActiveStep + 1)
        if(activeStep >= 3) {
            console.log(dataToPost)
            sendPostRequest(dataToPost)
        }
    }
    const handlePrev = (e) => {
        e.preventDefault();
        setActiveStep(prevActiveStep => prevActiveStep - 1)   
    }

    //Styles
    const useStyles = makeStyles({
        root: {
            paddingTop: 2,
            "& .MuiStepIcon-root.MuiStepIcon-completed": {
                color: "#1bbd7e"
            }
        }
    })

    function getStepsContent(stepIndex) {
        switch(stepIndex) {
            case 0:
                return <StepOne 
                    //restaurants
                    restaurantUndefined={restaurantUndefined}
                    restaurant={restaurant}
                    handleChangeRestaurant={handleChangeRestaurant}
                    //public holiday
                    isPublicHolidayUndefined={isPublicHolidayUndefined}
                    isPublicHoliday={isPublicHoliday}
                    handleClickIsPublicHoliday={handleClickIsPublicHoliday}
                    handleClickIsNotPublicHoliday={handleClickIsNotPublicHoliday}
                    handleChangeIsPublicHoliday={handleChangeIsPublicHoliday}
                    isPublicHolidayChecked={isPublicHolidayChecked}
                    isNotPublicHolidayChecked={isNotPublicHolidayChecked}
                    //weather
                    weather={weather}
                    weatherUndefined={weatherUndefined}
                    isSunnyChecked={isSunnyChecked}
                    isWeatherSunny={isWeatherSunny}
                    isPartiallyCloudyChecked={isPartiallyCloudyChecked}
                    isWeatherPartiallyCloudy={isWeatherPartiallyCloudy}
                    isOvercastChecked={isOvercastChecked}
                    isWeatherOvercast={isWeatherOvercast}
                    isRainChecked={isRainChecked}
                    isWeatherRain={isWeatherRain}
                    isShowersChecked={isShowersChecked}
                    isWeatherShowers={isWeatherShowers}
                    isStormyChecked={isStormyChecked}
                    isWeatherStormy={isWeatherStormy}
                    handleChangeWeather={handleChangeWeather}
                    //events
                    eventsUndefined={eventsUndefined}
                    selectedEvent={selectedEvent}
                    events={events}
                    handleChangeEvents={handleChangeEvents}
                />;
            case 1:
                return <StepTwo
                    //tables
                    tablesUndefined={tablesUndefined}
                    tables={tables}
                    handleChangeTables={handleChangeTables}
                    //food revenue
                    foodRevenueUndefined={foodRevenueUndefined}
                    foodRevenue={foodRevenue}
                    handleChangeFoodRevenue={handleChangeFoodRevenue}
                    //beverage revenue
                    beverageRevenueUndefined={beverageRevenueUndefined}
                    beverageRevenue={beverageRevenue}
                    handleChangeBeverageRevenue={handleChangeBeverageRevenue}
                    //other revenue
                    otherRevenueUndefined={otherRevenueUndefined}
                    otherRevenue={otherRevenue}
                    handleChangeOtherRevenue={handleChangeOtherRevenue}
                    //file
                    fileUndefined={fileUndefined}
                    file={file}
                    handleChangeFile={handleChangeFile}
                />;
            case 2: 
                return <StepThree 
                    //hotel one guests 
                    hotelOneGuestsUndefined={hotelOneGuestsUndefined}
                    hotelOneGuests={hotelOneGuests}
                    handleChangeHotelOneGuests={handleChangeHotelOneGuests}
                    //hotel two guests 
                    hotelTwoGuestsUndefined={hotelTwoGuestsUndefined}
                    hotelTwoGuests={hotelTwoGuests}
                    handleChangeHotelTwoGuests={handleChangeHotelTwoGuests}
                    //outside guests
                    outsideGuestsUndefined={outsideGuestsUndefined}
                    outsideGuests={outsideGuests}
                    handleChangeOutsideGuests={handleChangeOutsideGuests}
                    //source of business
                    sourceOfBusinessUndefined={sourceOfBusinessUndefined}
                    source={source}
                    handleChangeSourceOfBusiness={handleChangeSourceOfBusiness}
                />

                
            case 3: 
                return <StepFour 

                />;
            default:
                return "Error, something went wrong"
        }
    }

    const classes = useStyles();

    return (
        <div style={{backgroundColor: "#494949", height: 860}}>
            <div className={classes.root}>
                <Paper className="multistepform-paper" elevation={10} >
                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map(label => (
                        <Step key={label}>
                            <StepLabel>
                                {label}
                            </StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <br />
                {activeStep === steps.length ? 
                    <>
                        <h2 style={{ marginTop: 20, textAlign: 'center'}}>Thanks for your submission</h2>
                        <div style={{textAlign: ' center'}}><i className="fas fa-grin-wink" style={{marginTop: 60, fontSize: '200px', color: '#1bbd7e'}}></i></div>
                    </>
                :(
                    <>    
                        {getStepsContent(activeStep)}
                        <Grid style={{display: 'flex', justifyContent: 'center', marginTop: '20px'}}>
                            <Link to="/home" style={{textDecoration: 'none'}}>{activeStep <= 0 ?
                                <Button color="primary" variant="contained" style={{marginTop: '60px', margin: ' 10px', width: '95px'}} >
                                    Cancel
                                </Button> : ''}</Link>
                            {activeStep > 0 ?
                            <Button color="primary" variant="contained" style={{marginTop: '60px', margin: ' 10px', width: '95px'}} onClick={handlePrev}>
                                Prev
                            </Button> : ''}
                            <Button color="primary" variant="contained" style={{margin: ' 10px', width: '95px'}} onClick={handleNext}>
                                {activeStep === steps.length - 1 ? "Submit" : "Next"}
                            </Button>
                        </Grid>
                    </>
                )}
                </Paper>
            </div>
        </div>
    )
}

export default MultiStepForm
