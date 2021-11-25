import React, { useState } from 'react'
import { app } from '../firebase'
import { getAuth } from "firebase/auth";
import { getPhoto, addNewCategory } from '../db/database'

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';

import CircularProgress from '@mui/material/CircularProgress';


const auth = getAuth(app);

const Alert = React.forwardRef(function Alert(props, ref) {
return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function AddCategoryForm() {

    const [newCategory, setNewCategory] = useState("")
    const [newCoverPhoto, setNewCoverPhoto] = useState("")
    const [coverPhotos, setCoverPhotos] = useState([])

    const [openSnackbar, setOpenSnackbar] = useState(false)
    const [alertBar, setAlertBar] = useState()
    const [loading, setLoading] = useState(false)

    const textChangeHandler = (e) => {
        const name = e.target.value
        setNewCategory(name)
    }

    const submitNewCategory = () => {
        if (newCategory.replace(/\s/g,"") !== "") {
            const status = addNewCategoryToDB()
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
                    fn error occurred card failed to add!
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

    const handleSelectPhoto = (url) => {
        // console.log(url);
        setNewCoverPhoto(url)
    }

    const searchPhotos = async () => {
        setLoading(true)
        if (newCategory.replace(/\s/g,"") === "") { return; }
        const photos = await getPhoto(newCategory)
        var newPhotoList = []
        for (var i in photos) {
            newPhotoList.push(photos[i])
        }
        setCoverPhotos(newPhotoList);
        setLoading(false)
    }

    const updatePhotoChoice = () => {
        if (loading) {
            return (
                <CircularProgress />
            )
        }
        if (coverPhotos.length > 0) {
            return (
                <div>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom align="center">
                    Select cover photo
                </Typography>
                <ImageList sx={{ width: {xs: 250, sm: 500}, height: 450 }} cols={3} rowHeight={164}>
                    {coverPhotos.map((item) => (
                        <ImageListItem key={item.id} onClick={()=>handleSelectPhoto(item.urls.regular)}>
                        <img
                            src={item.urls.regular}
                            alt={item.alt_describtion}
                            loading="lazy"
                        />
                        <ImageListItemBar
                        title={(item.urls.regular===newCoverPhoto)? "selected":""}
                        sx={{
                            background: (item.urls.regular===newCoverPhoto)?'rgba(65, 169, 76, 0.6)':'rgba(65, 169, 76, 0.0)'
                        }}
                        />
                        </ImageListItem>
                    ))}
                </ImageList>
                <Typography sx={{ fontSize: 14, color:"red" }} color="text.secondary" gutterBottom align="center">
                    * Category name and cover photo cannot be change
                </Typography>
                </div>
            )
        }
        return (<></>)
    }

    const addNewCategoryToDB = async () => {
        const email = auth.currentUser.email
        return addNewCategory({
            user: email,
            name: newCategory,
            imageUrl: newCoverPhoto
        })
    }

    return (
        <Card sx={{ width: { xs: '80vw', md: '50vw' } }}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Add new category
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                        required
                        id="categoryName"
                        label="category name"
                        type="text"
                        fullWidth={true}
                        name='categoryName'
                        onChange={textChangeHandler}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        { newCategory!==""?
                        <Button onClick={searchPhotos}>next</Button>
                        : <></>
                        }
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container alignItems="center" justifyContent="center">
                            { updatePhotoChoice() }
                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>
            <CardActions>
                { newCoverPhoto!==""?
                <Button size="small" color="success" onClick={submitNewCategory}>Add new category</Button>
                : <></>
                }
            </CardActions>

            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleClose}>
                {alertBar}
            </Snackbar>

        </Card>
    )
}

export default AddCategoryForm
