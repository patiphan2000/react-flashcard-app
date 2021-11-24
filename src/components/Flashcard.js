import React, { useState, useEffect, useRef } from 'react'
import './Flashcard.css'

import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { Box } from '@mui/system';

function Flashcard({ flashcard, flip, setFlip }) {

    const [height, setHeight] = useState('initial')

    const frontEl = useRef()
    const backEl = useRef()

    const setMaxHeight = () => {
        const frontHeight = frontEl.current.getBoundingClientRect().height
        const backHeight = backEl.current.getBoundingClientRect().height
        setHeight(Math.max(frontHeight, backHeight, 250))
    }

    const polkaDot = (num1, num2, size) => {
        return (
            <>
                <Box className={`circle ${flip? 'flip':''}`} sx={{ 
                    background: '#b2a429',
                    top: num1 + "%", 
                    left: num2 + "%",
                    width: {xs: size + "rem", sm: (size+3) + "rem"}, 
                    height: {xs: size + "rem", sm: (size+3) + "rem"} }}></Box>
                <Box className={`circle ${!flip? 'flip':''}`} sx={{ 
                    background: '#a2cf6e',
                    top: num1 + "%",
                    left: num2 + "%", 
                    width: {xs: size + "rem", sm: (size+3) + "rem"}, 
                    height: {xs: size + "rem", sm: (size+3) + "rem"} }}></Box>
            </>
        )
    }

    useEffect(() => {
        setMaxHeight()
    }, [flashcard.text, flashcard.subText])

    return (
        <div>
            <div className={`flashcard ${flip? 'flip':''}`} style={{height: height}}>
                <div className="front" ref={frontEl}>
                    <Card sx={{ backgroundColor: '#fff8e7' }} onClick={()=>{setFlip(!flip)}}>
                        <CardContent>
                            <Typography className="text" variant="h5" sx={{ color: 'black' }}>{flashcard.front.text}</Typography>
                        </CardContent>
                        <CardContent>
                            <Typography className="subText" variant="subtitle2" sx={{ color: '#656565' }}>{flashcard.front.subText}</Typography>
                        </CardContent>
                        <CardActions style={{justifyContent: 'center'}}>
                            <IconButton aria-label="autorenewIcon" size="large" sx={{ color: '#656565' }}
                            onClick={()=>{setFlip(!flip)}}>
                                <AutorenewIcon fontSize="inherit" />
                            </IconButton>
                        </CardActions>
                    </Card>
                    </div>
                <div className="back" ref={backEl}>
                    <Card sx={{ backgroundColor: '#fff8e7' }} onClick={()=>{setFlip(!flip)}}>
                        <CardContent>
                            <Typography className="text" variant="h5" sx={{ color: 'black' }}>{flashcard.back.text}</Typography>
                        </CardContent>
                        <CardContent>
                            <Typography className="subText" variant="subtitle2" sx={{ color: '#656565' }}>{flashcard.back.subText}</Typography>
                        </CardContent>
                        <CardActions style={{justifyContent: 'center'}}>
                            <IconButton aria-label="autorenewIcon" size="large" sx={{ color: '#656565' }}
                            onClick={()=>{setFlip(!flip)}}>
                                <AutorenewIcon fontSize="inherit" />
                            </IconButton>
                        </CardActions>
                    </Card>
                </div>
            </div>
            {polkaDot(10, 50, 22)}
            {polkaDot(5, 18, 5)}
            {polkaDot(42, 18, 12)}
            {polkaDot(12, 82, 12)}
            {polkaDot(60, 75, 5)}
        </div>
    )
}

export default Flashcard