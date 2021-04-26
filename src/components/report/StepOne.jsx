import React from 'react'
import {makeStyles} from '@material-ui/core'
import {
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Checkbox
} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    formControl: {
        minWidth: 100,
        marginTop: 40
    }
}));

function StepOne(props) {

    const listEvents = props.eventsHardcoded.map(event => {
        return (
            <MenuItem value={event}>{event}</MenuItem>
        )
    })

    const classes = useStyles();



    return (
            <div className="report-grid-container">
            <Grid >
                <Grid align="center">
                    <h2 style={{ marginTop: 15, marginBottom: 5}}>General information</h2>
                </Grid>
                    <FormControl className={classes.formControl} fullWidth required>
                        <InputLabel>Choose your restaurant</InputLabel>
                        <Select
                            labelId='restaurant'
                            id='restaurant'
                            defaultValue={props.restaurant}
                            onChange={props.handleChangeRestaurant}
                        >
                            <MenuItem value={1}>Restaurant 1</MenuItem>
                            <MenuItem value={2}>Restaurant 2</MenuItem>
                            <MenuItem value={3}>Restaurant 3</MenuItem>
                        </Select>
                    </FormControl>
                    <Grid className={classes.formControl}>
                        <InputLabel style={{marginTop: 50, marginBottom: 10}}>How’s the weather?</InputLabel>
                        <Grid style={{display: 'flex', justifyContent: 'space-between', width: 250}}>
                            <Grid>
                                <Grid style={{display: 'flex', alignItems: 'center'}}>
                                    <Checkbox
                                            value='Sunny/Clear'
                                            onChange={(e)=>props.handleChangeWeather(e)}
                                            color="primary"
                                        />
                                    <InputLabel style={{fontSize: '14px'}}>Sunny/Clear</InputLabel>
                                </Grid>
                                <Grid style={{display: 'flex', alignItems: 'center'}}>
                                    <Checkbox
                                        value='Partially Cloudy'
                                        onChange={(e)=>props.handleChangeWeather(e)}
                                        color="primary"
                                    />
                                    <InputLabel style={{fontSize: '14px'}}>Partially Cloudy</InputLabel>
                                </Grid>
                                <Grid style={{display: 'flex', alignItems: 'center'}}>
                                    <Checkbox
                                        value='Overcast'
                                        onChange={(e)=>props.handleChangeWeather(e)}
                                        color="primary"
                                    />
                                    <InputLabel style={{fontSize: '14px'}}>Overcast</InputLabel>
                                </Grid>
                            </Grid>
                            <Grid>
                                <Grid style={{display: 'flex', alignItems: 'center'}}>
                                    <Checkbox
                                        value='Rain'
                                        onChange={(e)=>props.handleChangeWeather(e)}
                                        color="primary"
                                    />
                                    <InputLabel style={{fontSize: '14px'}}>Rain</InputLabel>
                                </Grid>
                                <Grid style={{display: 'flex', alignItems: 'center'}}>
                                    <Checkbox
                                        value='Showers'
                                        onChange={(e)=>props.handleChangeWeather(e)}
                                        color="primary"
                                    />
                                    <InputLabel style={{fontSize: '14px'}}>Showers</InputLabel>
                                </Grid>
                                <Grid style={{display: 'flex', alignItems: 'center'}}>
                                    <Checkbox
                                        value='Stormy'
                                        onChange={(e)=>props.handleChangeWeather(e)}
                                        color="primary"
                                    />
                                    <InputLabel style={{fontSize: '14px'}}>Stormy</InputLabel>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    {/* Local Events */}
                    <FormControl style={{marginTop: '30px'}} fullWidth required>
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
                </Grid>

            </div>
    )
}

export default StepOne
