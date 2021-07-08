import React from 'react'
import {makeStyles} from '@material-ui/core'
import {
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Checkbox,
    RadioGroup,
    Radio,
    FormLabel,
    FormControlLabel,
    TextareaAutosize
} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    formControl: {
        minWidth: 100,
    }
}));

function StepOne(props) {
    

    const classes = useStyles();


    //Return all outlets from logged in user inside a <MenuItem>
    const listLoggedInUsersOutlets = props.loggedInUserOutlets.map(( { name, id } ) => {   

        return <MenuItem key={id} value={id}>{name}</MenuItem>
    })

    

    return (
            <Grid className="report-grid-container">
                <Grid >
                    <Grid align="center">
                        <h3 style={{marginBottom: '25px'}}>General information</h3>
                    </Grid>
                    <FormControl 
                        error={props.restaurantUndefined} 
                        className={classes.formControl} 
                        fullWidth 
                        >
                        <InputLabel>Choose your restaurant</InputLabel>
                        <Select
                            id='restaurant'
                            labelId='restaurant'
                            value={props.restaurant}
                            onChange={props.handleChangeRestaurant}                           
                        >
                            {listLoggedInUsersOutlets}
                        </Select>
                    </FormControl>
                    <FormControl error={props.isPublicHolidayUndefined} style={{marginTop: 45}} component="fieldset">
                    <FormLabel component="legend">Is it a public holiday?</FormLabel>
                        <RadioGroup 
                            onChange={props.handleChangeIsPublicHoliday} 
                            row aria-label="holiday" 
                            name="holiday"
                        >
                        <FormControlLabel value="yes" control={<Radio onClick={props.handleClickIsPublicHoliday} checked={props.isPublicHolidayChecked} color="primary"/>} label="Yes" />
                        <FormControlLabel value="no"  control={<Radio onClick={props.handleClickIsNotPublicHoliday} checked={props.isNotPublicHolidayChecked} color="primary"/>} label="No" />
                        </RadioGroup>
                    </FormControl>
                    <Grid className={classes.formControl}>
                        
                            
                        <FormControl error={props.weatherUndefined}  style={{marginTop: 45}}>
                            <InputLabel style={{position: 'relative', top: -30}}>How’s the weather?</InputLabel>
                            <Grid style={{display: 'flex', justifyContent: 'space-between', width: 250}}>
                                <Grid>
                                    <Grid style={{display: 'flex', alignItems: 'center'}}>
                                        <Checkbox
                                                value={1}
                                                onChange={(e)=>props.handleChangeWeather(e)}
                                                color="primary"
                                                onClick={props.isWeatherSunny}
                                                checked={props.isSunnyChecked}
                                                
                                            />
                                        <label style={{fontSize: '14px'}}>Sunny/Clear</label>
                                    </Grid>
                                    <Grid style={{display: 'flex', alignItems: 'center'}}>
                                        <Checkbox
                                            value={2}
                                            onChange={(e)=>props.handleChangeWeather(e)}
                                            color="primary"
                                            onClick={props.isWeatherPartiallyCloudy}
                                            checked={props.isPartiallyCloudyChecked}
                                        />
                                        <label style={{fontSize: '14px'}}>Partially Cloudy</label>
                                    </Grid>
                                    <Grid style={{display: 'flex', alignItems: 'center'}}>
                                        <Checkbox
                                            value={3}
                                            onChange={(e)=>props.handleChangeWeather(e)}
                                            color="primary"
                                            onClick={props.isWeatherOvercast}
                                            checked={props.isOvercastChecked}
                                        />
                                        <label style={{fontSize: '14px'}}>Overcast</label>
                                    </Grid>
                                </Grid>
                                <Grid>
                                    <Grid style={{display: 'flex', alignItems: 'center'}}>
                                        <Checkbox
                                            value={4}
                                            onChange={(e)=>props.handleChangeWeather(e)}
                                            color="primary"
                                            onClick={props.isWeatherRain}
                                            checked={props.isRainChecked}
                                        />
                                        <label style={{fontSize: '14px'}}>Rain</label>
                                    </Grid>
                                    <Grid style={{display: 'flex', alignItems: 'center'}}>
                                        <Checkbox
                                            value={5}
                                            onChange={(e)=>props.handleChangeWeather(e)}
                                            color="primary"
                                            onClick={props.isWeatherShowers}
                                            checked={props.isShowersChecked}
                                        />
                                        <label style={{fontSize: '14px'}}>Showers</label>
                                    </Grid>
                                    <Grid style={{display: 'flex', alignItems: 'center'}}>
                                        <Checkbox
                                            value={6}
                                            onChange={(e)=>props.handleChangeWeather(e)}
                                            color="primary"
                                            onClick={props.isWeatherStormy}
                                            checked={props.isStormyChecked}
                                        />
                                        <label style={{fontSize: '14px'}}>Stormy</label>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </FormControl>
                    </Grid>
                    {/* Local Events */}
                    <FormControl error={props.eventsUndefined} style={{marginTop: 10}} fullWidth required>
                        <InputLabel>Any local events?</InputLabel>
                        <Select
                            labelId='localevents'
                            id='localevents'
                            value={props.selectedEvent}
                            defaultValue=''
                            onChange={props.handleChangeEvents}
                        >
                            {props.events &&
                            props.events
                            .filter((item) => {
                                if(item.active === true) {
                                    return item
                                }
                                return null
                            })
                            .map((item, key) => {
                                return (
                                    <MenuItem key={key} value={item.id}>{item.event}</MenuItem>
                                )
                            })
                            }
                        </Select>
                    </FormControl>
                    <FormControl style={{marginTop: 45}} fullWidth required>
                        <TextareaAutosize
                            rowsMin={3}
                            rowsMax={3}
                            aria-label="maximum height"
                            placeholder="Additional information about local events"
                            defaultValue=""
                            onChange={props.handleChangeEventNotes}
                            value={props.eventNotes}
                        />
                    </FormControl>
                </Grid>
            </Grid>
    )
}

export default StepOne
