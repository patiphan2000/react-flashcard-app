import React, { useState, useEffect, useRef } from 'react'
import { app } from '../firebase'
import { getAuth } from "firebase/auth";
import { getCategory, deleteCard } from '../db/database'

import FlashcardTable from './FlashcardTable';
import AddButton from './AddButton';
import AddFlashcardForm from './AddFlashcardForm';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import { Card, CardContent, CardActionArea } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';


const auth = getAuth(app);

function ManagePage (){

    const [selectedCategory, setSelectedCategory] = useState("")
    const [categorys, setCategorys] = useState([]);
    const [flashcardList, setFlashcardList] = useState([])
    const [drawer, setDrawer] = useState(false)

    const toggleDrawer = (open) => (event) => {
        if (
          event &&
          event.type === 'keydown' &&
          (event.key === 'Tab' || event.key === 'Shift')
        ) {
          return;
        }
        setDrawer(open);
    };

    const fetchData = async () => {
        if (await auth.currentUser != null) {
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
                        spacing={2}>
                        {categorys.map((cat, index) => {
                            return (
                                <Card key={index} sx={{ minWidth: 150, maxWidth: 400 }}>
                                    <CardActionArea onClick={()=>{changeSelectedCategory(cat.name)}}>
                                        <CardMedia
                                        component="img"
                                        height="100"
                                        alt="green iguana"
                                        sx={{ position: 'absolute' }}
                                        />
                                        <CardContent>
                                        <Typography gutterBottom variant="h6" component="div">
                                            {cat.name}
                                        </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                                )})}
                    </Stack>
                </Grid>
                <Grid item xs={12} sx={{marginTop: "2rem"}}>
                    <FlashcardTable flashcards={flashcardList} handleDelete={deleteFlashcardFromDB} ></FlashcardTable>     
                </Grid>
                { selectedCategory!=""?  
                <Grid item xs={12}>
                    <AddButton clickHandler={toggleDrawer(true)}/>
                </Grid>
                : ""}
                <SwipeableDrawer
                    anchor='bottom'
                    open={drawer}
                    onClose={toggleDrawer(false)}
                    onOpen={toggleDrawer(true)}
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
            </Grid>
    )
}

export default ManagePage
