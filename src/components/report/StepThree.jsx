import React, { useState, useEffect } from 'react'
import {
    Grid,
    TextField,
    InputLabel,
    FormControl,
    TextareaAutosize,
} from '@material-ui/core'
import axios from 'axios';



function StepThree(props) {

    const [val, setVal] = useState('');
   
    const [source, setSource] = useState([]);

    const sendGetRequest = async (url) => {
        try {
            const res = await axios.get(url);
            console.log(res.data);
            console.log('successfull get request')
            setSource(res.data)
        } catch (err) {
            // Handle Error Here
            console.error(err);
        }
    };
    useEffect(() => {
        let url = 'https://localhost:44306/api/GuestSourceOfBusiness'
        sendGetRequest(url)
    }, []) 









    return (
            <div className="report-grid-container">
                <Grid >
                    <Grid align="center">
                        <h3 style={{marginBottom: '25px'}}>Source of business</h3>
                    </Grid>
                    <TextField  
                        placeholder="Guests from hotel 1" 
                        label="Number of guests from hotel 1?" 
                        type="number"
                        onChange={props.handleChangeHotelGuests('hotelguests')}
                        defaultValue={props.hotelGuests.hotelguests} 
                        fullWidth 
                        required
                    />
                    <TextField  
                        style={{marginTop: '25px'}}
                        placeholder="Guests from hotel 2" 
                        label="Number of guests from hotel 2?" 
                        type="number"
                        onChange={props.handleChangeOutsideGuests('outsideguests')}
                        defaultValue={props.outsideGuests.outsideguests}  
                        fullWidth 
                        required
                    />
                    <TextField  
                        style={{marginTop: '25px'}}
                        placeholder="Guests from outside" 
                        label="Number of guests outside?" 
                        type="number"
                        onChange={props.handleChangeOutsideGuests('outsideguests')}
                        defaultValue={props.outsideGuests.outsideguests}  
                        fullWidth 
                        required
                    />
                    <Grid style={{minWidth: 100}}>
                        <InputLabel style={{marginTop: 45, marginBottom: 10}}>Specify where the guests from outside came from</InputLabel>
                        <Grid style={{display: 'flex', flexWrap: 'wrap'}}>
                            {source.map((item, key) => {
                                return (
                                    <Grid style={{display: 'flex', alignItems: 'center', width: '140px'}} key={key}>
                                        <input  value={val} onChange={e => {setVal(e.target.value)}} placeholder={0} style={{width: '46px', height: '28px', padding: '2px', fontFamily: 'Roboto'}} type="number" />
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
                                placeholder="Comments"
                                defaultValue=""
                                required
                        />
                    </FormControl>
                    {/* <FormControl style={{minWidth: '100px', marginTop: '40px'}} fullWidth required>
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
                    </FormControl> */}
                </Grid>
            </div>
    )
}

export default StepThree
