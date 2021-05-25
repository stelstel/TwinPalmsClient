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
    //DELETE REQUEST EVENT
    const sendDeleteRequest = async (id) => {
        try {
            await axios.delete(`https://localhost:44306/api/LocalEvent/${id}`);
            console.log('successfull delete request');
        } catch (err) {
            console.error(err);
            console.log('error with delete request');
        }
    };
    //RENDER AGAIN AFTER GET REQUEST
    useEffect(() => {   
        sendGetRequest()
    }, []) 

    let a = "working"
    //FUNCTIONS
     const handleChangeEvent = (e) => {
         setAddEvent(e.target.value)
     }
     //EDIT EVENT
     const handleClickEditEvent =(e, id) => {
         console.log(id)
         sendEditRequest(id, a)
     }
     //DELETE EVENT
     const handleClickDeleteEvent = (id) => {
         console.log(id)
         sendDeleteRequest(1)
     }
     //ADD EVENT
     const handleClickAddEvent = () => {
        const data = {event: addEvent}
        sendPostRequest(data)
    }


    return (
        <>
        <Grid style={{backgroundColor: '#494949', height: 'calc(100vh - 120px)', paddingTop: '60px'}}>
            <Paper className="events-paper" elevation={10}>
                <Grid style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                    <h1 className="events-title">Manage Events</h1>
                    <Grid style={{display: 'flex', flexDirection: 'column', color: '#fff'}}>
                        {events &&
                        events.map((item, key) => {
                        return (
                            <Grid className="event-container" key={key}>
                                <TextField
                                    className="event-input"
                                    placeholder={item.event}
                                    label="Event" 
                                    defaultValue={item.event} 
                                    required
                                />
                                <Grid className="event-buttons">
                                    <i onClick={(e) => handleClickEditEvent(item.id)} className="fas fa-edit"></i>
                                    <i onClick={(e) => handleClickDeleteEvent(item.id)} value={item.id} className="fas fa-trash-alt"></i>
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
