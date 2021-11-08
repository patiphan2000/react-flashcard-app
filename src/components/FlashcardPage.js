import React, { useState } from 'react'
import './FlashcardPage.css'

import Typography from '@mui/material/Typography';
import Flashcard from './Flashcard';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddIcon from '@mui/icons-material/Add';

function FlashcardPage () {

    const [hoverAdd, setHoverAdd] = useState(false)

    return (
        <div className="FlashcardPage">
            <Typography variant="h5" sx={{ marginTop: "15px" }}>flip your card</Typography>
            <Flashcard></Flashcard>
            <Grid container columnSpacing={1}>
                <Grid item xs={12}>
                    <Button variant="contained" endIcon={<NavigateNextIcon />} sx={{
                        width: '12ch',
                        borderRadius: '12px',
                    }}>
                        next
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Button className="addButton" variant="contained" endIcon={<AddIcon sx={{marginLeft:hoverAdd? '0': '-12px'}}/>} color="success" 
                    onMouseOver={() => {setHoverAdd(true)}}
                    onMouseOut={() => {setHoverAdd(false)}}>
                        {hoverAdd? 'add': null}
                    </Button>
                </Grid>
            </Grid>
        </div>
    )
}

export default FlashcardPage
