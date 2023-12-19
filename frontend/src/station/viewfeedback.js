import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import * as React from 'react';
import Box from '@mui/material/Box';
import {Grid,TextField,Button} from '@mui/material';
import {makeGetRequest,makePostRequest } from "../util/utils";

import Dashboard  from './dashboard';
import moment from 'moment/moment.js'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import swal from 'sweetalert';


export default function ViewFeedback() {
    const history=useHistory();
 
    const [data,setdata]=useState([])

    async function viewfeedback1(){
        let bodyFormData = new FormData();
        makeGetRequest(`/view/feedback/${localStorage.getItem("user_id")}`, bodyFormData).then((response) => {
            if(response.data.status === "1") {
                setdata(response.data.data)
            }else{
                setdata([])
            }    
        }).catch((err) => {
          swal("There was an error!", "more error details", "warning");
        });
      }
  
      useEffect(()=>{
        viewfeedback1()
      },[])



  return ( 
    <Box>
        <Dashboard/>
        <div className='dashboarddata'>
        <div className=' cal_page'> 
        <div className="feedback_page">
    <h1>Customer Feedback</h1>
   { (data.length>0)?data.map(p=>  
    <div className='feedback'>
    <div className='f1'>
        <span> • {p.uname}</span>
        <span> •  {moment(p.date).format("MMM Do YY")}</span>
    </div>
    <div  className='f2'>
        {p.msg}
    </div>
    </div>
   )
   :<p className="text-center">No data found</p>
   }
   </div>
        </div>
       </div>
       <ToastContainer/>

    </Box>
      
  );
}