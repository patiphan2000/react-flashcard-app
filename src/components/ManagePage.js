import React, { useState, useEffect, useRef } from 'react'
import { app } from '../firebase'
import { getAuth } from "firebase/auth";
import { getCategory, deleteCard } from '../db/database'

import FlashcardTable from './FlashcardTable';
import AddButton from './AddButton';
import AddFlashcardForm from './AddFlashcardForm';
import AddCategoryForm from './AddCategoryForm';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import { Card, CardContent, CardActionArea } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';


const auth = getAuth(app);

function ManagePage (){

    const [selectedCategory, setSelectedCategory] = useState("")
    const [categorys, setCategorys] = useState([]);
    const [flashcardList, setFlashcardList] = useState([])
    const [addCardDrawer, setAddCardDrawer] = useState(false)
    const [addCategoryDrawer, setAddCategoryDrawer] = useState(false)

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
    };

    const fetchData = async () => {
        if (auth.currentUser != null) {
            const cc = await getCategory(auth.currentUser.email);
            setCategorys(cc)
            if (selectedCategory == "") {
                setFlashcardList([])
                return;
            }
            else {
                for (var fc in categorys) {
                    if (categorys[fc].name == selectedCategory) {
                        if (!categorys[fc].flashcards) {
                            setFlashcardList([])
                            return;
                        }
                        setFlashcardList(categorys[fc].flashcards)
                        return;
                    }
                }
            }
        }
    }

    const changeSelectedCategory = (name) => {
        if (selectedCategory == name) {
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
        return result;
    }

    useEffect(() => {
        fetchData()
    }, [selectedCategory, flashcardList]);

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
                        spacing={2}
                        sx={{ height: 110, maxWidth: '90vw', overflowX: 'auto' }}>
                        {categorys.map((cat, index) => {
                            return (
                                <Grid 
                                container 
                                direction="row"
                                alignItems="center"
                                justifyContent="center">
                                    <Card key={index} sx={{ height: 80, minWidth: 150, maxWidth: 400 }}>
                                        <CardActionArea onClick={()=>{changeSelectedCategory(cat.name)}}>
                                            <CardMedia
                                            component="img"
                                            height="100"
                                            alt={cat.name}
                                            image={cat.imageUrl}
                                            sx={{ position: 'absolute' }}
                                            />
                                            <CardContent sx={{
                                                position:'absolute',
                                                color:'white',
                                                alignItems: 'center',
                                                textShadow : '1px 1px 10px #fff, 2px 2px 2px #212121'
                                                }}>
                                                <Typography gutterBottom variant="h5" component="div">
                                                    {cat.name}
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                    { selectedCategory==cat.name?
                                        <IconButton aria-label="addCategory" size="small">
                                            <AddIcon fontSize="inherit" />
                                        </IconButton>
                                        : <></>
                                    }
                                </Grid>
                                )})}
                        <IconButton aria-label="addCategory" size="large" onClick={toggleAddCategoryDrawer(true)}>
                            <AddIcon fontSize="inherit" />
                        </IconButton>
                    </Stack>
                </Grid>
                <Grid item xs={12} sx={{marginTop: "2rem"}}>
                    <FlashcardTable flashcards={flashcardList} handleDelete={deleteFlashcardFromDB} ></FlashcardTable>     
                </Grid>
                { selectedCategory!=""?  
                <Grid item xs={12}>
                    <AddButton clickHandler={toggleAddCardDrawer(true)}/>
                </Grid>
                : ""}
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
                
            </Grid>
    )
}

export default ManagePage
