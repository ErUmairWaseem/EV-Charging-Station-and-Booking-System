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
import {Grid,TextField,Button} from '@mui/material';
import {makeGetRequest,makePostRequest } from "../util/utils";
import swal from 'sweetalert';
import DataTable from 'react-data-table-component';
import Dashboard  from './dashboard';
import moment from 'moment/moment.js'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Feedback() {
    const history=useHistory();
    const[info,setinfo]=useState([]);
    const[page,setpage]=useState(1);
    const[perpage,setperpage]=useState(5);
    const [evid, setevid] = useState();
    const [evname, setevname] = useState();
    const [msg, setmsg] = useState();
    const[open,setOpen]=useState(false)


    const handleClickOpen = (e,e1) => {
        setevid(e)
        setevname(e1)
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    
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
 
    async function AddFeedback() {
        let bodyFormData=new FormData();
        bodyFormData.append("evid",evid);
        bodyFormData.append("evname",evname);
        bodyFormData.append("msg",msg);
        bodyFormData.append("uid",localStorage.getItem("user_id"));
        bodyFormData.append("uname",localStorage.getItem("uname"));
        makePostRequest(`/add/feedback`,bodyFormData).then((response)=> {
            if(response.data.status === "1") {
                toast.success('Feedback Added Successfully', {
                    position:'top-center',
                    autoClose:3000,
                    onClose: ()=>handleClose()
                 });
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
        name: 'Action',
        selector:"",
        cell: row => {
            return (
              <div> 
               <button onClick={()=>handleClickOpen(row.evid,row.evname)}>Give Feedback</button>
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
        title="Feedback Section "
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
<DialogContent>
    <center>
    <Grid item xs={12}>
<TextField
    value={msg}
    onChange={(e)=>setmsg(e.target.value)}
    placeholder='Leave Your Feedback Here...'
    label="Leave Your Feedback Here..."
/>
</Grid> <br/>
<Grid item xs={12}>
<button onClick={AddFeedback} className="buttonser">Send</button>
</Grid> 

    </center>

</DialogContent>
</Dialog>
    </Box>
      
  );
}