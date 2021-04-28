import React from 'react'
import {makeStyles} from '@material-ui/core'
import {
    Grid,
    TextField,
    InputLabel,
    MenuItem,
    FormControl,
    Select
} from '@material-ui/core'

function StepTwo(props) {

        //Styles
        const useStyles = makeStyles(theme => ({
            formControl: {
                minWidth: 100,
                marginTop: 40
            }
        }));
        const classes = useStyles();

    return (
            <div className="report-grid-container">
            <Grid >
                    <Grid align="center">
                        <h2 style={{ marginTop: 15, marginBottom: 5}}>Revenue</h2>
                    </Grid>
                    <TextField
                        style={{marginTop: '40px'}}
                        placeholder="Enter a number" 
                        label='Enter todays tables and checks' 
                        onChange={props.handleChangeTables('tables')}
                        defaultValue={props.tables.tables}        
                        fullWidth 
                        required
                    />
                    <TextField  
                        style={{marginTop: '40px'}}
                        placeholder="Enter food revenue" 
                        label="Enter todays food revenue" 
                        onChange={props.handleChangeFoodRevenue('foodrevenue')}
                        defaultValue={props.foodRevenue.foodrevenue}   
                        fullWidth 
                        required
                    />
                    <TextField  
                        style={{marginTop: '40px'}}
                        placeholder="Enter beverage revenue"
                        label="Enter todays beverage revenue" 
                        onChange={props.handleChangeBeverageRevenue('beveragerevenue')}
                        defaultValue={props.beverageRevenue.beveragerevenue}  
                        fullWidth 
                        required
                    />
                    <TextField  
                        style={{marginTop: '40px'}}
                        placeholder="Enter other revenue"
                        label="Enter Todays other revenue" 
                        onChange={props.handleChangeOtherRevenue('otherrevenue')}
                        defaultValue={props.otherRevenue.otherrevenue}  
                        fullWidth 
                        required
                        />
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

export default StepTwo
