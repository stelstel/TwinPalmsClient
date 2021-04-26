import React from 'react'
import {Button, TextField} from "@material-ui/core";
import red from '@material-ui/core/colors/red';
import indigo from '@material-ui/core/colors/indigo';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

const indigoTheme = createMuiTheme({ palette: { primary: indigo, secondary: red, } })

function Admin() {

    //Make a get request on users from api and a delete request 
    const users = ['User1', 'User2', 'User3', 'User4', 'User5', 'User6', 'User7', 'User8', 'User9', 'User10'];
    const handleChangeUsers = e => {
        console.log(users)
    }
    const listUsers = users.map(user => {
        return (
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '5px'}}>
                <div style={{border: '1px solid #797979', borderRadius: '4px', width: '199px', height: '48px'}}><p style={{fontSize: '16px', fontWeight: 400, color: '#212529', fontFamily: 'Roboto, Helvetica, Arial, sans-serif', marginTop: '12px', marginLeft: '5px'}}>{user}</p></div>
                <MuiThemeProvider theme={indigoTheme}>
                    <Button onClick={handleChangeUsers} color="secondary" variant="contained" style={{marginTop: '50px', margin: ' 10px 10px 10px 10px', width: '95px'}}>Delete</Button>
                </MuiThemeProvider>
            </div>
        )

    })
    //Make a get reuest to api and an update request
    const events = ['Event1', 'Event2', 'Event3', 'Event4', 'Event5', 'Event6', 'Event7', 'Event8', 'Event9', 'Event10'];

    const handleChangeEvents = (e) => {

    }
    const listEvents = events.map(event => {

        return (
            <div>
            <TextField
                placeholder="Enter new event" 
                label='Event' 
                defaultValue={event}   
                required
            />
            <MuiThemeProvider theme={indigoTheme}>
                <Button onClick={handleChangeEvents} color="primary" variant="contained" style={{marginTop: '50px', margin: ' 10px 10px 16px 10px', width: '95px'}}>Change</Button>
            </MuiThemeProvider>
            </div>
        )
    })
    return (
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-around', height: '89vh'}}>
        <div>
            <h1 style={{color: '#494949', fontSize: '45px', marginBottom: '40px', paddingTop: '60px', paddingLeft: '32px'}}>Manage Users</h1>
            <ul>
                {listUsers}
            </ul>
        </div>
        <div>
            <h1 style={{color: '#494949', fontSize: '45px', marginBottom: '40px', paddingTop: '60px'}}>Manage Events</h1>
            <div style={{display: 'flex', flexDirection: 'column', color: '#fff'}}>
                {listEvents}
            </div>
        </div>
        </div>
    )
}

export default Admin
