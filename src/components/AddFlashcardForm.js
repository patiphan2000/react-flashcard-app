import React, { useState } from 'react'

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';


const bull = (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
      •
    </Box>
  );

function AddFlashcardForm() {

    const [newCard, setNewcard] = useState({
        front: {
            text: '',
            subText: ''
        },
        back: {
            text: '',
            subText: ''
        }
    })

    const textChangeHandler = (e) => {
        const {name, value} = e.target
        var card = newCard
        const [side, type] = name.split("-")
        card[side][type] = value
        setNewcard(card)
    }

    return (
        <Card sx={{ width: { xs: '80vw', md: '50vw' } }}>
            <CardContent>
                <Typography variant="h4" component="div" sx={{marginBottom: '10px'}}>
                    New flashcard
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                        required
                        id="frontText"
                        label="Front text"
                        type="text"
                        fullWidth='true'
                        name='front-text'
                        onChange={textChangeHandler}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                        id="frontSubtext"
                        label="Front subtext"
                        type="text"
                        name='front-subText'
                        onChange={textChangeHandler}
                        sx={{ width:'60%' }}
                        />
                        <Tooltip title={
                            <React.Fragment>
                                <Typography color="inherit">subtext</Typography>
                                {"use to describe something like hint or pronunciation."}
                            </React.Fragment>}
                        placement="right">
                            <IconButton>
                                <InfoIcon />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                    <Divider variant="middle" />
                    <Grid item xs={12}>
                        <TextField
                        required
                        id="backText"
                        label="Back text"
                        type="text"
                        fullWidth='true'
                        name='back-text'
                        onChange={textChangeHandler}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                        id="backSubtext"
                        label="Back subtext"
                        type="text"
                        name='back-subText'
                        onChange={textChangeHandler}
                        sx={{ width:'60%' }}
                        />
                        <Tooltip title={
                            <React.Fragment>
                                <Typography color="inherit">subtext</Typography>
                                {"use to describe something like hint or pronunciation."}
                            </React.Fragment>}
                        placement="right">
                            <IconButton>
                                <InfoIcon />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                </Grid>
            </CardContent>
            <CardActions>
            <Button size="small" color="success" onClick={()=>{console.log(newCard);}}>Add new card</Button>
            </CardActions>
        </Card>
    )
}

export default AddFlashcardForm
