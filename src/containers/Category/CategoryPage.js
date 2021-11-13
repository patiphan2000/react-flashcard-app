import React, { useState, useEffect } from 'react'
import { app } from '../../firebase'
import { getAuth } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { getCategory } from '../../db/database'

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

const auth = getAuth(app);

function CategoryPage ({}) {

    const navigate = useNavigate();

    const [categorys, setCategorys] = useState([]);

    const fetchData = async () => {
        if (auth.currentUser == null) {
            navigate('/login')
            return;
        }
        const cc = await getCategory(auth.currentUser.email);
        setCategorys(cc)
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
            <Grid container spacing={2}>
                {categorys.map((cat, index) => {
                    return (
                        <Grid key={index} item xs={12} sm={6}>
                            <Grid container alignItems="center" justifyContent="center">
                                <Card sx={{ width: {xs: 300, md: 400} }}>
                                    <CardActionArea component={Link} to={"/category/"+cat.name}>
                                        <CardMedia
                                        component="img"
                                        height="140"
                                        image={cat.imageUrl}
                                        alt={cat.name}
                                        />
                                        <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {cat.name}
                                        </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        </Grid>
                    )
                })}
            </Grid>
        </Grid>
    )
}

export default CategoryPage