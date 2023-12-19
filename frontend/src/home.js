import { Button,Container,Paper,Typography } from "@mui/material";
import { useHistory } from "react-router-dom";
import { useState,useEffect } from "react";
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ElectricCarIcon from '@mui/icons-material/ElectricCar';
function Home() {
    const history = useHistory();
       
    return (
        <div className="landingOut">
        <div className="logobox">
        <Typography variant="h4" noWrap component="div" className='whiteline'>
          EcoWheels <ElectricCarIcon/>
          </Typography>
        </div>
        <Container>
            <div className="landingPageRow">
              <div className="landingInner">
                <div className="innBoxlanding">
                    <span className="landingIcon"><SupervisorAccountIcon/></span>
                    <br/><br/><br/>
                    <h4>EV Station Login</h4>
                    <br/><br/>
                    <a className="btnl" onClick={() => history.push("/login/station")}>Proceed</a>
                </div>
              </div>
              <div className="landingInner">
                 <div className="innBoxlanding">
                    <span className="landingIcon"><AccountBoxIcon/></span>
                    <br/><br/><br/>
                    <h4>Admin Login</h4>
                    <br/><br/>
                    <a className="btnl" onClick={() => history.push("/admin/login")}>Proceed</a>
                 </div>
               </div>
               
               <div className="landingInner">
                 <div className="innBoxlanding">
                     <span className="landingIcon"><SupervisorAccountIcon/></span>
                     <br/><br/><br/>
                     <h4>User Login</h4>
                     <br/><br/>
                     <a className="btnl" onClick={() => history.push("/login/user")}>Proceed</a>
                 </div>
               </div>
               
            </div>
        </Container>
      </div>

    );
  }
  
  export default Home;
  