import React, { useState, useEffect } from 'react'
import { app } from '../firebase'
import { getAuth } from "firebase/auth";
import { getCategory, compareFlashcard, updateFlashcard } from '../db/database'

import FlashcardTable from './FlashcardTable';
import AddButton from './AddButton';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import { Card, CardContent, CardActionArea } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';


const auth = getAuth(app);

function ManagePage (){

    const [selectedCategory, setselectedCategory] = useState("")
    const [categorys, setCategorys] = useState([]);
    const [flashcardList, setFlashcardList] = useState([])
    const [result, setResult] = useState(false)

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

    useEffect(() => {
        fetchData()
    }, [selectedCategory]);

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
                                    <CardActionArea onClick={()=>{(selectedCategory=="")? setselectedCategory(cat.name):setselectedCategory("")}}>
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
                { selectedCategory!=""?  
                <AddButton clickHandler={async ()=>{
                    const bb = await compareFlashcard();
                    setResult(bb)}}/>
                : ""}
                <Card sx={{ backgroundColor: result? "green":"red" }}>compare result</Card>
                <Button onClick={updateFlashcard}>update</Button>
            </Grid>
        </div>
    )
}

export default ManagePage
