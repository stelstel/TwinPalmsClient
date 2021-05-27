import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { 
    Grid, 
    Paper, 
    Avatar, 
    TextField, 
    Button, 
    FormControl, 
    FormLabel, 
    RadioGroup, 
    FormControlLabel, 
    Radio
 } from '@material-ui/core'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import './CreateUser.css'


function CreateUser() {

    //REACT HOOKS
    const [createUser, setCreateUser] = useState({
        firstName: "",
        lastName: "",
        userName: "",
        email: "",
        phoneNumber: "0703825555",
        role: "",
        outlets: [
            1
        ],
        hotels: [
            1
        ],
        companies: [
            1
        ]
    })

    //POST REQUEST'
    const sendPostRequest = async (data) => {
        try {
            const res = await axios.post('https://localhost:44306/api/Authentication', data);
            console.log(data);
            console.log(res.data);
            console.log('successfull post request');
        } catch (err) {
            // Handle Error Here
            console.error(err);
            console.log('error with post request');
        }
    };

    //SUBIT FORM AND SEND IT TO DATABASE
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(createUser)
        sendPostRequest(createUser)

    }

    return (
        <Grid className="createuser-page-container">
            <Grid style={{paddingTop: '30px'}} >
                <Paper className="createuser-paper" elevation={10} >
                    <Grid align="center">
                        <Avatar style={{backgroundColor: '#1bbd7e', marginTop: '30px'}}><AccountCircleIcon /></Avatar>
                        <h2 style={{ marginTop: 30}}>Create User</h2>
                    </Grid> 
                    <TextField 
                        onChange={e => setCreateUser({ ...createUser, userName: e.target.value })} 
                        value={createUser.userName}  
                        label='Username' 
                        placeholder="Enter username" 
                        style={{marginTop: '40px'}} 
                        type="text" 
                        fullWidth 
                        required
                        />           
                    <TextField 
                        onChange={e => setCreateUser({ ...createUser, firstName: e.target.value })} 
                        value={createUser.firstName}  label="First name" placeholder="Enter first name" 
                        style={{marginTop: '40px'}} 
                        type="text" 
                        fullWidth 
                        required
                        />
                    <TextField 
                        onChange={e => setCreateUser({ ...createUser, lastName: e.target.value })} 
                        value={createUser.lastName}  label="Last name" placeholder="Enter last name" 
                        style={{marginTop: '40px'}} type="text" 
                        fullWidth 
                        required
                        />
                    <TextField 
                        onChange={e => setCreateUser({ ...createUser, email: e.target.value })} 
                        value={createUser.email}  
                        label='Email' 
                        placeholder="Enter email" 
                        style={{marginTop: '40px'}} 
                        type="email" 
                        fullWidth 
                        required
                        />
                    <FormControl style={{marginTop: 60, marginBottom: -20}} component="fieldset">
                        <FormLabel component="legend">Choose user access level</FormLabel>
                        <RadioGroup  row aria-label="holiday" name="holiday" >
                            <FormControlLabel 
                                onChange={e => setCreateUser({ ...createUser, role: e.target.value })} 
                                value="basic"
                                label="Basic" 
                                control={<Radio color="primary"/>} 
                                />
                            <FormControlLabel 
                                onChange={e => setCreateUser({ ...createUser, role: e.target.value })} 
                                value="admin" 
                                label="Admin"
                                control={<Radio color="primary"/>}
                                />
                        </RadioGroup>
                    </FormControl>
                    <Link to="./report" style={{textDecoration: 'none'}}>
                        <Button 
                            onClick={handleSubmit} 
                            type="submit" 
                            color="primary" 
                            variant="contained" 
                            style={{marginTop: '80px'}} 
                            fullWidth
                            >Create User
                        </Button>
                    </Link>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default CreateUser
