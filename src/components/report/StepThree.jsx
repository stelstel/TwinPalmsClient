import React from 'react'
import {makeStyles} from '@material-ui/core'
import {
    Grid,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormLabel,
    FormControlLabel,
    RadioGroup,
    Radio
} from '@material-ui/core'



function StepThree(props) {

    //Styles
    const useStyles = makeStyles(theme => ({
        formControl: {
            minWidth: 100,
            marginTop: 40
        }
    }));
    const classes = useStyles();
    const margin2 = {marginTop: '40px'}

    return (
            <div className="report-grid-container">
                <Grid >
                    <Grid align="center">
                        <h2 style={{ marginTop: 15, marginBottom: 5}}>Source of business</h2>
                    </Grid>
                    <FormControl style={{marginTop: 60, marginBottom: -20}} component="fieldset">
                        <FormLabel component="legend">Is it a public holiday?</FormLabel>
                        <RadioGroup 
                            onChange={props.handleChangeIsPublicHoliday} 
                            row aria-label="holiday" 
                            name="holiday"
                        >
                            <FormControlLabel value="yes" control={<Radio color="primary"/>} label="Yes" />
                            <FormControlLabel value="no" control={<Radio color="primary"/>} label="No" />
                        </RadioGroup>
                    </FormControl>
                    <TextField  
                        style={margin2}
                        placeholder="Guests from hotel" 
                        label="How many hotel guests today?" 
                        onChange={props.handleChangeHotelGuests('hotelguests')}
                        defaultValue={props.hotelGuests.hotelguests}  
                        fullWidth 
                        required
                    />
                    <TextField  
                        style={margin2}
                        placeholder="Guests from outside" 
                        label="How many guests from outside?" 
                        onChange={props.handleChangeOutsideGuests('outsideguests')}
                        defaultValue={props.outsideGuests.outsideguests}  
                        fullWidth 
                        required/>
                    <FormControl className={classes.formControl} fullWidth required>
                        <InputLabel>Todays source of business?</InputLabel>
                        <Select 
                            labelId='select-demo'
                            id='florida-select'
                            defaultValue={props.sourceOfBusiness}
                            onChange={props.handleChangeSourceOfBusiness}
                            
                        >
                            <MenuItem value='Hotel website'>Hotel website</MenuItem>
                            <MenuItem value='Hungry hub'>Hungry hub</MenuItem>
                            <MenuItem value='Facebook referral'>Facebook referral</MenuItem>
                            <MenuItem value='Google search'>Google search</MenuItem>
                            <MenuItem value='Instagram referral'>Instagram referral</MenuItem>
                            <MenuItem value='Hotel referral'>Hotel referral</MenuItem>
                            <MenuItem value='Other hotel referal'>Other hotel referal</MenuItem>
                            <MenuItem value='Agent referral'>Agent referral</MenuItem>
                            <MenuItem value='Walk in'>Walk in</MenuItem>
                            <MenuItem value='Other'>Other</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </div>
    )
}

export default StepThree
