import React, {useState} from 'react'
import {
    Grid,
    TextField,
    FormControl,
    FormLabel,
    FormControlLabel,
    RadioGroup,
    Radio,
    InputLabel
} from '@material-ui/core'



function StepThree(props) {

    const margin2 = {marginTop: '40px'}

    const [file, setFile] = useState();

    const onChange = e => {
        let files = e.target.files;
        console.log()
        setFile(e.target.files[0].name)
        let reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload= (e) => {
            console.log(e.target.result)
            
            

            // const url = "url to api";
            // const formData={file:e.target.result}
            // return post(url, formData)
            // .then(response => console.log(response))
        }
    }


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
                    <InputLabel style={{marginTop: '60px'}}>Add a picture on your cash registry</InputLabel>
                    <input style={{display: 'none'}} type="file" name="file" id="file" onChange={(e)=>onChange(e)} />
                    <label style={{marginTop: '20px', padding: '5px 0px', width: '95px', height: '36px', textAlign: 'center', border: '1px solid #494949', borderRadius: '4px'}} for="file">Select file</label>
                    <label style={{marginLeft: '10px', color: '#494949'}}>{file ? file : 'No file chosen'}</label>
                </Grid>
            </div>
    )
}

export default StepThree
