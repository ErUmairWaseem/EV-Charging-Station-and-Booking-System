import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import * as React from 'react';
import Box from '@mui/material/Box';

import {makeGetRequest,makePostRequest } from "../util/utils";
import swal from 'sweetalert';
import DataTable from 'react-data-table-component';
import Dashboard  from '../admin/dashboard';
import moment from 'moment/moment.js'
import {Grid, Button,TextField,MenuItem,Divider} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AllSlotsBookings() {
    const history=useHistory();
    const[info,setinfo]=useState([]);
    const[page,setpage]=useState(1);
    const[perpage,setperpage]=useState(5);
    const[q,setq]=useState('')

    const[search,setsearch]=useState([]);
    const[pages,setpages]=useState(1);
    const[station, setstation]=useState([]);

    // const handlechange = (e) => {
    //     setq(e.target.value)
    //   }
    async function view_data() {
        let bodyFormData=new FormData();
        makeGetRequest(`/all/slots/bookings?page=${page}&perpage=${perpage}&delay=1`,bodyFormData).then((response)=> {
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

    async function view_station() {
        let bodyFormData=new FormData();
        makeGetRequest(`/view/evstation`,bodyFormData).then((response)=> {
            if(response.data.status === "1") {
                  setstation(response.data.data);
            }
            else {
                setstation([]);
            }
        })
        .catch((err) => {
             swal("There was an error!","more error details", "warning");
        });
    }
   

    async function search_data() {
        let bodyFormData=new FormData();
        makeGetRequest(`/search/slots/bookings?pages=${pages}&perpage=${perpage}&delay=1&q=${q}`,bodyFormData).then((response)=> {
            if(response.data.status === "1") {
                setsearch(response.data);
            }
            else {
                setsearch([]);
            }
        })
        .catch((err) => {
             swal("There was an error!","more error details", "warning");
        });
    }
    // async function onKeyPressed(e) {
    //     if(e.key === "Backspace")
    //     { 
    //       setpage(1);
    //       setpages(1);
    //     }
    //   }

      let ql=q.length   
      useEffect(()=>{
        if(ql>0){
            search_data()
        }else{
            view_data()
        }
        view_station()
      },[page,pages,ql])


  const columns = [
    {
        name:'Booking Id',
        selector:"evb_id",
    },
    {
        name:'User Id',
        selector:"uid",
    },
    {
        name: 'Station Name',
        selector:"evname",
    },
    {
        name: 'Slot',
        selector:"slot",
    },
    
    {
        name: 'Booking Date',
        selector:"date",
        cell: row => {
            return (
              <div> 
              {moment(row.date).format("MMM Do YY")}
              </div>
            )
        }
    },
    {
        name: 'Status',
        selector:"status",
    },
    
];
  return ( 
    <Box>
        <Dashboard/>
        <div className='dashboarddata'>
        <div className=' cal_page'> 
        <TextField
            value={q}
            onChange={(e)=>setq(e.target.value)}
            select
            placeholder='Select Station '
            label="Select Station"
           
        >
            {(station.length>0)?station.map(c=>    
            (<MenuItem value={c.cs_name}>{c.cs_name}</MenuItem> 
            ))
            :<p className="text-center">No data found</p>
            }
        </TextField>
        {
          (ql>0)?
          <DataTable
          title="Manage EV Slot Booking"
              columns={columns}
              data={search.data}
              pagination
              paginationServer
              currentPage={pages}
              paginationDefaultPage={1}
              paginationResetDefaultPage={1}
              paginationPerPage={perpage}
              paginationTotalRows={search.total}
              onChangePage={page=>setpage(page)}
              paginationComponentOptions={{ noRowsPerPage:true }}
             
          />
          :
        <DataTable
        title="Manage EV Slot Booking "
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
}
        </div>
       </div>
       <ToastContainer/>
    </Box>
      
  );
}