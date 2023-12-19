import React, {useEffect,useState} from 'react';
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import Dashboard  from './dashboard';
import { toast } from 'react-toastify';
import { makePostRequest,makeGetRequest } from '../util/utils';
export default function ViewBookingSlot() {
    const[data,setdata]=useState([]);

    async function viewbooking(){
        let bodyFormData = new FormData();
        makeGetRequest(`/view/slot/booking/${localStorage.getItem("user_id")}`, bodyFormData).then((response) => {
            if(response.data.status === "1") {
                setdata(response.data.data)
            }else{
                setdata([])
            }    
        }).catch((err) => {
          toast("There was an error! warning");
        });
      }
    const data1 = data.map((item) => {
        return {
          title: item.slot+" =>"+item.evname,
          date: item.date,
        };
      });

      
  useEffect(()=>{
    viewbooking()
  },[])


return(
    <div>
 <Dashboard/>
    <div className='dashboarddata'>
    <div className='calender cal_page'>
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
    </div>   
)

}