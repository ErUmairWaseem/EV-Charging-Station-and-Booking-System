import { useState,useEffect } from "react";
import { useHistory } from "react-router-dom";
import { makePostRequest } from '../util/utils';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import swal from "sweetalert";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Validation_Schema = Yup.object().shape({
    
    email: Yup.string().email('Invalid email').required('Please Enter the email'),

    password: Yup.string().required('Please Enter the password')
   
});

function Home() {
    const history = useHistory();

    const[email,setemail]=useState('');
    const[password,setpassword]=useState('');



    function loginuser(){
        let bodyFormData = new FormData();
        bodyFormData.append("email",email);
        bodyFormData.append("password",password);
        makePostRequest("/login/station", bodyFormData).then((response) => {
            if (response.data.status === "1") {
              localStorage.setItem("logintype","station")
              localStorage.setItem("user_id",response.data.data[0].cs_id)
              localStorage.setItem("uname",response.data.data[0].cs_name)
              localStorage.setItem("uemail",response.data.data[0].username)
              localStorage.setItem("location",response.data.data[0].location)
              if(localStorage.getItem("location")==0){
                history.push('/add/location')
              }else{
              toast.success('Login Success Welcome to EcoWheels !', {
                position:'top-center',
                autoClose:3000,
                onClose: () => history.push('/station/dashboard')
             });
            }
            }else{  
              toast(response.data.message +" warning"); 
            }
                    
        }).catch((err) => {
          toast("There was an error!");
        });
    }

    // useEffect(()=>{
    //     if(islogin>0){
    //        history.push("/") 
    //     }else{
    //      handleClickOpen()
    //     }
    // })

    var UserInitials = {
        email:"",
        password:"",
        
    };
    

    return (
<div>
  {/* <a href="https://goo.gl/maps/K2YURWFPnWgogvk77">open</a> */}
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

      <p class="signup-link">
        No account?
        <a onClick={()=>history.push("/add/station")}>Sign up</a>
      </p>
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
  
  export default Home;
  