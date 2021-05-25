import React, { useState } from 'react'
import {
    Grid,
    TextField,
    InputLabel
} from '@material-ui/core'

function StepTwo(props) {

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
                        <h3 style={{marginBottom: '25px'}}>Revenue</h3>
                    </Grid>
                    <TextField
                        placeholder="Enter a number" 
                        label='Enter todays tables/checks' 
                        type="number"
                        onChange={props.handleChangeTables('tables')}
                        defaultValue={props.tables.tables}        
                        fullWidth 
                        required
                    />
                    <TextField  
                        style={{marginTop: '40px'}}
                        placeholder="Enter food revenue" 
                        type="number"
                        label="Enter todays food revenue" 
                        onChange={props.handleChangeFoodRevenue('foodrevenue')}
                        defaultValue={props.foodRevenue.foodrevenue}  
                        error={props.error}
                        fullWidth 
                        required
                    />
                    <TextField  
                        style={{marginTop: '40px'}}
                        placeholder="Enter beverage revenue"
                        label="Enter todays beverage revenue" 
                        type="number"
                        onChange={props.handleChangeBeverageRevenue('beveragerevenue')}
                        defaultValue={props.beverageRevenue.beveragerevenue}  
                        fullWidth 
                        required
                    />
                    <TextField  
                        style={{marginTop: '40px'}}
                        placeholder="Enter other revenue"
                        label="Enter todays other revenue" 
                        type="number"
                        onChange={props.handleChangeOtherRevenue('otherrevenue')}
                        defaultValue={props.otherRevenue.otherrevenue}  
                        fullWidth 
                        required
                    />
                    <Grid>
                        <InputLabel style={{marginTop: '60px'}}>Add a picture on your cash registry</InputLabel>
                        <input style={{display: 'none'}} type="file" name="file" id="file" onChange={(e)=>onChange(e)} />
                        <label style={{marginTop: '20px', padding: '5px 0px', width: '95px', height: '36px', textAlign: 'center', border: '1px solid #494949', borderRadius: '4px', cursor: 'pointer'}} htmlFor="file">Select file</label>
                        <label style={{marginLeft: '10px', color: '#494949'}}>{file ? file : 'No file chosen'}</label>
                    </Grid>
            </Grid>
            </div>
    )
}

export default StepTwo
