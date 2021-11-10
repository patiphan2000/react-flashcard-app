import React, { useState, useEffect, useRef } from 'react'
import { app } from '../firebase'
import { getAuth } from "firebase/auth";
import './FlashcardPage.css'
import { useParams } from "react-router-dom";
import { getCategory, updateFlashcard } from '../db/database'

import Typography from '@mui/material/Typography';
import Flashcard from './Flashcard';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import AddIcon from '@mui/icons-material/Add';

const auth = getAuth(app)

const card = {
    front: {
        text: 'Try to flip',
        subText: ''
    },
    back: {
        text: 'Click NEXT',
        subText: ''
    }
}

var indexNum = 0;

function FlashcardPage () {

    const { categoryName } = useParams()

    const [hoverAdd, setHoverAdd] = useState(false)
    const [flashcardList, setFlashcardList] = useState([card])
    const [cardNum, setCardNum] = useState(0)
    const [flip, setFlip] = useState(false)

    const fetchData = async () => {
        const categorys = await getCategory(auth.currentUser.email);
        for (var fc in categorys) {
            if (categorys[fc].name === categoryName) {
                // console.log(categorys[fc].flashcards);
                setFlashcardList(categorys[fc].flashcards)
                indexNum = categorys[fc].flashcards.length
            }
        }
    }

    useEffect(() => {
        if (auth.currentUser != null) {
          fetchData()
        }
      }, []);

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
                <Typography variant="h5" sx={{ marginTop: "15px" }}>{categoryName}</Typography>
            </Grid>
            <Grid item xs>
                <Flashcard flashcard={flashcardList[cardNum]} flip={flip} setFlip={setFlip}></Flashcard>
            </Grid>
            <Grid container spacing={{ xs: 2, md: 1 }}>
                <Grid item xs={12}>
                    <Button variant="contained" endIcon={<NavigateNextIcon />} sx={{
                        width: '12ch',
                        borderRadius: '12px',
                    }}
                    onClick={()=>{
                        var num = Math.floor(Math.random() * indexNum)
                        while (cardNum === num) { num = Math.floor(Math.random() * indexNum) }
                        setFlip(false)
                        setTimeout(function() {
                            setCardNum(num)
                        }, 80);
                        
                    }}>
                        next
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Button className="addButton" variant="contained" endIcon={<AddIcon sx={{marginLeft:hoverAdd? '0': '-12px'}}/>} color="success" 
                    onMouseOver={() => {setHoverAdd(true)}}
                    onMouseOut={() => {setHoverAdd(false)}}
                    onClick={updateFlashcard}>
                        {hoverAdd? 'add': null}
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default FlashcardPage
