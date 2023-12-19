import React, { useState,useEffect} from 'react';
import { makePostRequest,makeGetRequest } from '../util/utils';
import { useHistory,useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import AddCircleSharpIcon from '@mui/icons-material/AddCircleSharp';
import RemoveCircleSharpIcon from '@mui/icons-material/RemoveCircleSharp';
import {Box} from "@mui/material";
import {MenuItem, TextField} from '@mui/material';
import swal from 'sweetalert';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

const Validation_Schema = Yup.object().shape({
  amt:Yup.string().required('Required'),
  name: Yup.string().required('Required'),
  exdate: Yup.string().required('Required'),
 
  cardno: Yup.string().required('Required')
  .max(16, 'Card no must be greater than or equal to 16 digits')
  .min(16, 'Card no must be contain 16 digits'),

  cvv: Yup.string().required('Required')
  .max(3, 'CVV no must be greater than or equal to 3 digits')
  .min(3, 'CVV no must be contain 3 digits'),

});

const location_city = 
[
    {lid:1,city:'Mumbai',sid:"Maharastra"},
    {lid:2,city:'Pune',sid:"Maharastra"},
    {lid:3,city:'Nashik',sid:"Maharastra"},
    {lid:4,city:'Nagpur',sid:"Maharastra"},
    {lid:5,city:'Surat',sid:"Gujrat"},
    {lid:6,city:'Ahemedabad',sid:"Gujrat"},                 
];

const location_state = 
[
    {sid:1,state:'Maharastra'},
    {sid:2,state:'Gujrat'},
                     
];
export default function Payment() {

    const history = useHistory();
    const [open1,setOpen1]=useState(false);
    const[otp,setotp]=useState()
    const[eotp,seteotp]=useState()
    const[amt,setamt]=useState()
    const[days,setdays]=useState(1)
    const[data,setdata]=useState([])
    const {id}=useParams()
    const[city,setcity]=useState('');
    const[state,setstate]=useState('');
    const[stateid,setstateid]=useState('');
    const [date, setdate] = useState();
    const current = new Date();
    const ndate = `${current.getFullYear()}-0${current.getMonth()+1}-${current.getDate()}`;

    const handlechangestate = (e) => {
        setstate(e.target.value)
     
      }

      const handlechangecity = (e) => {
        setcity(e.target.value)
      }
  

    async function add(){
      setdays(days+1);
  }
  async function sub(){
      if(days!==1){
        setdays(days-1);
      }else{

      }
      
  }

    function ViewCarsbyid(){
      let bodyFormData = new FormData();
      makeGetRequest("/view/evcars/byid/"+id, bodyFormData).then((response) => {
          if (response.data.status === "1") {
           setdata(response.data.data[0])
           setamt(response.data.data[0].rate)
          }else{  
            toast(response.data.message +" warning"); 
          }
                  
      }).catch((err) => {
        toast("There was an error!");
      });
  }
  async function SendMailOtp(){

    let bodyFormData = new FormData();
         bodyFormData.append("email",localStorage.getItem("uemail"));
        //bodyFormData.append("email","sohamgite14@gmail.com");
        bodyFormData.append("otp",otp);
        makePostRequest("/otp/mail/booking", bodyFormData).then((response) => {
            if (response.data.status === "1") {
              swal("Success","OTP is send to your Email", "success");    
            }else{  
                swal("Error",response.data.message, "warning"); 
            }
            
        }).catch((err) => {
            swal("There was an error!", "more error details", "warning");
        });
  }
  function call(){
     SendMailOtp()
   }

  async function generateotp(){
    // setotp(Math.floor(1000 + Math.random() * 9000))
    // setTimeout(() => SendMailOtp(),5000);
    let bodyFormData = new FormData();
    makeGetRequest("/send/otp/booking", bodyFormData).then((response) => {
        if (response.data.status === "1") {
          setOpen1(true)
         setotp(response.data.otp)
        }else{  
          toast(response.data.message +" warning"); 
        }
                
    }).catch((err) => {
      toast("There was an error!");
    });
  }

  async function checkotp(){
    if(otp==eotp){
    
      let bodyFormData = new FormData();
      let bamt=(amt*days)/2
      let pamt=parseInt(amt*days)-parseInt(bamt)
            bodyFormData.append("bamt",bamt);
            bodyFormData.append("pamt",pamt);
            bodyFormData.append("uid",localStorage.getItem("user_id"));
            bodyFormData.append("ecid",id);
            bodyFormData.append("pcity",city);
            bodyFormData.append("bdate",date);
            bodyFormData.append("ecname",data.cname);
        
            makePostRequest("/booking/car", bodyFormData).then((response) => {
                if (response.data.status === "1") {
                    toast.success('Booked Successfully', {
                        position:'top-center',
                        autoClose:3000,
                        onClose: () => history.push('/view/evcars')
                     });
                  
                }else{  
                    toast("Error warning"); 
                }
                
            }).catch((err) => {
                toast("There was an error!! warning");
            });
    }else{
      toast("Please Enter Correct OTP... try again")
    }
   
  }

  var UserInitials = {
    name:"",
    cardno:"",
    cvv:"",
    exdate:"",
};
  useEffect(()=>{
    ViewCarsbyid()
  },[])
     
  return (
    <div>
   <div>

        <div className="row m-0">
            <div className="col-lg-7 pb-5 pe-lg-5">
                <div className="row">
                  <h3>Plan Your Pick Up Location & Date</h3>
                    <div className="row m-0 bg-light">
                        <TextField
                          value={state}
                          onChange={handlechangestate}
                          select
                          placeholder='Select State'
                          label="Select State"
                        >
                          {(location_state.length>0)?location_state.map(c=>    
                          (<MenuItem value={c.state}>{c.state}</MenuItem> 
                          ))
                          :<p className="text-center">No data found</p>
                          }
                        </TextField>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <TextField
                          value={city}
                          onChange={handlechangecity}
                          select
                          placeholder='Select State'
                          label="Select City"
                        >
                          {
                          (location_city.length>0)
                          ?location_city.map(c=>    
                          (c.sid==state)?(<MenuItem value={c.city}>{c.city}</MenuItem> ):(<p className="text-center"></p>)
                          )
                          :<p className="text-center">No data found</p>
                          }
                        </TextField>
                        
                        
                        <TextField  type="date" inputProps={{min:ndate }}  className="myInput" value={date} onChange={(e) => (setdate(e.target.value))}/>
                        
                    </div>
                    <div className="col-12 p-5">
                        <img  className="imgcar" src={process.env.PUBLIC_URL + `/assets/${data.cimg}`} alt=""/>
                    </div>
                </div>
            </div>
            <div className="col-lg-5 p-0 ps-lg-4">
                <div className="row m-0">
                    <div className="col-12 px-4">
                        <div className="d-flex align-items-end mt-4 mb-2">
                            <p className="h4 m-0"><span className="pe-1">{data.cname}</span></p>
                        </div>
                        <div className="d-flex justify-content-between mb-2">
                            <p className="textmuted">Total Days</p>
                            <div className="addsub">
                        <RemoveCircleSharpIcon onClick={()=>sub()}/>&nbsp; <Box>{days}</Box>&nbsp;  <AddCircleSharpIcon onClick={()=>add()}/>
                    </div>
                            
                        </div>
                        <div className="d-flex justify-content-between mb-2">
                            <p className="textmuted">Total</p>
                            <p className="fs-14 fw-bold"><span className="fas fa-dollar-sign pe-1"></span>₹ {data.rate*days}</p>
                        </div>
                     
                        <div className="d-flex justify-content-between mb-3">
                            <p className="textmuted fw-bold">Booking Amount</p>
                            <div className="d-flex align-text-top ">
                                <span className="fas fa-dollar-sign mt-1 pe-1 fs-14 "></span><span className="h4">₹ {(data.rate*days)/2}</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 px-0">
                        <div className="row bg-light m-0">
                            <div className="col-12 px-4 my-4">
                                <p className="fw-bold">Payment detail</p>
                            </div>
                            <div className="col-12 px-4">
                            <Formik
   
   initialValues={UserInitials}
   validationSchema={Validation_Schema}
 
>
   {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit, }) => (
   <Form>
                                <div className="d-flex  mb-4">
                                    <span className="">
                                        <p className="text-muted">Card number</p>
                                        <input className="form-control" type="text" 
                                            value={values.cardno}
                                            onChange={handleChange("cardno")}
                                            onBlur={() => setFieldTouched("cardno")}
                                             placeholder="0000 0000 0000 0000"/>
                                              {errors.cardno && touched.cardno ? <div className="errmsg">{errors.cardno}</div> : null}
                                    </span>
                                    <div className=" w-100 d-flex flex-column align-items-end">
                                        <p className="text-muted">Expires</p>
                                        <input className="form-control2" type="text"   value={values.exdate}
      onChange={handleChange("exdate")}
      onBlur={() => setFieldTouched("exdate")}
      placeholder="01/23"/>
        {errors.exdate && touched.exdate ? <div className="errmsg">{errors.exdate}</div> : null}
                                    </div>
                                </div>
                                <div className="d-flex mb-5">
                                    <span className="me-5">
                                        <p className="text-muted">Cardholder name</p>
                                        <input className="form-control" type="text" 
                                             value={values.name}
                                             onChange={handleChange("name")}
                                             onBlur={() => setFieldTouched("name")}
                                             placeholder="Enter your full name"/>
                                              {errors.name && touched.name ? <div className="errmsg">{errors.name}</div> : null}
                                    </span>
                                    <div className="w-100 d-flex flex-column align-items-end">
                                        <p className="text-muted">Cvv</p>
                                        <input className="form-control3" type="text"  value={values.cvv}
                                            onChange={handleChange("cvv")}
                                            onBlur={() => setFieldTouched("cvv")} placeholder="CVV"/>
                                              {errors.cvv && touched.cvv ? <div className="errmsg">{errors.cvv}</div> : null}
                                    </div>
                                </div>
                                </Form>
    )}
</Formik>           {/*end  */}
                            </div>
                        </div>
                        <div className="row m-0">
                            {(otp>0)?<>
                              <div className="d-flex mb-5">
                                    <span className="me-5">
                                        <input placeholder="Enter OTP here"className="form-control" value={eotp}  onChange={(e) => (seteotp(e.target.value))} maxlength="4"/> 
                                    </span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <div className="w-100 d-flex flex-column align-items-end">
                                        <button  onClick={call}>Generate OTP</button>   
                                    </div>
                              </div>
                            <div className="col-12  mb-4 p-0">
                          
                            <button className="btn btn-primary" onClick={checkotp}>Verify</button>
                            </div></>:<></>}
                           { (otp>0)?<></>:<div className="col-12  mb-4 p-0">
                                
                                <button className="btn btn-primary" onClick={generateotp}>Pay ₹{(data.rate*days)/2}</button>
                            </div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    

<ToastContainer/>
</div>

  );
}
