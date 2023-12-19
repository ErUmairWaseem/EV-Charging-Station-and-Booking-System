import { BrowserRouter as Router, Route,Switch } from "react-router-dom";
import "./App.css"
import Protected from './protected';
import Home from './home'
import Loginuser  from "./user/login"
import UserRegister  from "./user/adduser"
import LoginStation  from "./station/loginstation"
import StationRegister  from "./station/addstation"
import logout from "./logout";
import Dashboard_Station from "./station/stationprofile"
import DashboardUser from "./user/dashboard"
import Addlocation from "./station/addlocation";
import UpdateStation from "./station/updatestation"
import ViewSlotsBookings from "./station/manageBooking"
import UserProfile from "./user/userprofile";
import Plash from "./user/plash";
import Evcarsview from "./user/viewevcars";
import Payment from "./user/payment";
import EvCharge from "./user/evcharge";
import Wallet from "./user/wallet";
import AddMoney from "./user/addmoney";
import ViewBookingSlot from "./user/slotbooking";
import ViewcarBooking from "./user/viewcarbooking";
import ViewSlotBooking from "./user/viewslotbooking";
import Feedback from "./user/feedback";
import ViewFeedback from "./station/viewfeedback";
import AllSlotsBookings from "./admin/manageBooking";
import AllcarBooking from "./admin/manageCarbooking";
import ViewFeedbacks from "./admin/viewfeedback";
import Graph from "./admin/graph";
import AdminLogin from "./admin/login"
import AboutUs from "./about";
import ContactUs from "./contact";

function App() {
  return (
     <Router>
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/add/user" exact component={UserRegister}/>
          <Route path="/login/user" exact component={Loginuser}/> 
          <Route path="/login/station" exact component={LoginStation}/> 
          <Route path="/add/location" exact component={Addlocation}/> 
          <Route path="/add/station" exact component={StationRegister}/>
          <Route path="/admin/login" exact component={AdminLogin}/> 
          <Route path="/aboutus" exact component={AboutUs}/> 
          <Route path="/contactus" exact component={ContactUs}/> 
          
          <Route path="/logout" exact component={logout}/> 

          <Route path="/add/money/:mid"  >
            <Protected Cmp={AddMoney} />
          </Route>
          <Route path="/user/wallet" ><Protected  Cmp={Wallet}/></Route>
          <Route path="/user/profile" ><Protected Cmp={UserProfile}/></Route>
    
          <Route path="/update/station"  >< Protected Cmp={UpdateStation}/></Route>
         
          <Route path="/station/dashboard"><Protected  Cmp={Dashboard_Station}/></Route>  
          <Route path="/view/evcars"  ><Protected Cmp={Evcarsview}/></Route>
          <Route path="/view/evstations"><Protected  Cmp={EvCharge}/></Route> 
          <Route path="/payment/:id" ><Protected Cmp={Payment}/></Route> 
          <Route path="/user/dashboard"><Protected  Cmp={Plash}/></Route> 
          <Route path="/user/slot/booking"><Protected Cmp={ViewBookingSlot}/> </Route>  
          <Route path="/manage/slot/booking"><Protected Cmp={ViewSlotBooking}/></Route>  
          <Route path="/manage/slots/bookings"><Protected Cmp={ViewSlotsBookings}/> </Route>  
          <Route path="/user/car/booking" ><Protected  Cmp={ViewcarBooking}/></Route>
          <Route path="/user/feedback" ><Protected Cmp={Feedback}/> </Route> 
          <Route path="/view/feedback" ><Protected Cmp={ViewFeedback}/></Route> 
          <Route path="/all/feedback" ><Protected Cmp={ViewFeedbacks}/></Route> 
          <Route path="/all/slot/booking" ><Protected Cmp={AllSlotsBookings}/></Route> 
          <Route path="/all/car/booking"  ><Protected Cmp={AllcarBooking}/></Route>
          <Route path="/admin/dashboard"  ><Protected Cmp={Graph}/></Route> 
 
     
         
        </Switch>
     </Router>
  );
}

export default App;
