import React, { useState } from 'react'
import { app } from '../firebase'
import { getAuth } from "firebase/auth";
import { addNewCard } from '../db/database'

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
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


const auth = getAuth(app);

const Alert = React.forwardRef(function Alert(props, ref) {
return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function AddFlashcardForm({category}) {

    const [newCard, setNewcard] = useState({
        back: {
            text: '',
            subText: ''
        },
        front: {
            text: '',
            subText: ''
        }
    })
    const [openSnackbar, setOpenSnackbar] = useState(false)
    const [alertBar, setAlertBar] = useState()

    const textChangeHandler = (e) => {
        const {name, value} = e.target
        var card = newCard
        const [side, type] = name.split("-")
        card[side][type] = value
        setNewcard(card)
    }

    const submitNewCategory = () => {
        if (newCard.front.text.replace(/\s/g,"") !== "" 
            &&
        newCard.back.text.replace(/\s/g,"") !== "") {
            const status = addNewCardToDB()
            if (status) {
                setAlertBar(
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        flashcard is successfully added!
                    </Alert>
                )
                setOpenSnackbar(true)
                return;
            }
            setAlertBar(
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    an error occurred card failed to add!
                </Alert>
            )
        }
        setAlertBar(
            <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                front text and back text cannot be empty!
            </Alert>
        )
        setOpenSnackbar(true)
    }

    const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
        return;
    }

    setOpenSnackbar(false);
    };

    const addNewCardToDB = async () => {
        const email = await auth.currentUser.email
        return addNewCard({
            user: email,
            category: category,
            card: newCard
        })
    }

    return (
        <Card sx={{ width: { xs: '80vw', md: '50vw' } }}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Add new flashcard to
                </Typography>
                <Typography variant="h4" component="div" sx={{marginBottom: '10px'}}>
                    {category} category
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                        required
                        id="frontText"
                        label="Front text"
                        type="text"
                        fullWidth={true}
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
                        fullWidth={true}
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
            <Button size="small" color="success" onClick={submitNewCategory}>Add new card</Button>
            </CardActions>

            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleClose}>
                {alertBar}
            </Snackbar>

        </Card>
    )
}

export default AddFlashcardForm
