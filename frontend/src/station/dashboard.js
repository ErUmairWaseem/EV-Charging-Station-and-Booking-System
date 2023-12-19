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
// import {Grid} from '@mui/material';
// import Dialog from '@mui/material/Dialog';
// import DialogTitle from '@mui/material/DialogTitle';
// import DialogContent from '@mui/material/DialogContent';
// import IconButton from '@mui/material/IconButton';
// import CloseIcon from '@mui/icons-material/Close';
// import { makePostRequest } from '../util/utils';
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
        <Box sx={{ overflow: 'auto' }}>
        <Divider />
          <List>
              <ListItem  disablePadding>
                <ListItemButton onClick={()=>history.push("/station/dashboard")}>
                  <ListItemIcon>
                    <InboxIcon /> 
                  </ListItemIcon>
                  <ListItemText primary="Profile" />
                </ListItemButton>
              </ListItem>
          </List>
          <Divider />
          <List>
              <ListItem disablePadding>
                <ListItemButton onClick={()=>history.push("/update/station")}>
                  <ListItemIcon>
                  <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary="Update Station" />
                </ListItemButton>
              </ListItem>
          </List>
          <Divider />
          <List>
              <ListItem disablePadding>
                <ListItemButton onClick={()=>history.push("/manage/slots/bookings")}>
                  <ListItemIcon>
                  <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary="Manage EV Bookings" />
                </ListItemButton>
              </ListItem>
          </List>
          <Divider />
          <ListItem  onClick={()=>history.push("/view/feedback")} >
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
        </Box>
      </Drawer>
      


      
<ToastContainer/>
    </Box>
  );
}
