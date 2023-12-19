import React,{useEffect} from 'react'
import { useHistory } from "react-router-dom";

function Protected(props) {
    const history = useHistory();
    let Cmp =props.Cmp;
    useEffect(() =>
   {
      if(!localStorage.getItem('logintype'))
      {
        history.push('/');
      }
   }, []);

    return (
        <div>
            <Cmp/>
        </div>
    )
}


export default Protected