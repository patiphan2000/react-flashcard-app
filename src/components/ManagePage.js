import React, { useState, useEffect } from 'react'
import { app } from '../firebase'
import { getAuth } from "firebase/auth";
import { getCategory } from '../db/database'

import FlashcardTable from './FlashcardTable';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import { Card, CardContent, CardActionArea } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';


const auth = getAuth(app);

function ManagePage ({ categoryName="", add=false }){

    const [selectedCategory, setselectedCategory] = useState(categoryName)
    const [categorys, setCategorys] = useState([]);
    const [flashcardList, setFlashcardList] = useState([])

    const fetchData = async () => {
        if (await auth.currentUser != null) {
            const cc = await getCategory(auth.currentUser.email);
            setCategorys(cc)
            if (selectedCategory == "") {
                setFlashcardList([])
            }
            for (var fc in categorys) {
                if (categorys[fc].name == selectedCategory) {
                    setFlashcardList(categorys[fc].flashcards)
                    console.log(flashcardList);
                }
            }
        }
    }

    useEffect(() => {
        fetchData()
    }, []);

    return (
        <div>
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
                                <Card key={index} sx={{ maxWidth: 400 }}>
                                    <CardActionArea>
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
                    <FlashcardTable flashcards={flashcardList}></FlashcardTable>     
                </Grid>
            </Grid>
        </div>
    )
}

export default ManagePage
