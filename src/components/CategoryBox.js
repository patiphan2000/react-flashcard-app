import React from 'react'

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Card, CardContent, CardActionArea } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


function CategoryBox({cat, selectedCategory, handleSelected, handleDelete}) {

    const gotSelected = selectedCategory===cat.name;

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

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
                    maxWidth: 400,
                    transition: '0.2s ease',
                    boxShadow : (gotSelected)? '0 0 7px 1px #f0f, 0 0 10px 2px #0ff':'' }}>
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
                <IconButton 
                aria-label="addCategory" 
                size="small"
                sx={{
                    position:'absolute',
                    zIndex:(gotSelected)? 0:-2,
                    transition: '0.2s ease',
                    transform: (gotSelected)? 'translate(0px, 60px)':'translate(0px, 20px)'
                }}
                onClick={handleClickOpen}>
                    <DeleteOutlineIcon fontSize="inherit" />
                </IconButton>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                    Are you sure you want to delete {selectedCategory} category?
                    </DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Delete {selectedCategory} category will delete all of the flashcards in the category.
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button 
                    color="error"
                    onClick={()=>{
                        handleClose()
                        handleDelete()
                    }} autoFocus>
                        Confirm
                    </Button>
                    <Button onClick={handleClose}>Cancel</Button>
                    </DialogActions>
                </Dialog>
            </Grid>
    )
}

export default CategoryBox
