import React from 'react'

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Card, CardContent, CardActionArea } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';


function CategoryBox({cat, handleSelected}) {

    return (
        <Grid 
            container 
            direction="row"
            alignItems="center"
            justifyContent="center">
                <Card 
                sx={{ 
                    height: 80, 
                    minWidth: 150, 
                    maxWidth: 400 }}>
                    <CardActionArea onClick={()=>{handleSelected(cat.name)}}>
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
            </Grid>
    )
}

export default CategoryBox
