import React from 'react'
import { Link } from 'react-router-dom'
import { Grid, Paper, Avatar, TextField, Button } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import './Login.css'

function Login() {

    // const paperStyle = {padding: 20, height: '700px', width: 480, margin: '20px auto'};
    const avatarStyle = {backgroundColor: '#1bbd7e', marginTop: '30px'};


    return (
        
        <Grid className="login-page-container">
            <Grid style={{paddingTop: '60px'}}>
                <Paper className="login-paper" elevation={10}>
                    <Grid align="center">
                        <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
                        <h2 style={{ marginTop: 30}}>Login</h2>
                    </Grid>
                        <TextField  label='Username' placeholder="Enter Username" style={{marginTop: '40px'}} fullWidth required/>
                        <TextField  label="Password" placeholder="Enter Password" style={{marginTop: '40px'}} type="password" fullWidth required/>
                        <Link to="./report" style={{textDecoration: 'none'}}>
                            <Button type="submit" color="primary" variant="contained" style={{marginTop: '60px'}} fullWidth>Login</Button>
                        </Link>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default Login
