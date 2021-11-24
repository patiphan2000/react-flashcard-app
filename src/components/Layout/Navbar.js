import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { app } from '../../firebase'
import { getAuth, signOut } from "firebase/auth";

import UseSwitchesCustom from '../UseSwitchCustom';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu'
import ListItemIcon from '@mui/material/ListItemIcon';

import ClassIcon from '@mui/icons-material/Class';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';


const auth = getAuth(app)

function Navbar({ authState, setAuthState, currentTheme, setTheme }) {

  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false)

  const user = authState.currentUser

  const isMenuOpen = Boolean(anchorEl);

  const logout = async (e) => {
      e.preventDefault()
      await signOut(auth).then(response => {
        setAuthState({
          currentUser: null
        })
        setAnchorEl(false)
        navigate('/login')
      })
  }

  const toggleMenu = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setMenuOpen(open);
  };

  const handleProfileMenuOpen = (event) => {
      setAnchorEl(event.currentTarget);
      };
  
      const handleMenuClose = () => {
      setAnchorEl(null);
      };

  const menuId = 'primary-search-account-menu';
  
  const renderMenu = (
      <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      >
        <MenuItem onClick={logout}>Logout</MenuItem>
      </Menu>
  );

  const listMenu = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      // onClick={toggleMenu(false)}
      onKeyDown={toggleMenu(false)}
    >
      <List>

        <ListItem button key="Category" component={Link} to="/category">
          <ListItemIcon>
            <ClassIcon/>
          </ListItemIcon>
          <ListItemText primary="Category" />
        </ListItem>

        <ListItem button key="Manage" component={Link} to="/manage">
          <ListItemIcon>
            <ManageSearchIcon/>
          </ListItemIcon>
          <ListItemText primary="Manage" />
        </ListItem>

      </List>
      <Divider />
      <List>
        <ListItem button key="themeSwitch">   
            <UseSwitchesCustom currentTheme={currentTheme} setTheme={setTheme}/>
        </ListItem>
      </List>
    </Box>
  );

  return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={ toggleMenu(true) }
            >
              <MenuIcon />
            </IconButton>
            <Typography 
            align="left"
            variant="h4" 
            component="div"
            onClick={()=>{ navigate("/") }}
            sx={{ flexGrow: 1, cursor: 'pointer' }}>
              FlashCard
            </Typography>
            {
              user != null?
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              :
              <Button component={Link} to="/login" color="inherit">Login</Button>
            }
          </Toolbar>
        </AppBar>
        {renderMenu}
        <Drawer
            open={ menuOpen }
            onClose={toggleMenu(false)}
          >
            { listMenu }
        </Drawer>
      </Box>
  )
}

export default Navbar
