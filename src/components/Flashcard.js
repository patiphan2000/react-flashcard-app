import React, { useState, useEffect, useRef } from 'react'
import './Flashcard.css'

import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import AutorenewIcon from '@mui/icons-material/Autorenew';

function Flashcard({ flashcard }) {

    const [flip, setFlip] = useState(false)
    const [height, setHeight] = useState('initial')

    const frontEl = useRef()
    const backEl = useRef()

    const setMaxHeight = () => {
        const frontHeight = frontEl.current.getBoundingClientRect().height
        const backHeight = backEl.current.getBoundingClientRect().height
        setHeight(Math.max(frontHeight, backHeight, 250))
    }

    useEffect(() => {
        setMaxHeight()
    }, [flashcard.text, flashcard.subText])

    return (
        <div className={`flashcard ${flip? 'flip':''}`} style={{height: height}}>
            <div className="front" ref={frontEl}>
                <Card>
                    <CardContent>
                        <Typography className="text" variant="h5">{flashcard.front.text}</Typography>
                    </CardContent>
                    <CardContent>
                        <Typography className="subText" variant="subtitle2">{flashcard.front.subText}</Typography>
                    </CardContent>
                    <CardActions style={{justifyContent: 'center'}}>
                        <IconButton aria-label="autorenewIcon" size="large"
                        onClick={()=>{setFlip(!flip)}}>
                            <AutorenewIcon fontSize="inherit" />
                        </IconButton>
                    </CardActions>
                </Card>
                </div>
            <div className="back" ref={backEl}>
                <Card>
                    <CardContent>
                        <Typography className="text" variant="h5">{flashcard.back.text}</Typography>
                    </CardContent>
                    <CardContent>
                        <Typography className="subText" variant="subtitle2">{flashcard.back.subText}</Typography>
                    </CardContent>
                    <CardActions style={{justifyContent: 'center'}}>
                        <IconButton aria-label="autorenewIcon" size="large"
                        onClick={()=>{setFlip(!flip)}}>
                            <AutorenewIcon fontSize="inherit" />
                        </IconButton>
                    </CardActions>
                </Card>
            </div>
        </div>
    )
}

export default Flashcard