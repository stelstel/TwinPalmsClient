import React, { useState, useEffect } from 'react'
import {Button, TextField, Paper, Grid} from "@material-ui/core";
import axios from 'axios';
import './Events.css'

function Events() {

    //REACT HOOKS
    const [events, setEvents] = useState()
    const [addEvent, setAddEvent] = useState()


    //GET REQUEST
    const sendGetRequest = async () => {
        try {
            const res = await axios.get('https://localhost:44306/api/LocalEvent');
            console.log("successfull get request")
            console.log(res.data)
            setEvents(res.data)

        } catch (err) {
            console.error(err);
        }
    };
    //POST REQUEST, NEW EVENT
    const sendPostRequest = async (data) => {
        try {
            const res = await axios.post('https://localhost:44306/api/LocalEvent', data);
            console.log(data);
            console.log(res.data);
            console.log('successfull post request');

        } catch (err) {
            console.error(err);
            console.log('error with post request');
        }
    };
    //PUT REQUEST, EDIT EVENT
    const sendEditRequest = async (id, val) => {
        
        try {
            const res = await axios.put(`https://localhost:44306/api/LocalEvent/${id}`, {event: val});
            console.log(res.data);
            console.log('successfull put request');
        } catch (err) {
            console.error(err);
            console.log('error with put request');
        }
    };
    //PUT REQUEST, EDIT ACTIVE
    const sendPutRequestActive = async (id, active, val) => {
        console.log(active)
        console.log(val)
        try {
            const res = await axios.put(`https://localhost:44306/api/LocalEvent/${id}`, {active: active, event: val});
            console.log(res.data);
            console.log('successfull put request');
        } catch (err) {
            console.error(err);
            console.log('error with put request');
        }
    };

    //RENDER AGAIN AFTER GET REQUEST
    useEffect(() => {   
        sendGetRequest()
    }, []) 

    let a = "NEW EVENT"
    //FUNCTIONS
     const handleChangeEvent = (e) => {
         setAddEvent(e.target.value)
     }
     //EDIT EVENT
     const handleClickEditEvent =(id) => {
         sendEditRequest(id, a)
     }
     //DELETE EVENT
     const handleClickDeleteEvent = (id, event) => {
         console.log(event)
         console.log(id)
         sendPutRequestActive(id, false, event)
     }
     //ADD EVENT
     const handleClickAddEvent = () => {
        const data = {event: addEvent, active: true}
        sendPostRequest(data)
        sendGetRequest()
    }

const handleChange = (e) => {
    console.log(e.target.value)
}
    return (
        <>
        <Grid style={{backgroundColor: '#494949', height: 'calc(100vh - 120px)', paddingTop: '60px'}}>
            <Paper className="events-paper" elevation={10}>
                <Grid style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                    <h1 className="events-title">Manage Events</h1>
                    <Grid style={{display: 'flex', flexDirection: 'column', color: '#fff'}}>
                        {events &&
                        events
                        .filter((val) => {
                            if (val.active === true) {
                                return val
                            } 
                            return null
                        })
                        .map((item, key) => {
                        return (
                            <Grid className="event-container" key={key}>
                                <TextField
                                    className="event-input"
                                    placeholder={item.event}
                                    label="Event" 
                                    defaultValue={item.event} 
                                    onChange={handleChange}
                                    required
                                />
                                <Grid className="event-buttons">
                                    <i onClick={(e) => handleClickEditEvent(item.id)} className="fas fa-edit"></i>
                                    <i onClick={(e) => handleClickDeleteEvent(item.id, item.event)} value={item.event} className="fas fa-trash-alt"></i>
                                </Grid>
                            </Grid>
                        )})}

                    </Grid>
                    <Grid className="add-event-container"> 
                        <TextField
                            className="event-input"
                            label="Add Event" 
                            variant="outlined"
                            onChange={handleChangeEvent}
                        />
                        <Button onClick={handleClickAddEvent} className="add-event-btn" color="primary" variant="contained" >Add</Button>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
        </>
    )
}

export default Events
