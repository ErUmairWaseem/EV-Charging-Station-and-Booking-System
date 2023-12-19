import React, { useState,useEffect} from 'react';
import Box from '@mui/material/Box';


import {Grid, Paper,Divider} from '@mui/material';

import { makePostRequest,makeGetRequest } from '../util/utils';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from "react-router-dom";
import Dashboard  from './dashboard';
// import Dialog from '@mui/material/Dialog';
// import DialogTitle from '@mui/material/DialogTitle';
// import DialogContent from '@mui/material/DialogContent';
// import IconButton from '@mui/material/IconButton';
// import CloseIcon from '@mui/icons-material/Close';
// import { generate } from 'generate-password';
export default function Evcarsview() {

    const history = useHistory();
    const[data,setdata]=useState([])
    const[open,setOpen]=useState(false)
 
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    
    function ViewCars(){
      let bodyFormData = new FormData();
      makeGetRequest("/view/evcars", bodyFormData).then((response) => {
          if (response.data.status === "1") {
           setdata(response.data.data)
          }else{  
            toast(response.data.message +" warning"); 
          }
                  
      }).catch((err) => {
        toast("There was an error!");
      });
  }

  

  useEffect(()=>{
    ViewCars()
    handleClickOpen()
  },[])


  return (
    <Box sx={{ display: 'flex' }}>
    <Dashboard/>
    <div className='dashboarddata'>  
    <div elevation={3} className='stationdata'>
    {(data.length>0)?data.map(c=>    
    (
        <div className="product-content product-wrap clearfix">
		<div className="row">
				<div className="col-md-5 col-sm-12 col-xs-12">
					<div className="product-image"> 
						<img src={process.env.PUBLIC_URL + `/assets/${c.cimg}`} alt="194x228" className="imgcar"/> 
					</div>
				</div>
				<div className="col-md-7 col-sm-12 col-xs-12">
				<div className="product-deatil">
						<h5 className="name">
							<a href="#">
								{c.cname} <span>EV Car</span>
							</a>
						</h5>
                        <span>Rent</span>
						<p className="price-container">
							<span>{c.rate} Per/Day</span>
						</p>
						<span className="tag1"></span> 
				</div>
				<div className="description">
				
				</div>
				<div className="product-info smart-form">
					<div className="row">
						<div className="col-md-6 col-sm-6 col-xs-6">
							<div className="rating">
								<label for="stars-rating-5"><i className="fa fa-star"></i></label>
								<label for="stars-rating-4"><i className="fa fa-star"></i></label>
								<label for="stars-rating-3"><i className="fa fa-star text-primary"></i></label>
								<label for="stars-rating-2"><i className="fa fa-star text-primary"></i></label>
								<label for="stars-rating-1"><i className="fa fa-star text-primary"></i></label>
							</div>
						</div>
                        <div className="col-md-6 col-sm-6 col-xs-6"> 
							<button className="btn btn-success" onClick={()=>history.push('/payment/'+c.carid)}>Book Now</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
    ))
    :<p className="text-center">No data found</p>
    }
    </div>
    </div>
    <ToastContainer/>

   
    </Box>
  );
}
