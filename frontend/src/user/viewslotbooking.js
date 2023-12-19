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

export default function ViewSlotBooking() {
    const history=useHistory();
    const[info,setinfo]=useState([]);
    const[page,setpage]=useState(1);
    const[perpage,setperpage]=useState(5);
    const[pages,setpages]=useState(1);
    const [date, setdate] = useState();
    const [time, settime] = useState();
    const [iid, setiid] = useState();
    const[open,setOpen]=useState(false)


    const handleClickOpen = (id) => {
        setiid(id)
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handlechangetime =(e)=>{
        settime(e.target.value)
      }
    async function view_data() {
        let bodyFormData=new FormData();
        makeGetRequest(`/manage/slot/booking?page=${page}&perpage=${perpage}&delay=1&id=${localStorage.getItem("user_id")}`,bodyFormData).then((response)=> {
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
    async function DeleteBooking(id) {
        let bodyFormData=new FormData();
        makePostRequest(`/delete/booking/${id}`,bodyFormData).then((response)=> {
            if(response.data.status === "1") {
                toast.success('Booking Cancel', {
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

    async function UpdateBooking() {
        let bodyFormData=new FormData();
        bodyFormData.append("date",date);
        bodyFormData.append("time",time);
        makePostRequest(`/update/booking/${iid}`,bodyFormData).then((response)=> {
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
        name:'Id',
        selector:"evb_id",
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
        name: 'Status',
        selector:"status",
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
        name: 'Action',
        selector:"",
        cell: row => {
            return (
              <div> 
                <EditIcon onClick={()=>handleClickOpen(row.evb_id)}/> | <DeleteIcon onClick={()=>DeleteBooking(row.evb_id)}/>
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
        <button onClick={()=>history.push("/user/slot/booking")} className='btn_cal buttonser'>Calender View</button> 
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



       <Dialog maxWidth='xl' fullWidth onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
    <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        <IconButton aria-label="close" onClick={handleClose}>
        <CloseIcon />
        </IconButton> 
    </DialogTitle>       
      
        
    <DialogContent>
<div>
<h5>Update Slot</h5>
            <div className="row m-0 bg-light">
            <Grid container spacing={3}>
        
        <Grid item xs={6}> 
         <TextField  type="date"  value={date} onChange={(e) => (setdate(e.target.value))}/>   
        </Grid>
        <Grid item xs={6}>
        <TextField
            value={time}
            onChange={handlechangetime}
            select
            placeholder='Select Slot'
            label="Select Slot"
        >
        <MenuItem value="7 Am to 8 Am">7 Am to 8 Am</MenuItem>
        <MenuItem value="8 Am to 9 Am">8 Am to 9 Am</MenuItem>
        <MenuItem value="9 Am to 10 Am">9 Am to 10 Am</MenuItem>
        <MenuItem value="10 Am to 11 Am">10 Am to 11 Am</MenuItem>
        <MenuItem value="11 Am to 12 Pm">11 Am to 12 Pm</MenuItem>
        <MenuItem value="12 Pm to 1 Pm">12 Pm to 1 Pm</MenuItem>
        <MenuItem value="1 Pm to 2 Pm">1 Pm to 2 Pm</MenuItem>
        <MenuItem value="2 Pm to 3 Pm">2 Pm to 3 Pm</MenuItem>
        <MenuItem value="3 Pm to 4 Pm">3 Pm to 4 Pm</MenuItem>
        <MenuItem value="4 Pm to 5 Pm">4 Pm to 5 Pm</MenuItem>
        <MenuItem value="5 Pm to 6 Pm">5 Pm to 6 Pm</MenuItem>
        <MenuItem value="6 Pm to 7 Pm">6 Pm to 7 Pm</MenuItem>
        <MenuItem value="7 Pm to 8 Pm">7 Pm to 8 Pm</MenuItem>
        <MenuItem value="8 Pm to 9 Pm">8 Pm to 9 Pm</MenuItem>
        <MenuItem value="9 Pm to 10 Pm">9 Pm to 10 Pm</MenuItem>
        <MenuItem value="10 Pm to 11 Pm">10 Pm to 11 Pm</MenuItem>
        <MenuItem value="12 Am to 1 Am">12 Am to 1 Am</MenuItem>
        <MenuItem value="2 Am to 2 Am">2 Am to 2 Am</MenuItem>
        </TextField>
        </Grid> 
        
        <Grid item xs={6}> 
        <button className="buttond" onClick={UpdateBooking}>Update Now</button>
        </Grid>
        </Grid> 
        </div>
</div>
        </DialogContent>
      </Dialog>
    </Box>
      
  );
}