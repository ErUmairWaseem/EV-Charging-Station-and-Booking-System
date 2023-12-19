import React,{useEffect} from 'react';

import { useHistory,useLocation} from "react-router-dom";
import swal from 'sweetalert';
import {Grid,TextField} from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ElectricCarIcon from '@mui/icons-material/ElectricCar';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';


const Validation_Schema = Yup.object().shape({
    firstName: Yup.string()
    .required('Required'),
    lastName: Yup.string()
    .required('Required'),
    message:Yup.string().required('Required'),
    mobile:Yup.string()
    .matches(/^\d+$/, 'The field should have digits only')
    .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
   
});




export default function ContactUs() {
    const history = useHistory();
        const { pathname } = useLocation();
        const [loading, setloading] = React.useState(false);
        const [firstName, setfirstName] = React.useState('');
        const [lastName, setlastName] = React.useState('');
        const [message, setmessage] = React.useState('');
        const [mobile, setmobile] = React.useState('');
        const [email, setemail] = React.useState('');


  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  function sendEmail(e) {
    console.log(JSON.stringify(e))
    swal("Good job!", "Mail send successfully!", "success");
    setTimeout(() => {
      window.location.reload()  
    }, 3000);  
  }

  return (
    <>
<AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h5" noWrap component="div" className='whiteline'>
          EcoWheels <ElectricCarIcon/>
          </Typography>
          <div className='abtcon'>
          <span onClick={()=>history.goBack()}>Home</span> &nbsp;&nbsp; <span onClick={()=>history.push("/aboutus")}>About us</span> &nbsp;&nbsp; <span onClick={()=>history.push("/contactus")} >Contact us</span>
          </div>
        </Toolbar>
      </AppBar>
    <div className="contact">
    <div className="containercon">
  <div >
    <h2>Contact Us</h2>
  </div>
        <Formik
          enableReinitialize
          initialValues={{
            firstName: '',
            lastName:'',
            email:'',
            mobile:'',
            message:'',
           
          }}
          validationSchema={Validation_Schema}
          onSubmit={sendEmail}
        >
          {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit, }) => (
  <Form>
    <Grid container spacing={1} >
      <Grid item xs={12} md={6} lg={6} sm={6}>
         
              <TextField type="text" name="firstName" placeholder="Your name.."
              value={values.firstName}
              onChange={handleChange("firstName")}
              onBlur={() => setFieldTouched("firstName")}
              onChangeCapture={(e) => (setfirstName(e.target.value))}
              />
          {errors.firstName && touched.firstName ? <div className="errmsg">{errors.firstName}</div> : null}
          </Grid>
          <Grid item xs={12} md={6} lg={6} sm={6}>
     
              <TextField type="text" id="lname" name="lastName" placeholder="Your last name.."
              value={values.lastName}
              onChange={handleChange("lastName")}
              onBlur={() => setFieldTouched("lastName")}
              onChangeCapture={(e) => (setlastName(e.target.value))}
              />
              {errors.lastName && touched.lastName ? <div className="errmsg">{errors.lastName}</div> : null}
            </Grid>
            <Grid item xs={12} md={6} lg={6} sm={6}>
        
              <TextField type="text" name="email" placeholder="Enter Your Email.."
              value={values.email}
              onChange={handleChange("email")}
              onBlur={() => setFieldTouched("email")}
              onChangeCapture={(e) => (setemail(e.target.value))}
              />
              {errors.email && touched.email ? <div className="errmsg">{errors.email}</div> : null}
        </Grid>
        <Grid item xs={12} md={6} lg={6} sm={6}>
          
              <TextField type="text"  name="mobile" placeholder="Contact number.."
              value={values.mobile}
              onChange={handleChange("mobile")}
              onBlur={() => setFieldTouched("mobile")}
              onChangeCapture={(e) => (setmobile(e.target.value))}
              />
              {errors.mobile && touched.mobile ? <div className="errmsg">{errors.mobile}</div> : null}
            </Grid>
            <Grid item xs={12} md={6} lg={6} sm={6}>  
              
              <TextField name="message" placeholder="Write something.." 
              value={values.message}
              onChange={handleChange("message")}
              onBlur={() => setFieldTouched("message")}
              onChangeCapture={(e) => (setmessage(e.target.value))}
              ></TextField>
              {errors.message && touched.message ? <div className="errmsg">{errors.message}</div> : null}
        </Grid>
        </Grid>
  <button type="button" className="btnsend" disabled={!isValid} onClick={(e) => handleSubmit(e)}>
    Send
  </button>

  </Form>
    )}
  </Formik>
</div>
</div>


    {/*  {loading ? (
            <div classNameName="loaderOut">
            <Loader type="Puff"
            color="#00BFFF"
            height={70}
            width={70}
             />
          </div>) : null}
       
    */}
    </>
  );
}