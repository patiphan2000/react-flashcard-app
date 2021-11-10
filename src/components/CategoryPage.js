import React, { useState, useEffect } from 'react'
import { app } from '../firebase'
import { getAuth } from "firebase/auth";
import { Link } from "react-router-dom";
import { getCategory } from '../db/database'

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

const auth = getAuth(app);

function CategoryPage ({}) {

    const [categorys, setCategorys] = useState([]);

    const fetchData = async () => {
        if (await auth.currentUser != null) {
            const cc = await getCategory(auth.currentUser.email);
            setCategorys(cc)
        }
    }

    useEffect(() => {
        fetchData()
    }, []);

    return (
        <Grid 
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ marginTop: "50px" }}>
            <Grid container justifyContent="center" spacing={2}>
                {categorys.map((cat, index) => {
                    return (
                        <Grid key={index} item xs={12} sm={6}>
                            <Card sx={{ maxWidth: 400 }}>
                                <CardActionArea component={Link} to={"/category/" + cat.name}>
                                    <CardMedia
                                    component="img"
                                    height="140"
                                    alt="green iguana"
                                    />
                                    <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {cat.name}
                                    </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    )
                })}
            </Grid>
        </Grid>
    )
}

export default CategoryPage
