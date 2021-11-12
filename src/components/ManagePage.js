import React, { useState, useEffect, useRef } from 'react'
import { app } from '../firebase'
import { getAuth } from "firebase/auth";
import { getCategory, compareFlashcard, updateFlashcard } from '../db/database'

import FlashcardTable from './FlashcardTable';
import AddButton from './AddButton';
import AddFlashcardForm from './AddFlashcardForm';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import { Card, CardContent, CardActionArea } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';


const auth = getAuth(app);

function ManagePage (){

    const containerRef = React.useRef(null);

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
                        setFlashcardList(categorys[fc].flashcards)
                        return;
                    }
                }
            }
        }
    }

    const openTable = () => {
        var result = false
        if (selectedCategory != "") {
            result = true
        }
        return result
    }

    const changeSelectedCategory = (name) => {
        if (selectedCategory == name) {
            setSelectedCategory("")
            return;
        }
        setSelectedCategory(name)

    }

    useEffect(() => {
        fetchData()
    }, [selectedCategory]);

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
                <Grid item xs={12} sx={{marginTop: "2rem"}} ref={containerRef}>
                    <Collapse in={()=>{openTable()}} container={containerRef.current}>
                        <FlashcardTable flashcards={flashcardList}></FlashcardTable>     
                    </Collapse>
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
                        <AddFlashcardForm/>
                    </Grid>
                </SwipeableDrawer>
            </Grid>
    )
}

export default ManagePage
