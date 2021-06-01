import React, {useState, useEffect} from 'react'
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
import ListOutlets from './ListOutlets';
import ListCompanies from './ListCompanies';


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

    const [basicActive, setBasicActive] = useState(false)
    const [adminActive, setAdminActive] = useState(false)

    const [outlets, setOutlets] = useState();
    const [companies, setCompanies] = useState();

    const handleClickBasic = () => {
        setAdminActive(false)
        setBasicActive(true)
    }
    const handleClickAdmin = () => {
        setBasicActive(false)
        setAdminActive(true)    
    }

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
  
    //FETCH LIST OF OUTLETS FROM API
    const url = 'https://localhost:44306/api/Outlets'

    const sendGetRequest = async (url) => {
        try {
            const res = await axios.get(url);
            console.log(res.data);
            console.log('successfull get request')
            setOutlets(res.data)

        } catch (err) {
            // Handle Error Here
            console.log("error with get request for users")
            console.error(err);
        }
    };

    //FETCH LIST OF COMPANIES FROM API
    const urlCompanies = 'https://localhost:44306/api/Companies'

    const sendGetRequestCompanies = async (url) => {
        try {
            const res = await axios.get(url);
            console.log(res.data);
            console.log('successfull get request')
            setCompanies(res.data)

        } catch (err) {
            // Handle Error Here
            console.log("error with get request for users")
            console.error(err);
        }
    };
    
    //RUN GET REQUESTS ON LOAD
    useEffect(() => {   
        sendGetRequestCompanies(urlCompanies)
    }, []) 
    useEffect(() => {   
        sendGetRequest(url)
    }, []) 



    return (
        <Grid className="createuser-page-container">
            <Grid style={{paddingTop: '30px'}} >
                <Paper className="createuser-paper" elevation={10} >
                    <Grid align="center">
                        <Avatar style={{backgroundColor: '#1bbd7e', marginTop: '30px'}}><AccountCircleIcon /></Avatar>
                        <h2 style={{ marginTop: 20}}>Create User</h2>
                    </Grid> 
                    <TextField 
                        onChange={e => setCreateUser({ ...createUser, userName: e.target.value })} 
                        value={createUser.userName}  
                        label='Username' 
                        placeholder="Enter username" 
                        style={{marginTop: '20px'}} 
                        type="text" 
                        fullWidth 
                        required
                        />           
                    <TextField 
                        onChange={e => setCreateUser({ ...createUser, firstName: e.target.value })} 
                        value={createUser.firstName}  label="First name" placeholder="Enter first name" 
                        style={{marginTop: '30px'}} 
                        type="text" 
                        fullWidth 
                        required
                        />
                    <TextField 
                        onChange={e => setCreateUser({ ...createUser, lastName: e.target.value })} 
                        value={createUser.lastName}  label="Last name" placeholder="Enter last name" 
                        style={{marginTop: '30px'}} type="text" 
                        fullWidth 
                        required
                        />
                    <TextField 
                        onChange={e => setCreateUser({ ...createUser, email: e.target.value })} 
                        value={createUser.email}  
                        label='Email' 
                        placeholder="Enter email" 
                        style={{marginTop: '30px'}} 
                        type="email" 
                        fullWidth 
                        required
                        />
                    <FormControl style={{marginTop: 50}} component="fieldset">
                        <FormLabel component="legend">Choose user access level</FormLabel>
                        <RadioGroup  row aria-label="holiday" name="holiday" >
                            <FormControlLabel 
                                onClick={handleClickBasic}
                                onChange={e => setCreateUser({ ...createUser, role: e.target.value })} 
                                value="basic"
                                label="Basic" 
                                control={<Radio color="primary"/>} 
                                />
                            <FormControlLabel 
                                onClick={handleClickAdmin}
                                onChange={e => setCreateUser({ ...createUser, role: e.target.value })} 
                                value="admin" 
                                label="Admin"
                                control={<Radio color="primary"/>}
                                />
                        </RadioGroup>
                    </FormControl>
                    {
                    basicActive &&
                    <ListRestaurants outlets={outlets}/>
                    }
                    {
                    adminActive &&
                    <ListCompanies companies={companies}/>
                    }
                    
                    <Link to="./report" style={{textDecoration: 'none'}}>
                        <Button 
                            onClick={handleSubmit} 
                            type="submit" 
                            color="primary" 
                            variant="contained" 
                            style={{marginTop: '30px'}} 
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
