import React, { useState } from 'react'
import './FlashcardPage.css'

import Typography from '@mui/material/Typography';
import Flashcard from './Flashcard';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import AddIcon from '@mui/icons-material/Add';

const sampleFlashcardList = [
    {
        id: 1,
        front: {
            text: 'front text',
            subText: 'front subtext'
        },
        back: {
            text: 'back text',
            subText: 'back subtext'
        }
    }
]

function FlashcardPage () {

    const [hoverAdd, setHoverAdd] = useState(false)

    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            className="FlashcardPage"
        >
            <Grid item xs={12}>
                <Typography variant="h5" sx={{ marginTop: "15px" }}>flip your card</Typography>
            </Grid>
            <Grid item xs>
                <Flashcard flashcard={sampleFlashcardList[0]}></Flashcard>
            </Grid>
            <Grid container spacing={{ xs: 2, md: 1 }}>
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
        </Grid>
    )
}

export default FlashcardPage
