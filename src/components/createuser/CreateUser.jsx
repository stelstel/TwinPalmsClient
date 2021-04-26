import React, {useState} from 'react'
import { Link } from 'react-router-dom'
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
    Radio,
    InputLabel,
    Checkbox,
    makeStyles
 } from '@material-ui/core'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import './CreateUser.css'

const useStyles = makeStyles(theme => ({
    formControl: {
        minWidth: 100,
        marginTop: 40
    }
}));

function CreateUser() {

    const classes = useStyles();

    const avatarStyle = {backgroundColor: '#1bbd7e', marginTop: '30px'};

    //Form Variables
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [restaurants, setRestaurants] = useState([]);

    //Form Functions
    const handleChangeUsername = (e) => {
        setUsername(e.target.value)
    }
    const handleChangePassword = (e) => {
        setPassword(e.target.value)

    }
    const handleChangeRole = (e) => {
        setRole(e.target.value)
    }
    const handleChangeRestaurant = e => {
        let dataRestaurants = restaurants;
        dataRestaurants.push(parseInt(e.target.value))
        setRestaurants(dataRestaurants)

    }
    const createUserDataForApi = {
        username: username,
        password: password,
        role: role,
        restaurants: restaurants
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(createUserDataForApi)
    }

    return (
        <Grid className="createuser-page-container">
            <Grid style={{paddingTop: '30px'}} >
                <Paper className="createuser-paper" elevation={10} >
                    <Grid align="center">
                        <Avatar style={avatarStyle}><AccountCircleIcon /></Avatar>
                        <h2 style={{ marginTop: 30}}>Create User</h2>
                    </Grid>
                    <TextField onChange={handleChangeUsername}  label='Username' placeholder="Enter Username" style={{marginTop: '40px'}} fullWidth required/>
                    <TextField onChange={handleChangePassword}  label="Password" placeholder="Enter Password" style={{marginTop: '40px'}} type="password" fullWidth required/>
                    <TextField label="Repeat Password" placeholder="Repeat Password" style={{marginTop: '40px'}} type="password" fullWidth required/>
                    <FormControl style={{marginTop: 60, marginBottom: -20}} component="fieldset">
                        <FormLabel component="legend">Choose user access level</FormLabel>
                        <RadioGroup onChange={handleChangeRole} row aria-label="holiday" name="holiday" value={role}>
                            <FormControlLabel value="basic" control={<Radio color="primary"/>} label="Basic" />
                            <FormControlLabel value="admin" control={<Radio color="primary"/>} label="Admin" />
                        </RadioGroup>
                    </FormControl>
                    <Grid className={classes.formControl}>
                        <InputLabel style={{marginTop: 50, marginBottom: 10}}>Choose users restaurants</InputLabel>
                        <Grid style={{display: 'flex', justifyContent: 'space-between', width: 250}}>
                            <Grid>
                                <Grid style={{display: 'flex', alignItems: 'center'}}>
                                    <Checkbox
                                            value={1}
                                            onChange={handleChangeRestaurant}
                                            color="primary"
                                        />
                                    <InputLabel style={{fontSize: '14px'}}>Restaurant 1</InputLabel>
                                </Grid>
                                <Grid style={{display: 'flex', alignItems: 'center'}}>
                                    <Checkbox
                                        value={2}
                                        onChange={handleChangeRestaurant}
                                        color="primary"
                                    />
                                    <InputLabel style={{fontSize: '14px'}}>Restaurant 2</InputLabel>
                                </Grid>
                                <Grid style={{display: 'flex', alignItems: 'center'}}>
                                    <Checkbox
                                        value={3}
                                        onChange={handleChangeRestaurant}
                                        color="primary"
                                    />
                                    <InputLabel style={{fontSize: '14px'}}>Restaurant 3</InputLabel>
                                </Grid>
                            </Grid>
                            <Grid>
                                <Grid style={{display: 'flex', alignItems: 'center'}}>
                                    <Checkbox
                                        value={4}
                                        onChange={handleChangeRestaurant}
                                        color="primary"
                                    />
                                    <InputLabel style={{fontSize: '14px'}}>Restaurant 4</InputLabel>
                                </Grid>
                                <Grid style={{display: 'flex', alignItems: 'center'}}>
                                    <Checkbox
                                        value={5}
                                        onChange={handleChangeRestaurant}
                                        color="primary"
                                    />
                                    <InputLabel style={{fontSize: '14px'}}>Restaurant 5</InputLabel>
                                </Grid>
                                <Grid style={{display: 'flex', alignItems: 'center'}}>
                                    <Checkbox
                                        value={6}
                                        onChange={handleChangeRestaurant}
                                        color="primary"
                                    />
                                    <InputLabel style={{fontSize: '14px'}}>Restaurant 6</InputLabel>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Link to="./report" style={{textDecoration: 'none'}}>
                        <Button onClick={handleSubmit} type="submit" color="primary" variant="contained" style={{marginTop: '60px'}} fullWidth>Create User</Button>
                    </Link>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default CreateUser
