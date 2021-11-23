import React, { useState, useEffect } from 'react'
import { app } from '../../firebase'
import { getAuth } from "firebase/auth";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getCategory } from '../../db/database'

import AddButton from '../../components/AddButton';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


const auth = getAuth(app);

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

function CategoryPage ({}) {

    const { message } = useParams()

    const navigate = useNavigate();

    const [categorys, setCategorys] = useState([]);
    const [openSnackbar, setOpenSnackbar] = useState(false)

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

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
        if (message != null) {
            setOpenSnackbar(true)
        }
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
                                    <CardActionArea component={Link} to={"/flashcard/"+cat.name}>
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
            <Grid container justifyContent="center" sx={{ marginTop: { xs: "20px", sm: "50px"} }}>
                <AddButton clickHandler={()=>{ navigate('/manage') }}></AddButton>
            </Grid>
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleClose}>
                <Alert severity="error" onClose={handleClose} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
            
        </Grid>
    )
}

export default CategoryPage
