import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import * as React from 'react';
import Box from '@mui/material/Box';

import {makeGetRequest } from "../util/utils";
import swal from 'sweetalert';
import DataTable from 'react-data-table-component';
import Dashboard  from './dashboard';
import moment from 'moment/moment.js'

export default function ViewcarBooking() {
    const history=useHistory();
    const[info,setinfo]=useState([]);
    const[page,setpage]=useState(1);
    const[perpage,setperpage]=useState(5);
    const[pages,setpages]=useState(1);

    

    async function view_data() {
        let bodyFormData=new FormData();
        makeGetRequest(`/view/car/booking?page=${page}&perpage=${perpage}&delay=1&id=${localStorage.getItem("user_id")}`,bodyFormData).then((response)=> {
            if(response.data.status === "1") {
                  setinfo(response.data);
            }
            else {
               setinfo([]);
            }
        })
        .catch((err) => {
             swal("There was an error!","more error details", "warning");
        });
    }

 
useEffect(()=>{

    view_data()

},[page,pages])


  const columns = [
    {
        name:'Id',
        selector:"brid",
    },
    {
        name: 'Car Name',
        selector:"ecname",
    },
    {
        name: 'Booking Amount',
        selector:"bamt",
    },
    {
        name: 'Balance Amount',
        selector:"pamt",
    },
    {
        name: 'Pick City',
        selector:"pcity",
    },
    {
        name: 'Booking Date',
        selector:"bdate",
        cell: row => {
            return (
              <div> 
              {moment(row.bdate).format("MMM Do YY")}
              </div>
            )
        }
    },
    
    
   

];



  return (
 
    <Box>
        <Dashboard/>
        <div className='dashboarddata'>
        <div className=' cal_page'>  
        <DataTable
        title="View EV Cars Booking "
            columns={columns}
            data={info.data}
            pagination
            paginationServer
            currentPage={page}
            paginationDefaultPage={1}
            paginationResetDefaultPage={1}
            paginationPerPage={perpage}
            paginationTotalRows={info.total}
            onChangePage={page=>setpage(page)}
            paginationComponentOptions={{ noRowsPerPage:true }}
           
        />
        </div>
       </div>
    </Box>
      
  );
}