import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { makePostRequest } from '../util/utils';
import swal from "sweetalert";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




const Validation_Schema = Yup.object().shape({
    fname: Yup.string().required('Required'),
    lname: Yup.string().required('Required'),
    vehicle: Yup.string().required('Required'),
    mobile: Yup.string().required('Required')
    .matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/, 'Phone number is not valid')
    .max(10, 'phone no must be greater than or equal to 10 digits')
    .min(10, 'phone no must be contain 10 digits'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Please Enter your password').matches(
         /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"),
    cpassword: Yup.string().required('Please confirm the password')
    .oneOf([Yup.ref('password'), null], 'Passwords must match')    

});

	

function Register() {
    const history = useHistory();
    const[fname,setfname]=useState('');
    const[lname,setlname]=useState('');
    const[email,setemail]=useState('');
    const[mobile,setmobile]=useState('');
    const[password,setpassword]=useState('');
    const[cpassword,setcpassword]=useState('');
    const[vehicle,setvehicle]=useState('');
    

    
  

    function adduser(){
    
            let bodyFormData = new FormData();
            bodyFormData.append("ufname",fname);
            bodyFormData.append("ulname",lname);
            bodyFormData.append("email",email);
            bodyFormData.append("password",password);
            bodyFormData.append("contact",mobile);
            bodyFormData.append("vehicle",vehicle);
          
            
            makePostRequest("/add/user", bodyFormData).then((response) => {
                if (response.data.status === "1") {
                    toast.success('Sign Up Completed', {
                        position:'top-center',
                        autoClose:3000,
                        onClose: () => history.push('/login/user')
                     });
                  
                }else{  
                    toast("Error",response.data.message, "warning"); 
                }
                
            }).catch((err) => {
                toast("There was an error!", "more error details", "warning");
            });
        }    
    

    var UserInitials = {
        fname:"",
        lname:"",
        email:"",
        mobile:"",
        password:"",
        cpassword:"",
        vehicle:"",
    };
    

    
    return (
       
<center>

<Formik
    enableReinitialize
    initialValues={UserInitials}
    validationSchema={Validation_Schema}
    onSubmit={adduser}
>
    {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit, }) => (
    <Form>
<div className="form">
    <p className="title">Register </p>
    
        <div className="flex">
        <label>
        <input placeholder="Firstname" type="text" className="input" 
         value={values.fname}
         onChange={handleChange("fname")}
         onBlur={() => setFieldTouched("fname")}
         onChangeCapture={(e) => (setfname(e.target.value))}
         />
          {errors.fname && touched.fname ? <div className="errmsg">{errors.fname}</div> : null}  
        </label>
        <label>
            <input  placeholder="Lastname" type="text" className="input"
            value={values.lname}
            onChange={handleChange("lname")}
            onBlur={() => setFieldTouched("lname")}
            onChangeCapture={(e) => (setlname(e.target.value))}
            />
            {errors.lname && touched.lname ? <div className="errmsg">{errors.lname}</div> : null}
        </label>
        </div>  
            
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
        <input  placeholder="contact"  className="input"
        value={values.mobile}
        onChange={handleChange("mobile")}
        onBlur={() => setFieldTouched("mobile")}
        onChangeCapture={(e) => (setmobile(e.target.value))}
        />
        {errors.mobile && touched.mobile ? <div className="errmsg">{errors.mobile}</div> : null}
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
   
    <label>
        <input placeholder="EV vehicle Name"  className="input"
         value={values.vehicle}
         onChange={handleChange("vehicle")}
         onBlur={() => setFieldTouched("vehicle")}
         onChangeCapture={(e) => (setvehicle(e.target.value))}
         />
         {errors.vehicle && touched.vehicle ? <div className="errmsg">{errors.vehicle}</div> : null}  
    </label>
    <button className="submit" disabled={!isValid} onClick={(e) => handleSubmit(e)}>Submit</button>

  
    <p className="signin">Already have an acount ? <a onClick={()=>history.push("/login/user")}>Signin</a> </p>
    </div>
    </Form>
    )}
</Formik>
<ToastContainer />
</center>

);
  }
  
  export default Register;
  