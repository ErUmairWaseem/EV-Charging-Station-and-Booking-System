import React, { useState,useEffect} from 'react';
import Box from '@mui/material/Box';


import {Grid, Paper,Divider} from '@mui/material';

import { makePostRequest,makeGetRequest } from '../util/utils';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from "react-router-dom";
import Dashboard  from './dashboard';


export default function Plash() {

    const history = useHistory();
    const[data,setdata]=useState([])
    const[location,setlocation]=useState()
    
//     function ViewProfile(){
//       let bodyFormData = new FormData();
//       makeGetRequest("/view/station/byid/"+localStorage.getItem("user_id"), bodyFormData).then((response) => {
//           if (response.data.status === "1") {
//            setdata(response.data.data[0])
//            setlocation(response.data.data[0].location)
//           }else{  
//             toast(response.data.message +" warning"); 
//           }
                  
//       }).catch((err) => {
//         toast("There was an error!");
//       });
//   }

//   useEffect(()=>{
//     ViewProfile()
//   },[])


  return (
    <Box sx={{ display: 'flex' }}>
    <Dashboard/>
    <div className='dashboarddata'>
        <div className='flexbox'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <div class="card" onClick={()=>history.push("/view/evstations")}>
                <div class="image"><img className="img" src={process.env.PUBLIC_URL + `/assets/evcharge.png`} /></div>
            </div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <div class="card" onClick={()=>history.push("/view/evcars")}>
                <div class="image"><img className="img" src={process.env.PUBLIC_URL + `/assets/cars.jpg`} /></div>
            </div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {/* <div class="card">
                <div class="image"><img className="img" src={process.env.PUBLIC_URL + `/assets/cars.jpg`} /></div>
            </div> */}
        </div>
    </div>
    <ToastContainer/>
    </Box>
  );
}
