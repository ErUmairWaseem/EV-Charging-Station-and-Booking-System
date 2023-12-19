import { useState,useEffect } from "react";
import { useHistory } from "react-router-dom";
import { makePostRequest } from '../util/utils';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import swal from "sweetalert";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Validation_Schema = Yup.object().shape({
    
    email: Yup.string().required('Please Enter the email'),

    password: Yup.string().required('Please Enter the password')
   
});

export default function AdminLogin() {
    const history = useHistory();

    const[email,setemail]=useState('');
    const[password,setpassword]=useState('');



    function loginuser(){
        let bodyFormData = new FormData();
        bodyFormData.append("email",email);
        bodyFormData.append("password",password);
        makePostRequest("/login/admin", bodyFormData).then((response) => {
            if (response.data.status === "1") {
              localStorage.setItem("logintype","Admin")
            
              toast.success('Login Success Welcome to EcoWheels !', {
                position:'top-center',
                autoClose:3000,
                onClose: () => history.push('/admin/dashboard')
              });
            }
            else{  
              toast(response.data.message +" warning"); 
            }
                    
        }).catch((err) => {
          toast("There was an error!");
        });
    }

    var UserInitials = {
        email:"",
        password:"",
        
    };
    

    return (
<div>
<div className="container">
    <Formik
        enableReinitialize
        initialValues={UserInitials}
        validationSchema={Validation_Schema}
        onSubmit={loginuser}
    >
        {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit, }) => (
            <Form>	
    <center>
    <div class="formlogin">
       <p class="form-title">Sign in to your account</p>
        <div class="input-container">
          <input type="email" placeholder="Enter email"
          value={values.email}
          onChange={handleChange("email")}
          onBlur={() => setFieldTouched("email")}
          onChangeCapture={(e) => (setemail(e.target.value))}
          />
          {errors.email && touched.email ? <div className="errmsg">{errors.email}</div> : null}
          <span>
          </span>
      </div>
      <div class="input-container">
          <input type="password" placeholder="Enter password"
           value={values.password}
           onChange={handleChange("password")}
           onBlur={() => setFieldTouched("password")}
           onChangeCapture={(e) => (setpassword(e.target.value))}
           />
           {errors.password && touched.password ? <div className="errmsg">{errors.password}</div> : null} 
        </div>
         <button type="submit" class="submit">
        Sign in
      </button>

      
</div>
    </center>
   
    </Form>
      )}
    </Formik>
  </div>
  <ToastContainer/>
</div>

    );
  }
  
  
  