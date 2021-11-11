import React, { useState } from "react";
import './AddButton.css'

import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

function AddButton({clickHandler}) {

    const [hoverAdd, setHoverAdd] = useState(false)

    return (
        <Button className="addButton" variant="contained" 
            endIcon={<AddIcon sx={{marginLeft:hoverAdd? '0': '-12px'}}/>} 
            color="success" 
            onMouseOver={() => {setHoverAdd(true)}}
            onMouseOut={() => {setHoverAdd(false)}}
            onClick={clickHandler}
            >
                {hoverAdd? 'add': null}
        </Button>
    )
}

export default AddButton
