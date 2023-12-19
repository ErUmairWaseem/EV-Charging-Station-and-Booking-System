import * as React from 'react';
import { useEffect, useState } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import Dashboard  from '../admin/dashboard';
import Box from '@mui/material/Box';
import {makeGetRequest,makePostRequest } from "../util/utils";
import swal from 'sweetalert';



export default function Graph() {
    const[jul,setjul]=useState();
    const[aug,setaug]=useState();
    const[sept,setsept]=useState();
    const[oct,setoct]=useState();
    const[nov,setnov]=useState();
    const[dec,setdec]=useState();

    
    
    async function view_data() {
        
        let bodyFormData=new FormData();
        makeGetRequest(`/all/months/count`,bodyFormData).then((response)=> {
            if(response.data.status === "1") {
                  setjul(response.data.jul[0].scount1);
                  setaug(response.data.aug[0].scount2);
                  setsept(response.data.sept[0].scount3);
                  setoct(response.data.oct[0].scount4);
                  setnov(response.data.nov[0].scount5);
                  setdec(response.data.dec[0].scount6);
            }
            else {
               setaug([]);
            }
        })
        .catch((err) => {
             swal("There was an error!","more error details", "warning");
        });
    }
    
    
    useEffect(()=>{
    
    view_data()
    
    },[])
  return (
    <Box>
    <Dashboard/>
    <div className='dashboarddata'>
    <div className=' cal_page'> 
   <h2>Monthly Booking of EV station statistics</h2>
    <BarChart
      xAxis={[
        {
          id: 'months',
          data: ['Jan','Feb','Mar','Apr','May','Jun','July','Aug','Sept','Oct','Nov','Dec'],
          scaleType: 'band',
        },
      ]}
      series={[
        {
          data: [0,0,0,0,0,0,jul,aug,sept,oct,nov,dec],
        },
      ]}
      width={800}
      height={500}
    />
    </div>
    </div>
    </Box>
  );
}
