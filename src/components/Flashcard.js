import React, {useState} from 'react'
import './Flashcard.css'

import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import AutorenewIcon from '@mui/icons-material/Autorenew';

function Flashcard({ flashcard }) {

    const [flip, setFlip] = useState(false)

    return (
        <div className={`flashcard ${flip? 'flip':''}`}>
            <div className="front">
                <Card>
                    <CardContent>
                        <Typography variant="h6">{flashcard.front.text}</Typography>
                    </CardContent>
                    <CardActions style={{justifyContent: 'center'}}>
                        <IconButton aria-label="autorenewIcon" size="large"
                        onClick={()=>{setFlip(!flip)}}>
                            <AutorenewIcon fontSize="inherit" />
                        </IconButton>
                    </CardActions>
                </Card>
                </div>
            <div className="back">
                <Card>
                    <CardContent>
                        <Typography variant="h6">{flashcard.back.text}</Typography>
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