import React from 'react'
import {
    Grid,
    TextField,
    InputLabel,
    FormControl,
    TextareaAutosize,
} from '@material-ui/core'

function StepThree(props) {

    return (
            <div className="report-grid-container">
                <Grid >
                    <Grid align="center">
                        <h3 style={{marginBottom: '25px'}}>Source of business</h3>
                    </Grid>
                    <TextField  
                        placeholder="Guests from Twinpalms Phuket" 
                        label="Number of guests from Twinpalms Phuket?" 
                        type="number"
                        onChange={props.handleChangeHotelOneGuests('hoteloneguests')}
                        defaultValue={props.hotelOneGuests.hoteloneguests} 
                        error={props.hotelOneGuestsUndefined}
                        fullWidth 
                    />
                    <TextField  
                        style={{marginTop: '25px'}}
                        placeholder="Guests from Twinpalms Montazure" 
                        label="Number of guests from Twinpalms Montazure?" 
                        type="number"
                        onChange={props.handleChangeHotelTwoGuests('hoteltwoguests')}
                        defaultValue={props.hotelTwoGuests.hoteltwoguests} 
                        error={props.hotelTwoGuestsUndefined}
                        fullWidth 
                    />
                    <TextField  
                        style={{marginTop: '25px'}}
                        placeholder="Guests from outside" 
                        label="Number of guests outside?" 
                        type="number"
                        onChange={props.handleChangeOutsideGuests('outsideguests')}
                        defaultValue={props.outsideGuests.outsideguests}  
                        error={props.outsideGuestsUndefined}
                        fullWidth 
                    />
                    <Grid style={{minWidth: 100}}>
                        <InputLabel error={props.sourceOfBusinessUndefined} style={{marginTop: 45, marginBottom: 10}}>Specify where the guests from outside came from</InputLabel>
                        <Grid style={{display: 'flex', flexWrap: 'wrap'}}>
                            {props.source.map((item, key) => {
                                return (
                                    <Grid style={{display: 'flex', alignItems: 'center', width: '140px'}} key={key}>
                                        <input onChange={props.handleChangeSourceOfBusiness} placeholder={0} style={{width: '46px', height: '28px', padding: '2px', fontFamily: 'Roboto'}} type="number" />
                                        <span style={{margin: '5px 10px', width: '105px', fontSize: '16px', fontFamily: 'Roboto', lineHeight: '16px', color: '#0000008A'}}>{item.sourceOfBusiness}</span>    
                                    </Grid>
                                )
                            })}
                        </Grid>
                    </Grid>
                    <FormControl fullWidth>
                        <TextareaAutosize
                                style={{marginTop: 45}}
                                rowsMin={2.5}
                                rowsMax={2.5}
                                aria-label="maximum height"
                                placeholder="Additional information about source of business"
                                defaultValue=""
                                required
                        />
                    </FormControl>
                </Grid>
            </div>
    )
}

export default StepThree
