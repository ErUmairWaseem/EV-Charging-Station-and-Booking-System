import { Button,Container,Paper } from "@mui/material";
import { useHistory } from "react-router-dom";
import {useEffect} from 'react'

function Logout() {
    const history = useHistory();
        function logout() {
            localStorage.clear();
            history.push("/")
        }
        useEffect(()=>{
            logout()
        })
    return (
       <div >
           
       </div>

    );
  }
  
  export default Logout;
  