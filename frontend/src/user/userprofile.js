import React, { useState,useEffect} from 'react';
import Box from '@mui/material/Box';


import {Grid, Paper,Divider} from '@mui/material';

import { makePostRequest,makeGetRequest } from '../util/utils';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from "react-router-dom";
import Dashboard  from './dashboard';


export default function UserProfile() {

    const history = useHistory();
    const[data,setdata]=useState([])
    // const[location,setlocation]=useState()
    
    function ViewProfile(){
      let bodyFormData = new FormData();
      makeGetRequest("/view/user/byid/"+localStorage.getItem("user_id"), bodyFormData).then((response) => {
          if (response.data.status === "1") {
           setdata(response.data.data[0])
        
          }else{  
            toast(response.data.message +" warning"); 
          }
                  
      }).catch((err) => {
        toast("There was an error!");
      });
  }

  useEffect(()=>{
    ViewProfile()
  },[])


  return (
    <Box sx={{ display: 'flex' }}>
    <Dashboard/>
    <div className='dashboarddata'>  
    <Paper elevation={3} className='stationdata'>
        <div className='profiledataev'><h3>User Profile</h3></div>
        <Divider/>
        <div className='profiledataev'><b>User Name:</b> <span>{data.ufname}</span></div>
        <Divider/>
        <div className='profiledataev'><b>Email:</b> <span>{data.email}</span></div>
        <Divider/>
        <div className='profiledataev'><b>Contact:</b> <span>{data.contact}</span></div>
        <Divider/>
        <div className='profiledataev'><b>User vehicle:</b> <span>{data.vehicle}</span></div>
        <Divider/>
        <div className='profiledataev'><b>User Status:</b> {(data.is_deleted==true)?<span style={{color:"green"}}>Active</span>:<span>Deleted</span>}</div>
        <Divider/>
        
      
    </Paper>
    </div>
    <ToastContainer/>
    </Box>
  );
}
