import React from 'react'
import {
    Grid,
    FormControl,
    InputLabel,
    TextareaAutosize,
} from '@material-ui/core'



function StepFour() {
   

    return (
            <Grid className="report-grid-container">
                <Grid align="center">
                    <h3 style={{marginBottom: '25px'}}>Comments</h3>
                </Grid>

                <FormControl style={{minWidth: '100px', marginTop: '0px', marginBottom: '25px'}} fullWidth required>
                        <InputLabel>Report additional information or comments</InputLabel>
                        <TextareaAutosize
                            style={{marginTop: 60}}
                            rowsMin={10}
                            rowsMax={10}
                            aria-label="maximum height"
                            placeholder="Type here..."
                            defaultValue=""
                            required
                        />
                </FormControl>
            </Grid>
    )
}

export default StepFour
