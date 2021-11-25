import React, { useState } from 'react';

import PropTypes from 'prop-types';

import { alpha } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import DeleteIcon from '@mui/icons-material/Delete';


const FlashcardTableToolbar = (props) => {

    const { numSelected, handleDelete } = props;

    const [openDialog, setOpenDialog] = useState(false)

    const handleClickOpenDialog = () => {
      setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false)
    }
    
    return (
      <>
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(numSelected > 0 && {
            bgcolor: (theme) =>
              alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
          }),
        }}
      >
        {numSelected > 0 ? (
          <Typography
            sx={{ flex: '1 1 100%' }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {numSelected} selected
          </Typography>
        ) : ''}
  
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton onClick={handleClickOpenDialog}>
              <DeleteIcon/>
            </IconButton>
          </Tooltip>
        ) : (
          <div></div>
        )}
      </Toolbar>

      <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
      >
          <DialogTitle id="alert-dialog-title">
          Are you sure you want to delete {numSelected} {numSelected>1? 'flashcards':'flashcard'}?
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
                flashcard will be gone foever!!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
          <Button 
          color="error"
          onClick={()=>{
              handleCloseDialog()
              handleDelete()
          }} autoFocus>
              Delete
          </Button>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          </DialogActions>
      </Dialog>
      </>
    );
};
  
FlashcardTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

export default FlashcardTableToolbar
