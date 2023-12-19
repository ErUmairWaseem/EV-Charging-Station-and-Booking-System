import { Button,Container,Paper } from "@mui/material";
import { useHistory } from "react-router-dom";
import { useState,useEffect } from "react";
import swal from "sweetalert";
import { makePostRequest } from '../util/utils';


function Forgot() {
    const history = useHistory();
    const [q,setq]=useState('');

    async function setpassword(){
        var bodyFormData=new FormData()
        bodyFormData.append("email",q);
        makePostRequest("/forgotpass", bodyFormData).then((response) => {
          if(response.data.status === "1") {
            localStorage.setItem("setemail2",q)
            swal("Success","Please check your mail box", "success")
            .then(function() {
             
              history.push("/")
          });
          }else{  
            swal("Error","Mail Failed", "warning"); 
          }
        
        }).catch((err) => {
          swal("There was an error!", "more error details", "warning");
        });
    }
    
    function setemail(e){
        setq(e.target.value)
    }
       
    return (
      <div>
        <Container>
        <div class="container padding-bottom-3x mb-2 mt-5">
	    <div class="row justify-content-center">
	        <div class="col-lg-8 col-md-10">
	            <div class="forgot">
	                <h2>Forgot your password?</h2>
	                <p>Change your password in three easy steps. This will help you to secure your password!</p>
	                <ol class="list-unstyled">
	                    <li><span class="text-primary text-medium">1. </span>Enter your email address below.</li>
	                    <li><span class="text-primary text-medium">2. </span>Our system will send you a temporary link</li>
	                    <li><span class="text-primary text-medium">3. </span>Use the link to reset your password</li>
	                </ol>
	            </div>
                <br></br>
	            <div class="forgot">
	                <div>
	                    <div > <label for="email-for-pass">Enter your email address</label> 
                        <input  type="text" id="email-for-pass" required="" onChange={setemail} />
                        <small class="form-text text-muted">Enter the email address you used during the 
                        registration on M-Cart.com. Then we'll email a link to this address.</small> <br/><br/></div>
	                </div>
	                <div> <button class="btn-success" onClick={setpassword}>Get New Password</button> &nbsp;&nbsp;&nbsp;&nbsp;
                    <button class="btn-danger"  onClick={() => history.push("/Login-user")}>Back to Login</button> </div>
	            </div>
	        </div>
	    </div>
	</div>
        </Container>
      </div>

    );
  }
  
  export default Forgot;
  