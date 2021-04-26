import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import {Stepper, Step, StepLabel, Grid, Button, Paper} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import axios from 'axios';
import './MultiStepForm.css';


function MultiStepForm() {


    //GET REQUEST
    const sendGetRequest = async () => {
        try {
            const res = await axios.get('https://localhost:44341/api/FbReports');
            console.log(res.data);
            console.log('successfull get request')
        } catch (err) {
            // Handle Error Here
            console.error(err);
        }
    };
    
    //POST REQUEST'
    const sendPostRequest = async (data) => {
        try {
            const res = await axios.post('https://localhost:44341/api/FbReports', data);
            console.log(data);
            console.log(res.data);
            console.log('successfull post request');
        } catch (err) {
            // Handle Error Here
            console.error(err);
            console.log(events);
        }
    };

    //Steps for multipage form, React Hooks
    const [activeStep, setActiveStep] = useState(0);

    function getSteps() {
        return ["General", "Revenue", "Source"];
    }
    const steps = getSteps();

    //Variable user and date
    const currentDate = new Date();
    const date = currentDate.toDateString();

    //Variables for step one form
    const [restaurant, setRestaurant] = useState('');
    const [weather, setWeather] = useState([]);
    const [events, setEvents] = useState([]);
    //Replace with get request to api
    const eventsHardcoded = ['Event1', 'Event2', 'Event3', 'Event4', 'Event5', 'Event6', 'Event7', 'Event8', 'Event9', 'Event10'];
    

    //Variables for step two form
    const [tables, setTables] = useState('');
    const [foodRevenue, setFoodRevenue] = useState('');
    const [beverageRevenue, setBeverageRevenue] = useState('');
    const [otherRevenue, setOtherRevenue] = useState('');
    // const [totalRevenue, setTotalRevenue] = useState('');
    // useEffect(() => {
    //     setTotalRevenue(parseInt(foodRevenue.foodrevenue) + parseInt(beverageRevenue.beveragerevenue) + parseInt(otherRevenue.otherrevenue))
    // }, [foodRevenue, beverageRevenue, otherRevenue])
    
    //Variables for step three form
    const [isPublicHoliday, setIsPublicHoliday] = useState('');
    const [hotelGuests, setHotelGuests] = useState('');
    const [outsideGuests, setOutsideGuests] = useState('');
    const [totalGuests, setTotalGuests] = useState('');
    // const [averageSpendPerGuest, setaverageSpendPerGuest] = useState('');
    const [sourceOfBusiness, setSourceOfBusiness] = useState('');
    useEffect(() => {
        setTotalGuests(parseInt(hotelGuests.hotelguests) + parseInt(outsideGuests.outsideguests))
    }, [hotelGuests, outsideGuests])
    // useEffect(() => {
    //     setaverageSpendPerGuest(totalRevenue / totalGuests)
    // }, [totalRevenue, totalGuests])

    //Functions for step one form
    const handleChangeRestaurant = e => {
        setRestaurant(e.target.value)
    }
    const handleChangeWeather = e => {
        let dataWeather = weather;
        dataWeather.push(e.target.value)
        setWeather(dataWeather)
    }
    const handleChangeEvents = e => {
        let dataEvents = events;
        dataEvents.push(e.target.value)
        setEvents(dataEvents)
    }

    //Functions for step two form
    const handleChangeTables = input => e => {
        setTables({[input]: e.target.value})
    }
    const handleChangeFoodRevenue = input => e => {
        setFoodRevenue({[input]: e.target.value})
    }
    const handleChangeBeverageRevenue = input => e => {
        setBeverageRevenue({[input]: e.target.value})
    }
    const handleChangeOtherRevenue = input => e => {
        setOtherRevenue({[input]: e.target.value})
    }

    //Functions for step three form
    const handleChangeIsPublicHoliday = e => {
        e.preventDefault()
        if(e.target.value === "yes") {
            setIsPublicHoliday(true);
        }
        else if(e.target.value === "no") {
            setIsPublicHoliday(false);
        }
        else {
            setIsPublicHoliday('');
        }
    }
    const handleChangeHotelGuests = input => e => {
        setHotelGuests({[input]: e.target.value})
    }
    const handleChangeOutsideGuests = input => e => {
        setOutsideGuests({[input]: e.target.value})
    }
    const handleChangeSourceOfBusiness = (e) => {
        setSourceOfBusiness(e.target.value);
    }

    //Data to be sent to api
    const dataToPost = {
        tables: parseInt(tables.tables),
        food: parseInt(foodRevenue.foodrevenue),
        beverage: parseInt(beverageRevenue.beveragerevenue),
        otherIncome: parseInt(otherRevenue.otherrevenue),
        totNrOfGuests: parseInt(totalGuests),
        isPublicHoliday: isPublicHoliday,
        notes: "Not added in frontend form",
        date: date,
        outletId: 1,
        userId: restaurant,
        }
    

    //Functions for prev and next buttons
    const handleNext = (e) => {
        e.preventDefault();
        setActiveStep(prevActiveStep => prevActiveStep + 1)
        if(activeStep >= 2) {
            sendPostRequest(dataToPost);
            sendGetRequest()
        }
    }
    const handlePrev = (e) => {
        e.preventDefault();
        setActiveStep(prevActiveStep => prevActiveStep - 1)
    }

    //Styles
    const useStyles = makeStyles({
        root: {
            paddingTop: 30,
            "& .MuiStepIcon-root.MuiStepIcon-completed": {
                color: "#1bbd7e"
            }
        }
    })

    function getStepsContent(stepIndex) {
        switch(stepIndex) {
            case 0:
                return <StepOne 
                    restaurant={restaurant}
                    handleChangeRestaurant={handleChangeRestaurant}
                    weather={weather}
                    handleChangeWeather={handleChangeWeather}
                    events={events}
                    handleChangeEvents={handleChangeEvents}
                    eventsHardcoded={eventsHardcoded}
                />;
            case 1:
                return <StepTwo
                    tables={tables}
                    handleChangeTables={handleChangeTables}
                    foodRevenue={foodRevenue}
                    handleChangeFoodRevenue={handleChangeFoodRevenue}
                    beverageRevenue={beverageRevenue}
                    handleChangeBeverageRevenue={handleChangeBeverageRevenue}
                    otherRevenue={otherRevenue}
                    handleChangeOtherRevenue={handleChangeOtherRevenue}
                />;
            case 2: 
                return <StepThree 
                    isPublicHoliday={isPublicHoliday}
                    handleChangeIsPublicHoliday={handleChangeIsPublicHoliday}
                    hotelGuests={hotelGuests}
                    handleChangeHotelGuests={handleChangeHotelGuests}
                    outsideGuests={outsideGuests}
                    handleChangeOutsideGuests={handleChangeOutsideGuests}
                    sourceOfBusiness={sourceOfBusiness}
                    handleChangeSourceOfBusiness={handleChangeSourceOfBusiness}
                />;
            default:
                return "Error, remove prev button"
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
                        <Grid style={{display: 'flex', justifyContent: 'center', marginTop: 60}}>
                            <Link to="/home" style={{textDecoration: 'none'}}>{activeStep <= 0 ?
                                <Button color="primary" variant="contained" style={{marginTop: '60px', margin: ' 10px', width: '95px'}} >
                                    Cancel
                                </Button> : ''}</Link>
                            {activeStep > 0 ?
                            <Button color="primary" variant="contained" style={{marginTop: '60px', margin: ' 10px', width: '95px'}} onClick={handlePrev}>
                                Prev
                            </Button> : ''}
                            <Button color="primary" variant="contained" style={{marginTop: '50px', margin: ' 10px', width: '95px'}} onClick={handleNext}>
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
