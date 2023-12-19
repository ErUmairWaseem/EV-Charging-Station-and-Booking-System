import React, { useState,useEffect} from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import ElectricCarIcon from '@mui/icons-material/ElectricCar';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from "react-router-dom";


const drawerWidth = 240;

export default function ClippedDrawer() {

    const history = useHistory();


  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h5" noWrap component="div" >
          EcoWheels <ElectricCarIcon/>
          </Typography>
          <div className='abtcon'>
          <span onClick={()=>history.push("/aboutus")}>About us</span> &nbsp;&nbsp; <span onClick={()=>history.push("/contactus")} >Contact us</span>
          </div>

        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <br/>
        <List>
        <Divider />
       
        <Divider />
           <ListItem  onClick={()=>history.push("/admin/dashboard")} >
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
            <Divider />
            <ListItem  onClick={()=>history.push("/all/car/booking")} >
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="View Rental Booking" />
            </ListItem>
            
            <Divider />
            <ListItem  onClick={()=>history.push("/all/slot/booking")} >
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="View Slot Booking" />
            </ListItem>
            <Divider />
            <ListItem  onClick={()=>history.push("/all/feedback")} >
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Feedback" />
            </ListItem>
            <Divider />
            <ListItem  onClick={()=>history.push("/logout")} >
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Log Out" />
            </ListItem>
        </List>
      </Drawer>
      


      
<ToastContainer/>
    </Box>
  );
}
