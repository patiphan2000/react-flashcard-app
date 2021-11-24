import React from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';

import GitHubIcon from '@mui/icons-material/GitHub';


function Footer() {
    return (
        <footer>
            <Box bgcolor="primary.dark">
                <Container maxWidth="lg">
                    <Grid container spacing={5}>
                        <Grid item xs={12}>
                            <Box>App by patiphan2000</Box>
                            <Box paddingBottom={3}>
                                <IconButton href="https://github.com/patiphan2000/react-flashcard-app" target="_blank" rel="noreferrer noopener">
                                    <GitHubIcon/>
                                </IconButton>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </footer>
    )
}

export default Footer
