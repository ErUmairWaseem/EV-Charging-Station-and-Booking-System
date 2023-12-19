import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { makePostRequest } from '../util/utils';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {MenuItem, TextField} from '@mui/material';




const Validation_Schema = Yup.object().shape({
    csname: Yup.string().required('Required'),
    capacity: Yup.string().required('Required'),
    area: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Please Enter your password').matches(
         /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"),
    cpassword: Yup.string().required('Please confirm the password')
    .oneOf([Yup.ref('password'), null], 'Passwords must match')    

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

	

function Register() {
    const history = useHistory();
    const[csname,setcsname]=useState('');
    const[capacity,setcapacity]=useState('');
    const[email,setemail]=useState('');
    const[area,setarea]=useState('');
    const[password,setpassword]=useState('');
    const[cpassword,setcpassword]=useState('');
    const[city,setcity]=useState('');
    const[state,setstate]=useState('');
    const[stateid,setstateid]=useState('');
    

    const handlechangestate = (e) => {
        setstate(e.target.value)
     
      }

      const handlechangecity = (e) => {
        setcity(e.target.value)
      }
  

    function addEV(){
            let bodyFormData = new FormData();
            bodyFormData.append("cs_name",csname);
            bodyFormData.append("cs_city",city);
            bodyFormData.append("username",email);
            bodyFormData.append("password",password);
            bodyFormData.append("cs_state",state);
            bodyFormData.append("cs_area",area);
            bodyFormData.append("capacity",capacity);
          
            
            makePostRequest("/add/station", bodyFormData).then((response) => {
                if (response.data.status === "1") {
                    toast.success('EV Station Added Successfully', {
                        position:'top-center',
                        autoClose:3000,
                        onClose: () => history.push('/login/station')
                     });
                  
                }else{  
                    toast("Error",response.data.message, "warning"); 
                }
                
            }).catch((err) => {
                toast("There was an error!", "more error details", "warning");
            });
        }    
    

    var UserInitials = {
        csname:"",
        capacity:"",
        email:"",
        password:"",
        cpassword:"",
        city:"",
        state:"",
        area:"",
    };
    

    
    return (
       
<center>

<Formik
    enableReinitialize
    initialValues={UserInitials}
    validationSchema={Validation_Schema}
    onSubmit={addEV}
>
    {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit, }) => (
    <Form>
<div className="form">
    <p className="title">Register </p>
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
        <input  placeholder="password" type="password" className="input"
         value={values.password}
         onChange={handleChange("password")}
         onBlur={() => setFieldTouched("password")}
         onChangeCapture={(e) => (setpassword(e.target.value))}
         />
         {errors.password && touched.password ? <div className="errmsg">{errors.password}</div> : null} 
    </label>
    <label>
        <input placeholder="Confirm password" type="password" className="input"
         value={values.cpassword}
         onChange={handleChange("cpassword")}
         onBlur={() => setFieldTouched("cpassword")}
         onChangeCapture={(e) => (setcpassword(e.target.value))}
         />
         {errors.cpassword && touched.cpassword ? <div className="errmsg">{errors.cpassword}</div> : null}   
    </label>
    
    <div className="flex1">
    <label>
                <TextField
                    value={state}
                    onChange={handlechangestate}
                    select
                    placeholder='Select State'
                    label="Select State"
                    fullWidth
                    // className="input"
                >
                {(location_state.length>0)?location_state.map(c=>    
                (<MenuItem value={c.state}>{c.state}</MenuItem> 
                ))
                :<p className="text-center">No data found</p>
                }
            </TextField>
        </label>
        <label>
        <TextField
                    value={city}
                    onChange={handlechangecity}
                    select
                    placeholder='Select State'
                    label="Select City"
                    // className="input"
                    fullWidth
                  
                >
                {
                (location_city.length>0)
                ?location_city.map(c=>    
                (c.sid==state)?(<MenuItem value={c.city}>{c.city}</MenuItem> ):(<p className="text-center"></p>)
                )
                :<p className="text-center">No data found</p>
                }
            </TextField>
        </label>
        
        </div>  
   
    <label>
        <input placeholder="EV Station Area"  className="input"
         value={values.area}
         onChange={handleChange("area")}
         onBlur={() => setFieldTouched("area")}
         onChangeCapture={(e) => (setarea(e.target.value))}
         />
         {errors.area && touched.area ? <div className="errmsg">{errors.area}</div> : null}  
    </label>
    <button className="submit" disabled={!isValid} onClick={(e) => handleSubmit(e)}>Add Station</button>

  
    <p className="signin">Already have an acount ? <a onClick={()=>history.push("/login/station")}>Signin</a> </p>
    </div>
    </Form>
    )}
</Formik>
<ToastContainer />
</center>

);
  }
  
  export default Register;
  