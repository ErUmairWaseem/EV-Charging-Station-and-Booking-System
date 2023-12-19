import { useHistory } from "react-router-dom";
import { useState,useEffect } from "react";
import Dashboard from "./user/dashboard";
import { makeGetRequest,makePostRequest} from './util/utils';
import swal from "sweetalert";
import { useDispatch } from "react-redux";
import { addcart } from './features/cart'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import moment from 'moment/moment.js'

function WishList() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [data,setdata]=useState([])
    
    async function viewallProduct(){
        let bodyFormData = new FormData();
        makeGetRequest(`/viewallwishlist?uid=${localStorage.getItem("user_id")}`, bodyFormData).then((response) => {
            if(response.data.status === "1") {
                setdata(response.data.data)
            }else{
                setdata([])
            }    
        }).catch((err) => {
          swal("There was an error!", "more error details", "warning");
        });
      }

    
  const data1 = data.map((item) => {
    return {
      title: item.event,
      date: item.odate,

    };
  });

      useEffect(()=>{
        viewallProduct()
      },[])
    return (
<div>
 <Dashboard/>

<section className="product" >
  <h2 className="text-center">My Calender</h2>
  <div className="container py-5">
    <div className='calender'>
        <FullCalendar 
            plugins={[dayGridPlugin]}
            interactionPlugin
            initialView="dayGridMonth"
            weekends={true}
            showNonCurrentDates={false} 
            firstDay={false}
            events={data1}
           
        />
    </div>
  </div>
</section>
</div>

    );
  }
  
  export default WishList;
  