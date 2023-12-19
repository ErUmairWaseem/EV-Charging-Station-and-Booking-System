import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import * as React from 'react';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {Grid,TextField,MenuItem} from '@mui/material';
import {makeGetRequest,makePostRequest } from "../util/utils";
import swal from 'sweetalert';
import DataTable from 'react-data-table-component';
import Dashboard  from './dashboard';
import moment from 'moment/moment.js'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ViewSlotsBookings() {
    const history=useHistory();
    const[info,setinfo]=useState([]);
    const[page,setpage]=useState(1);
    const[perpage,setperpage]=useState(5);

    async function view_data() {
        let bodyFormData=new FormData();
        makeGetRequest(`/manages/slots/bookings?page=${page}&perpage=${perpage}&delay=1&id=${localStorage.getItem("user_id")}`,bodyFormData).then((response)=> {
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
    // async function DeleteBooking(id) {
    //     let bodyFormData=new FormData();
    //     makePostRequest(`/delete/booking/${id}`,bodyFormData).then((response)=> {
    //         if(response.data.status === "1") {
    //             toast.success('Deleted Successfully', {
    //                 position:'top-center',
    //                 autoClose:3000,
    //                 onClose: () => history.push('/manage/slot/booking')
    //              });
    //         }
    //         else {
    //             toast("Error warning"); 
    //         }
    //     })
    //     .catch((err) => {
    //          swal("There was an error!","more error details", "warning");
    //     });
    // }

    async function UpdateBooking(iid) {
        let bodyFormData=new FormData();
        bodyFormData.append("status","Booked");
        makePostRequest(`/update/status/${iid}`,bodyFormData).then((response)=> {
            if(response.data.status === "1") {
                toast.success('Updated Successfully', {
                    position:'top-center',
                    autoClose:3000,
                 });
                     view_data()
            }
            else {
                toast("Error warning"); 
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
    {
        name: 'Action',
        selector:"",
        cell: row => {
            return (
              <div> 
           {   (row.status=="Pending")?<button onClick={()=>UpdateBooking(row.evb_id)}>Booking Accepted</button>:<>completed</> }
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
        </div>
       </div>
       <ToastContainer/>
    </Box>
      
  );
}