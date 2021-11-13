import React, { useState, useEffect, useRef } from 'react'
import { app } from '../firebase'
import { getAuth } from "firebase/auth";
import { getCategory, deleteCard } from '../db/database'

import FlashcardTable from './FlashcardTable';
import AddButton from './AddButton';
import AddFlashcardForm from './AddFlashcardForm';
import AddCategoryForm from './AddCategoryForm';
import CategoryBox from './CategoryBox';

import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';

const auth = getAuth(app);

function ManagePage (){

    const [selectedCategory, setSelectedCategory] = useState("")
    const [categorys, setCategorys] = useState([]);
    const [flashcardList, setFlashcardList] = useState([])
    const [addCardDrawer, setAddCardDrawer] = useState(false)
    const [addCategoryDrawer, setAddCategoryDrawer] = useState(false)

    const [loading, setLoading] = useState(false)

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
                setLoading(false);
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
                        setLoading(false);
                        return;
                    }
                }
            }
        }
    }

    const changeSelectedCategory = (name) => {
        setLoading(true);
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
                        spacing={1}
                        sx={{ height: 110, maxWidth: '95vw', overflowX: 'auto' }}>
                        {categorys.map((cat, index) => {
                            const gotSelected = selectedCategory==cat.name;
                            return ( 
                            <CategoryBox 
                            key={index} 
                            cat={cat} 
                            selectedCategory={selectedCategory} 
                            handleSelected={changeSelectedCategory}/> 
                            )})}
                        <IconButton aria-label="addCategory" size="large" onClick={toggleAddCategoryDrawer(true)}>
                            <AddIcon fontSize="inherit" />
                        </IconButton>
                    </Stack>
                </Grid>
                <Grid item xs={12} sx={{marginTop: "2rem"}}>
                    {
                        (loading)?
                        <CircularProgress />
                        :
                        <FlashcardTable flashcards={flashcardList} handleDelete={deleteFlashcardFromDB} ></FlashcardTable>     
                    }
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
