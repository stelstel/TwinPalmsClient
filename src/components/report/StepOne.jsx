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

    const listEvents = props.eventsHardcoded.map((item, key) => {
        return (
            <MenuItem key={key} value="">{item}</MenuItem>
        )
    })

    const classes = useStyles();

    

    return (
            <Grid className="report-grid-container">
                <Grid >
                    <Grid align="center">
                        <h3 style={{marginBottom: '25px'}}>General information</h3>
                    </Grid>
                    <FormControl className={classes.formControl} fullWidth required>
                        <InputLabel>Choose your restaurant</InputLabel>
                        <Select
                            id='restaurant'
                            labelId='restaurant'
                            defaultValue={props.restaurant}
                            onChange={props.handleChangeRestaurant}
                            
                            
                        >
                            <MenuItem value={1}>Restaurant 1</MenuItem>
                            <MenuItem value={2}>Restaurant 2</MenuItem>
                            <MenuItem value={3}>Restaurant 3</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl style={{marginTop: 45}} component="fieldset">
                    <FormLabel component="legend">Is it a public holiday?</FormLabel>
                        <RadioGroup 
                            onChange={props.handleChangeIsPublicHoliday} 
                            row aria-label="holiday" 
                            name="holiday"
                        >
                        <FormControlLabel value="yes" control={<Radio onClick={props.handleClickIsPublicHoliday} checked={props.isPublicHolidayChecked} color="primary"/>} label="Yes" />
                        <FormControlLabel value="no"  control={<Radio onClick={props.handleClickIsPublicHoliday} checked={!props.isPublicHolidayChecked} color="primary"/>} label="No" />
                        </RadioGroup>
                    </FormControl>
                    <Grid className={classes.formControl}>
                        
                            
                        <FormControl   style={{marginTop: 45}}>
                            <InputLabel style={{position: 'relative', top: -30}}>How’s the weather?</InputLabel>
                            <Grid style={{display: 'flex', justifyContent: 'space-between', width: 250}}>
                                <Grid>
                                    <Grid style={{display: 'flex', alignItems: 'center'}}>
                                        <Checkbox
                                                value='Sunny/Clear'
                                                onChange={(e)=>props.handleChangeWeather(e)}
                                                color="primary"
                                                onClick={props.isWeatherSunny}
                                                
                                            />
                                        <label style={{fontSize: '14px'}}>Sunny/Clear</label>
                                    </Grid>
                                    <Grid style={{display: 'flex', alignItems: 'center'}}>
                                        <Checkbox
                                            value='Partially Cloudy'
                                            onChange={(e)=>props.handleChangeWeather(e)}
                                            color="primary"
                                        />
                                        <label style={{fontSize: '14px'}}>Partially Cloudy</label>
                                    </Grid>
                                    <Grid style={{display: 'flex', alignItems: 'center'}}>
                                        <Checkbox
                                            value='Overcast'
                                            onChange={(e)=>props.handleChangeWeather(e)}
                                            color="primary"
                                        />
                                        <label style={{fontSize: '14px'}}>Overcast</label>
                                    </Grid>
                                </Grid>
                                <Grid>
                                    <Grid style={{display: 'flex', alignItems: 'center'}}>
                                        <Checkbox
                                            value='Rain'
                                            onChange={(e)=>props.handleChangeWeather(e)}
                                            color="primary"
                                        />
                                        <label style={{fontSize: '14px'}}>Rain</label>
                                    </Grid>
                                    <Grid style={{display: 'flex', alignItems: 'center'}}>
                                        <Checkbox
                                            value='Showers'
                                            onChange={(e)=>props.handleChangeWeather(e)}
                                            color="primary"
                                        />
                                        <label style={{fontSize: '14px'}}>Showers</label>
                                    </Grid>
                                    <Grid style={{display: 'flex', alignItems: 'center'}}>
                                        <Checkbox
                                            value='Stormy'
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
                    <FormControl style={{marginTop: 10}} fullWidth required>
                        <InputLabel>Any local events?</InputLabel>
                        <Select
                            labelId='localevents'
                            id='localevents'
                            defaultValue={props.events}
                            onChange={props.handleChangeEvents}
                        >
                            {listEvents}
                        </Select>
                    </FormControl>
                    <FormControl style={{marginTop: 45}} fullWidth required>
                        <TextareaAutosize
                            rowsMin={3}
                            rowsMax={3}
                            aria-label="maximum height"
                            placeholder="Additional information about local events"
                            defaultValue=""
                            required
                        />
                    </FormControl>
                </Grid>
            </Grid>
    )
}

export default StepOne
