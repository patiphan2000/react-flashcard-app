import React, { useState, useEffect } from 'react'
import { app } from '../../firebase'
import { getAuth } from "firebase/auth";
import { getCategory, deleteCard, deleteCategory } from '../../db/database'
import { useNavigate } from "react-router-dom";

import FlashcardTable from '../../components/FlashcardTable/FlashcardTable';
import AddButton from '../../components/AddButton';
import AddFlashcardForm from '../../components/AddFlashcardForm';
import AddCategoryForm from '../../components/AddCategoryForm';
import CategoryBox from '../../components/CategoryBox';

import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';


const auth = getAuth(app);


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function ManagePage (){

    const navigate = useNavigate()

    const [selectedCategory, setSelectedCategory] = useState("")
    const [categorys, setCategorys] = useState([]);
    const [flashcardList, setFlashcardList] = useState([])
    const [addCardDrawer, setAddCardDrawer] = useState(false)
    const [addCategoryDrawer, setAddCategoryDrawer] = useState(false)

    const [openSnackbar, setOpenSnackbar] = useState(false)
    const [openDialog, setOpenDialog] = useState(false)
    const [alertBar, setAlertBar] = useState()
    const [loading, setLoading] = useState(false)
    const [trigger, setTrigger] = useState(true)

    const toggleAddCardDrawer = (open) => (event) => {
        if (
          event &&
          event.type === 'keydown' &&
          (event.key === 'Tab' || event.key === 'Shift')
        ) {
          return;
        }
        setAddCardDrawer(open);
    };

    const toggleAddCategoryDrawer = (open) => (event) => {
        if (
          event &&
          event.type === 'keydown' &&
          (event.key === 'Tab' || event.key === 'Shift')
        ) {
          return;
        }
        setAddCategoryDrawer(open);
        setTrigger(!trigger)
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    }

    const handleClickOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false)
    }

    const changeSelectedCategory = (name) => {
        setLoading(true);
        if (selectedCategory === name) {
            setSelectedCategory("")
            return;
        }
        setSelectedCategory(name)

    }

    const deleteFlashcardFromDB = async (flashcards) => {
        const email = auth.currentUser.email
        const result = await deleteCard({
            user: email,
            category: selectedCategory,
            flashcards: flashcards
        })
        if (result) {
            setAlertBar(
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    flashcards has been deleted!
                </Alert>
            )
        }
        else {
            setAlertBar(
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    an error occurred card failed to delete!
                </Alert>
            )
        }
        setOpenSnackbar(true)
    }

    const deleteCategoryFromDB = async () => {
        const email = auth.currentUser.email
        const result = await deleteCategory({
            user: email,
            category: selectedCategory
        })
        return result;
    }

    useEffect(() => {

        const fetchData = async () => {
            if (auth.currentUser != null) {
                const cc = await getCategory(auth.currentUser.email);
                setCategorys(cc)
                if (selectedCategory === "") {
                    setFlashcardList([])
                    setLoading(false);
                    return;
                }
                else {
                    for (var fc in categorys) {
                        if (categorys[fc].name === selectedCategory) {
                            if (!categorys[fc].flashcards) {
                                setFlashcardList([])
                                return;
                            }
                            setFlashcardList(categorys[fc].flashcards)
                            setLoading(false);
                            return;
                        }
                    }
                }
            }
        }

        if (auth.currentUser == null) {
            navigate('/login')
            return;
        }

        fetchData()
    }, [selectedCategory, flashcardList, trigger]);

    return (
            <Grid container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                sx={{ marginTop: "50px" }}>
                <Grid item xs={12}>
                    <Stack
                        direction="row"
                        divider={<Divider orientation="vertical" flexItem />}
                        spacing={1}
                        sx={{ height: 110, maxWidth: '95vw', overflowX: 'auto' }}>
                        {categorys.map((cat, index) => {
                            return ( 
                                <CategoryBox 
                                key={index} 
                                cat={cat} 
                                handleSelected={changeSelectedCategory}/>
                            )})}
                    </Stack>

                    <IconButton aria-label="addCategory" size="large" onClick={toggleAddCategoryDrawer(true)}>
                        <AddIcon fontSize="inherit" />
                    </IconButton>
                    {
                        (selectedCategory!=="")?
                        <IconButton aria-label="addCategory" size="large" onClick={handleClickOpenDialog}>
                            <DeleteOutlineIcon fontSize="inherit" />
                        </IconButton>
                        : <></>
                    }

                </Grid>
                <Grid item xs={12} sx={{marginTop: "2rem"}}>
                    {
                        (loading)?
                        <CircularProgress />
                        :
                        <FlashcardTable flashcards={flashcardList} handleDelete={deleteFlashcardFromDB} ></FlashcardTable>     
                    }
                </Grid>
                { selectedCategory!==""?  
                <Grid item xs={12}>
                    <AddButton clickHandler={toggleAddCardDrawer(true)}/>
                </Grid>
                : ""}

                <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleClose}>
                    {alertBar}
                </Snackbar>

                <SwipeableDrawer
                    anchor='bottom'
                    open={addCardDrawer}
                    onClose={toggleAddCardDrawer(false)}
                    onOpen={toggleAddCardDrawer(true)}
                >
                    <Grid container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    sx={{ marginTop: "50px", marginBottom: "50px" }}>
                        <AddFlashcardForm category={selectedCategory}/>
                    </Grid>
                </SwipeableDrawer>

                <SwipeableDrawer
                    anchor='bottom'
                    open={addCategoryDrawer}
                    onClose={toggleAddCategoryDrawer(false)}
                    onOpen={toggleAddCategoryDrawer(true)}
                >
                    <Grid container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    sx={{ marginTop: "50px", marginBottom: "50px" }}>
                        <AddCategoryForm/>
                    </Grid>
                </SwipeableDrawer>

                <Dialog
                    open={openDialog}
                    onClose={handleCloseDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                    Are you sure you want to delete {selectedCategory} category?
                    </DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Delete {selectedCategory} category will delete all of the flashcards in the category.
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button 
                    color="error"
                    onClick={()=>{
                        handleCloseDialog()
                        deleteCategoryFromDB()
                    }} autoFocus>
                        Delete
                    </Button>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    </DialogActions>
                </Dialog>
                
            </Grid>
    )
}

export default ManagePage
