import React, { useState,useEffect} from 'react';
import Box from '@mui/material/Box';

import Switch from '@mui/material/Switch';
import {Grid, Paper,Divider} from '@mui/material';

import { makePostRequest,makeGetRequest } from '../util/utils';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from "react-router-dom";
import Dashboard  from './dashboard';


export default function ClippedDrawer() {

    const history = useHistory();
    const[data,setdata]=useState([])
    const[location,setlocation]=useState()
    const [checked, setChecked] = useState(true);
    //const [a,seta]=useState()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    isactive()
  };

    function ViewProfile(){
      let bodyFormData = new FormData();
      makeGetRequest("/view/station/byid/"+localStorage.getItem("user_id"), bodyFormData).then((response) => {
          if (response.data.status === "1") {
           setdata(response.data.data[0])
           setlocation(response.data.data[0].location)
          //  setChecked(response.data.data[0].is_active)
          }else{  
            toast(response.data.message +" warning"); 
          }
                  
      }).catch((err) => {
        toast("There was an error!");
      });
  }

  function isactive(){
    let bodyFormData = new FormData();
    bodyFormData.append("id",localStorage.getItem("user_id"));
    bodyFormData.append("active",checked);
    makePostRequest("/update/isactive", bodyFormData).then((response) => {
        if (response.data.status === "1") {
          toast("Status Changed"); 
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
        <div className='profiledataev'><h3>EV Station Profile</h3><span> <Switch
      checked={checked}
      onChange={handleChange}
      inputProps={{ 'aria-label': 'controlled' }}
    /></span></div>
     <Divider/>
    <div className='profiledataev'><b>EV Station Status:</b> <span>{(checked==true)?<>Active</>:<>In Active</>}</span></div>
       
        <Divider/>
        <div className='profiledataev'><b>EV Station Name:</b> <span>{data.cs_name}</span></div>
        <Divider/>
        <div className='profiledataev'><b>EV Station UserName:</b> <span>{data.username}</span></div>
        <Divider/>
        <div className='profiledataev'><b>EV Station Capacity:</b> <span>{data.capacity}</span></div>
        <Divider/>
        <div className='profiledataev'><b>EV Station State:</b> <span>{data.cs_state}</span></div>
        <Divider/>
        <div className='profiledataev'><b>EV Station City:</b> <span>{data.cs_city}</span></div>
        <Divider/>
        <div className='profiledataev'><b>EV Station Area:</b> <span>{data.cs_area}</span></div>
        <Divider/>
        
        <div className='profiledataev'><b>EV Station Location:</b> <a href={location} target="_blank">Direction</a></div>
        <Divider/>
    </Paper>
    </div>
    <ToastContainer/>
    </Box>
  );
}
