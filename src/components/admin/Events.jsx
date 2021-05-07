import React from 'react'
import {Button, TextField, Paper, Grid} from "@material-ui/core";
import indigo from '@material-ui/core/colors/indigo';
import red from '@material-ui/core/colors/red';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import './Events.css'


const indigoTheme = createMuiTheme({ palette: { primary: indigo, secondary: red, } })

function Events() {

     //Make a get reuest to api and an update request
     const events = ['Event1', 'Event2', 'Event3', 'Event4', 'Event5', 'Event6', 'Event7', 'Event8'];

     const handleChangeEvents = (e) => {
 
     }
     const listEvents = events.map(event => {
 
         return (
            <Grid>
                <TextField
                    placeholder="Enter new event" 
                    label='Event' 
                    defaultValue={event}   
                    required
                />
                <MuiThemeProvider theme={indigoTheme}>
                    <Button onClick={handleChangeEvents} color="primary" variant="contained" style={{margin: '10px 10px 16px 10px', width: '95px'}}>Change</Button>
                </MuiThemeProvider>
            </Grid>
         )
     })

    return (
        <>
        <Grid style={{backgroundColor: '#494949', height: 'calc(100vh - 120px)', paddingTop: '60px'}}>
            <Paper className="events-paper" elevation={10}>
                <Grid style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                    <h1 style={{color: '#494949', fontSize: '45px', marginBottom: '40px'}}>Manage Events</h1>
                    <Grid style={{display: 'flex', flexDirection: 'column', color: '#fff'}}>
                        {listEvents}
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
        </>
    )
}

export default Events
