import React, { useState ,useEffect} from 'react';
import { useHistory } from "react-router-dom";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {makeGetRequest, makePostRequest } from '../util/utils';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {MenuItem, TextField} from '@mui/material';
import Dashboard  from './dashboard';



const Validation_Schema = Yup.object().shape({
    csname: Yup.string().required('Required'),
    capacity: Yup.string().required('Required'),
    area: Yup.string().required('Required'),
    location: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),


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

	

function UpdateStation() {
    const history = useHistory();
    const[csname,setcsname]=useState('');
    const[capacity,setcapacity]=useState('');
    const[email,setemail]=useState('');
    const[area,setarea]=useState('');
    const[data,setdata]=useState([])
    const[location,setlocation]=useState()
    

    // const handlechangestate = (e) => {
    //     setstate(e.target.value)
     
    //   }

    //   const handlechangecity = (e) => {
    //     setcity(e.target.value)
    //   }
  

    function addEV(){
            let bodyFormData = new FormData();
            bodyFormData.append("cs_name",csname);
       
            bodyFormData.append("username",email);
            bodyFormData.append("cs_area",area);
            bodyFormData.append("location",location);
            bodyFormData.append("capacity",capacity);
          
            
            makePostRequest("/update/station/"+localStorage.getItem("user_id"), bodyFormData).then((response) => {
                if (response.data.status === "1") {
                    toast.success('EV Station Updated Successfully', {
                        position:'top-center',
                        autoClose:3000,
                        onClose: () => history.push('/station/dashboard')
                     });
                  
                }else{  
                    toast("Error",response.data.message, "warning"); 
                }
                
            }).catch((err) => {
                toast("There was an error!", "more error details", "warning");
            });
        }   
        
        
        
        function ViewProfile(){
          let bodyFormData = new FormData();
          makeGetRequest("/view/station/byid/"+localStorage.getItem("user_id"), bodyFormData).then((response) => {
              if (response.data.status === "1") {
               setdata(response.data.data[0])
               setlocation(response.data.data[0].location)
               setcsname(response.data.data[0].cs_name)
               setcapacity(response.data.data[0].capacity)
               setemail(response.data.data[0].username)
               setarea(response.data.data[0].cs_area)
              }else{  
                toast(response.data.message +" warning"); 
              }
                      
          }).catch((err) => {
            toast("There was an error!");
          });
      }
    
      useEffect(()=>{
        ViewProfile()
      },[])
    

    var UserInitials = {
        csname:csname,
        capacity:capacity,
        email:email,
        area:area,
        location:location
    };
    

    
    return (
<div>
<Dashboard/>    
<center  className='dashboarddata'>

<Formik
    enableReinitialize
    initialValues={UserInitials}
    validationSchema={Validation_Schema}
    onSubmit={addEV}
>
    {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit, }) => (
    <Form>
<div className="form">
    <h4>Update EV Station </h4>
    <label>
        <input  placeholder="EV Station Name"  className="input"
        value={values.csname}
        onChange={handleChange("csname")}
        onBlur={() => setFieldTouched("csname")}
        onChangeCapture={(e) => (setcsname(e.target.value))}
        />
        {errors.csname && touched.csname ? <div className="errmsg">{errors.csname}</div> : null}
    </label>  
    <label>
        <input  placeholder="EV Capacity"  className="input"
        value={values.capacity}
        onChange={handleChange("capacity")}
        onBlur={() => setFieldTouched("capacity")}
        onChangeCapture={(e) => (setcapacity(e.target.value))}
        />
        {errors.capacity && touched.capacity ? <div className="errmsg">{errors.capacity}</div> : null}
    </label>  
    <label>
        <input  placeholder="Email"  className="input"
          value={values.email}
          onChange={handleChange("email")}
          onBlur={() => setFieldTouched("email")}
          onChangeCapture={(e) => (setemail(e.target.value))}
          />
          {errors.email && touched.email ? <div className="errmsg">{errors.email}</div> : null}
        
    </label>     
     
    <label>
        <input placeholder="EV Station Area"  className="input"
         value={values.area}
         onChange={handleChange("area")}
         onBlur={() => setFieldTouched("area")}
         onChangeCapture={(e) => (setarea(e.target.value))}
         />
         {errors.area && touched.area ? <div className="errmsg">{errors.area}</div> : null}  
    </label>
    <label>
        <input placeholder="EV Station Location"  className="input"
         value={values.location}
         onChange={handleChange("location")}
         onBlur={() => setFieldTouched("location")}
         onChangeCapture={(e) => (setlocation(e.target.value))}
         />
         {errors.location && touched.location ? <div className="errmsg">{errors.location}</div> : null}  
    </label>
    <button className="submit" disabled={!isValid} onClick={(e) => handleSubmit(e)}>Update Station</button>

   </div>
    </Form>
    )}
</Formik>
<ToastContainer />
</center>

</div>       

);
  }
  
  export default UpdateStation;
  