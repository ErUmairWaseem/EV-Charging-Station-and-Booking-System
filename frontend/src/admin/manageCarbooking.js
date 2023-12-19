import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import * as React from 'react';
import Box from '@mui/material/Box';

import {makeGetRequest,makePostRequest } from "../util/utils";
import swal from 'sweetalert';
import DataTable from 'react-data-table-component';
import Dashboard  from '../admin/dashboard';
import moment from 'moment/moment.js'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AllcarBooking() {
    const history=useHistory();
    const[info,setinfo]=useState([]);
    const[page,setpage]=useState(1);
    const[perpage,setperpage]=useState(5);

    async function view_data() {
        let bodyFormData=new FormData();
        makeGetRequest(`/all/cars/bookings?page=${page}&perpage=${perpage}&delay=1}`,bodyFormData).then((response)=> {
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

},[page])


  const columns = [
    {
        name:'Booking Id',
        selector:"brid",
    },
    {
        name:'User Id',
        selector:"uid",
    },
    {
        name: 'Station Name',
        selector:"ecname",
    },
    {
        name: 'Pick city',
        selector:"pcity",
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
        name: 'Booking Date',
        selector:"date",
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
        title="Manage EV Cars Booking "
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
       <ToastContainer/>
    </Box>
      
  );
}