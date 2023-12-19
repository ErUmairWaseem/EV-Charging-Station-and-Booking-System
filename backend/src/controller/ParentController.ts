import { injectable, inject } from "inversify";
import { Request, Response, Router } from "express";
import { CommonUtils } from '../util/commonUtils';
import Identifiers from "../config/identifiers";
import { ErrorResponse } from "../dto/errorResponse";
import { IParentService } from "src/service/iparentService";
import { EncryptionUtil } from "../util/encryptionUtil";


@injectable()
export class ParentController {
  public router: Router;

  @inject(Identifiers.IParentService)
  private ParentService: IParentService;

  constructor() 
  {
    this.router = Router();
  
    this.router.post("/booking/car", this.bookingcar);
    this.router.post("/booking/station", this.bookingStation);
    this.router.post("/add/station", this.addstation);
    this.router.post("/add/feedback", this.addfeedback);
    this.router.get("/view/feedback/:id", this.viewfeedback);
    this.router.get("/view/feedbacks", this.viewfeedbacks);
    this.router.post("/update/station/:id", this.update_station);
    this.router.post("/add/user", this.adduser);
    this.router.post("/login/user", this.login_user);
    this.router.post("/login/admin", this.login_admin);
    this.router.get("/view/user/byid/:id", this.view_userbyid);
    this.router.get("/view/evcars", this.view_evcars);
    this.router.get("/view/evstation", this.view_evstations);
    this.router.get("/view/evstations", this.filter_evstations);
    this.router.get("/view/evcars/byid/:id", this.view_evcarsbyid);
    this.router.post("/login/station", this.login_station);
    this.router.get("/view/station/byid/:id", this.view_stationbyid);
    this.router.get("/view/transaction/byid/:id", this.view_transactionbyid);
    this.router.post("/update/location", this.update_location);
    this.router.post("/add/money", this.addmoney);
    this.router.post("/transaction", this.transaction);
    this.router.post("/transaction1", this.transaction1);
    this.router.get("/view/slot/booking/:id", this.viewSlotBooking);
    this.router.get("/view/car/booking", this.viewcarBooking);
    this.router.get("/manage/slot/booking", this.manageslotBooking);
    this.router.get("/manages/slots/bookings", this.manageslotsBookings);
    this.router.get("/all/slots/bookings", this.allslotsBookings);
    this.router.get("/all/cars/bookings", this.allcarsBookings);
    this.router.get("/all/months/count", this.MonthCount);
    this.router.post("/delete/booking/:id", this.deleteBooking);
    this.router.post("/update/booking/:id", this.updateSlot);
    this.router.post("/update/status/:id", this.updateStatus1);
    this.router.post("/update/isactive", this.updateisactive);

    this.router.get("/all/slots/bookings", this.allslotsBookings);
    this.router.get("/search/slots/bookings", this.searchslotsBookings);
  }


  //Api 

  public searchslotsBookings = async (req: Request, res: Response) => {
     
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With"
    );
    res.header(
      "Access-Control-Allow-Methods",
      "POST, GET, PUT, DELETE, OPTIONS"
    );
    //let id = req.params.id;
    let field = ' *';
   let q=req.query.q
    let where = ` where evname  LIKE'%${q}%' `;

    let result1 = await this.ParentService.findcount(
      " count(*) AS search_count ",
       " evbooking",
       where
     );
     if (result1.rowCount > 0) {
       var count =result1.rows[0].search_count;
       console.log("Count"+result1.rows[0].search_count)
     // res.json({ status: "1", data: count });
     }

   const page=req.query.pages;
   const per_page=req.query.perpage;
   const total= count;
  
   const cal = total/per_page;
   const total_result=Math.ceil(cal);
   const startindex=(page-1)*per_page; 
   
   try{   
   let result = await this.ParentService.findfieldpagi(
    field,
    " evbooking",
    where,
    per_page,
    startindex
  );
 
  if (result.rowCount > 0) {
    var top = result.rows;
    var perpagecnt=result.rowCount;
    console.log("Data",result.rowCount)
   res.json({ status: "1",page:page,per_page:per_page,scount:count ,total:total,perpagecnt:perpagecnt,total_pages:total_result, data:top });
  } else {
    res.json({ status: "0", message: "No data found" });
  }
      
    } catch (error) {
      res.statusCode = 500;
      res.send(new ErrorResponse(error.name));
    }
  };
  public MonthCount = async (req: Request, res: Response) => {
     
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With"
    );
    res.header(
      "Access-Control-Allow-Methods",
      "POST, GET, PUT, DELETE, OPTIONS"
    );
    //let id = req.params.id;
    let jul = " where date between '2023-07-01'" + "AND" + "'2023-07-30' ";
    let aug = " where date between '2023-08-01'" + "AND" + "'2023-08-30' ";
    let sept = " where date between '2023-09-01'" + "AND" + "'2023-09-30' ";
    let oct = " where date between '2023-10-01'" + "AND" + "'2023-10-30' ";
    let nov = " where date between '2023-11-01'" + "AND" + "'2023-11-30' ";
    let dec = " where date between '2023-12-01'" + "AND" + "'2023-12-30' ";
    try {
    let result1 = await this.ParentService.findcount(" count(*) AS scount1 "," evbooking",jul);
    let result2 = await this.ParentService.findcount(" count(*) AS scount2 "," evbooking",aug);
    let result3 = await this.ParentService.findcount(" count(*) AS scount3 "," evbooking",sept);
    let result4 = await this.ParentService.findcount(" count(*) AS scount4 "," evbooking",oct);
    let result5 = await this.ParentService.findcount(" count(*) AS scount5 "," evbooking",nov);
    let result6 = await this.ParentService.findcount(" count(*) AS scount6 "," evbooking",dec);
    if (result2.rowCount > 0) {
     
      res.json({ status: "1", jul: result1.rows, aug:  result2.rows, sept:  result3.rows, oct:  result4.rows, nov:  result5.rows, dec:  result6.rows });
    } else {
      res.json({ status: "0", message: "No data found" });
    }
    
  } catch (error) {
    res.statusCode = 500;
    res.send(new ErrorResponse(error.name));
  }
   
  
 
  
      
   
  };


  public updateisactive= async (req: Request, res: Response) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With"
    );
    res.header(
      "Access-Control-Allow-Methods",
      "POST, GET, PUT, DELETE, OPTIONS"
    );

    let active = req.body.active;
    let id = req.body.id;
   console.log("status"+active)
    let set =`is_active='${active}'`;

    let where = ` cs_id='${id}'`

    console.log("set: " + set);

    try {
      let id = await this.ParentService.Update_data(
        " charge_station",
        set,
        where
      );
      
      if (id && id.rowCount > 0) {
        res
          .status(200)
          .json({ status: "1", message: " Updated Successfully" });
      } else {
        res.status(200).json({ status: "0", message: "Record Update Failed" });
      }
    } catch (error) {
      res.statusCode = 500;
      res.send(new ErrorResponse(error.name));
    }
  };
  public addfeedback = async (req: Request, res: Response) => {
     
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With"
    );
    res.header(
      "Access-Control-Allow-Methods",
      "POST, GET, PUT, DELETE, OPTIONS"
    );
    let fulldate = CommonUtils.postgressDateFormat();
    const col="uid,evid,evname,uname,msg,date";
    const val= `'${req.body.uid}','${req.body.evid}','${req.body.evname}','${req.body.uname}','${req.body.msg}','${fulldate}'`;
      
    try {
      let result = await this.ParentService.Insert_data(
        " feedback",
        col,
        val,
        ' fid'
        );
      
      if (result.rowCount > 0) {
        var top = result.rows;
        res.json({ status: "1", data: top });
      } else {
        res.json({ status: "0", message: "No data found" });
      }
      
    } catch (error) {
      res.statusCode = 500;
      res.send(new ErrorResponse(error.name));
    }
  };
  public updateStatus1= async (req: Request, res: Response) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With"
    );
    res.header(
      "Access-Control-Allow-Methods",
      "POST, GET, PUT, DELETE, OPTIONS"
    );

    let status = req.body.status;
    let iid = req.params.id;

    let set =`status='${status}'`;

    let where = ` evb_id='${iid}'`

    console.log("set: " + set);

    try {
      let id = await this.ParentService.Update_data(
        " evbooking",
        set,
        where
      );
      console.log(id);
      if (id && id.rowCount > 0) {
        res
          .status(200)
          .json({ status: "1", message: " Updated Successfully" });
      } else {
        res.status(200).json({ status: "0", message: "Record Update Failed" });
      }
    } catch (error) {
      res.statusCode = 500;
      res.send(new ErrorResponse(error.name));
    }
  };
  public updateSlot= async (req: Request, res: Response) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With"
    );
    res.header(
      "Access-Control-Allow-Methods",
      "POST, GET, PUT, DELETE, OPTIONS"
    );

    let date = req.body.date;
    let time = req.body.time;

    let iid = req.params.id;

    let set =`date='${date}' , slot='${time}'`;

    let where = ` evb_id='${iid}'`

    console.log("set: " + set);

    try {
      let id = await this.ParentService.Update_data(
        " evbooking",
        set,
        where
      );
      console.log(id);
      if (id && id.rowCount > 0) {
        res
          .status(200)
          .json({ status: "1", message: " Updated Successfully" });
      } else {
        res.status(200).json({ status: "0", message: "Record Update Failed" });
      }
    } catch (error) {
      res.statusCode = 500;
      res.send(new ErrorResponse(error.name));
    }
  };
  public deleteBooking = async (req: Request, res: Response) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With"
    );
    res.header(
      "Access-Control-Allow-Methods",
      "POST, GET, PUT, DELETE, OPTIONS"
    );

    let id = req.params.id;


    let where = ` evb_id= ${id}`;

    try {
      let id = await this.ParentService.delete_data(
        " evbooking",
         where
      );
      console.log(id);
      if (id && id.rowCount > 0) {
        res
          .status(200)
          .json({ status: "1", message: "Record Updated Successfully" });
      } else {
        res.status(200).json({ status: "0", message: "Record Update Failed" });
      }
    } catch (error) {
      res.statusCode = 500;
      res.send(new ErrorResponse(error.name));
    }
  };
  public viewcarBooking = async (req: Request, res: Response) => {
     
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With"
    );
    res.header(
      "Access-Control-Allow-Methods",
      "POST, GET, PUT, DELETE, OPTIONS"
    );
    //let id = req.params.id;
    let field = ' *';
    let id=req.query.id
    let where = `  where uid=${id}`;

    let result1 = await this.ParentService.findcount(
      " count(*) AS search_count ",
       " rentbooking ",
       where
     );
     if (result1.rowCount > 0) {
       var count =result1.rows[0].search_count;
       console.log("Count"+result1.rows[0].search_count)
     // res.json({ status: "1", data: count });
     }

   const page=req.query.page;
   const per_page=req.query.perpage;
   const total= count;
  
   const cal = total/per_page;
   const total_result=Math.ceil(cal);
   const startindex=(page-1)*per_page; 
   
   try{   
   let result = await this.ParentService.findfieldpagi(
    field,
    "rentbooking ",
    where,
    per_page,
    startindex
  );
 
  if (result.rowCount > 0) {
    var top = result.rows;
    var perpagecnt=result.rowCount;
    console.log("Data",result.rowCount)
   res.json({ status: "1",page:page,per_page:per_page,scount:count ,total:total,perpagecnt:perpagecnt,total_pages:total_result, data:top });
  } else {
    res.json({ status: "0", message: "No data found" });
  }
      
    } catch (error) {
      res.statusCode = 500;
      res.send(new ErrorResponse(error.name));
    }
  };
  public manageslotBooking = async (req: Request, res: Response) => {
     
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With"
    );
    res.header(
      "Access-Control-Allow-Methods",
      "POST, GET, PUT, DELETE, OPTIONS"
    );
    //let id = req.params.id;
    let field = ' *';
    let id=req.query.id
    let where = `  where uid=${id}`;

    let result1 = await this.ParentService.findcount(
      " count(*) AS search_count ",
       " evbooking ",
       where
     );
     if (result1.rowCount > 0) {
       var count =result1.rows[0].search_count;
       console.log("Count"+result1.rows[0].search_count)
     // res.json({ status: "1", data: count });
     }

   const page=req.query.page;
   const per_page=req.query.perpage;
   const total= count;
  
   const cal = total/per_page;
   const total_result=Math.ceil(cal);
   const startindex=(page-1)*per_page; 
   
   try{   
   let result = await this.ParentService.findfieldpagi(
    field,
    " evbooking",
    where,
    per_page,
    startindex
  );
 
  if (result.rowCount > 0) {
    var top = result.rows;
    var perpagecnt=result.rowCount;
    console.log("Data",result.rowCount)
   res.json({ status: "1",page:page,per_page:per_page,scount:count ,total:total,perpagecnt:perpagecnt,total_pages:total_result, data:top });
  } else {
    res.json({ status: "0", message: "No data found" });
  }
      
    } catch (error) {
      res.statusCode = 500;
      res.send(new ErrorResponse(error.name));
    }
  };
  public manageslotsBookings = async (req: Request, res: Response) => {
     
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With"
    );
    res.header(
      "Access-Control-Allow-Methods",
      "POST, GET, PUT, DELETE, OPTIONS"
    );
    //let id = req.params.id;
    let field = ' *';
    let id=req.query.id
    let where = `  where evid=${id}`;

    let result1 = await this.ParentService.findcount(
      " count(*) AS search_count ",
       " evbooking",
       where
     );
     if (result1.rowCount > 0) {
       var count =result1.rows[0].search_count;
       console.log("Count"+result1.rows[0].search_count)
     // res.json({ status: "1", data: count });
     }

   const page=req.query.page;
   const per_page=req.query.perpage;
   const total= count;
  
   const cal = total/per_page;
   const total_result=Math.ceil(cal);
   const startindex=(page-1)*per_page; 
   
   try{   
   let result = await this.ParentService.findfieldpagi(
    field,
    " evbooking",
    where,
    per_page,
    startindex
  );
 
  if (result.rowCount > 0) {
    var top = result.rows;
    var perpagecnt=result.rowCount;
    console.log("Data",result.rowCount)
   res.json({ status: "1",page:page,per_page:per_page,scount:count ,total:total,perpagecnt:perpagecnt,total_pages:total_result, data:top });
  } else {
    res.json({ status: "0", message: "No data found" });
  }
      
    } catch (error) {
      res.statusCode = 500;
      res.send(new ErrorResponse(error.name));
    }
  };
  public allslotsBookings = async (req: Request, res: Response) => {
     
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With"
    );
    res.header(
      "Access-Control-Allow-Methods",
      "POST, GET, PUT, DELETE, OPTIONS"
    );
    //let id = req.params.id;
    let field = ' *';
   
    let where = `  `;

    let result1 = await this.ParentService.findcount(
      " count(*) AS search_count ",
       " evbooking",
       where
     );
     if (result1.rowCount > 0) {
       var count =result1.rows[0].search_count;
       console.log("Count"+result1.rows[0].search_count)
     // res.json({ status: "1", data: count });
     }

   const page=req.query.page;
   const per_page=req.query.perpage;
   const total= count;
  
   const cal = total/per_page;
   const total_result=Math.ceil(cal);
   const startindex=(page-1)*per_page; 
   
   try{   
   let result = await this.ParentService.findfieldpagi(
    field,
    " evbooking",
    where,
    per_page,
    startindex
  );
 
  if (result.rowCount > 0) {
    var top = result.rows;
    var perpagecnt=result.rowCount;
    console.log("Data",result.rowCount)
   res.json({ status: "1",page:page,per_page:per_page,scount:count ,total:total,perpagecnt:perpagecnt,total_pages:total_result, data:top });
  } else {
    res.json({ status: "0", message: "No data found" });
  }
      
    } catch (error) {
      res.statusCode = 500;
      res.send(new ErrorResponse(error.name));
    }
  };
  public allcarsBookings = async (req: Request, res: Response) => {
     
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With"
    );
    res.header(
      "Access-Control-Allow-Methods",
      "POST, GET, PUT, DELETE, OPTIONS"
    );
    //let id = req.params.id;
    let field = ' *';
   
    let where = `  `;

    let result1 = await this.ParentService.findcount(
      " count(*) AS search_count ",
       " rentbooking",
       where
     );
     if (result1.rowCount > 0) {
       var count =result1.rows[0].search_count;
       console.log("Count"+result1.rows[0].search_count)
     // res.json({ status: "1", data: count });
     }

   const page=req.query.page;
   const per_page=req.query.perpage;
   const total= count;
  
   const cal = total/per_page;
   const total_result=Math.ceil(cal);
   const startindex=(page-1)*per_page; 
   
   try{   
   let result = await this.ParentService.findfieldpagi(
    field,
    " rentbooking",
    where,
    per_page,
    startindex
  );
 
  if (result.rowCount > 0) {
    var top = result.rows;
    var perpagecnt=result.rowCount;
    console.log("Data",result.rowCount)
   res.json({ status: "1",page:page,per_page:per_page,scount:count ,total:total,perpagecnt:perpagecnt,total_pages:total_result, data:top });
  } else {
    res.json({ status: "0", message: "No data found" });
  }
      
    } catch (error) {
      res.statusCode = 500;
      res.send(new ErrorResponse(error.name));
    }
  };
  public viewSlotBooking = async (req: Request, res: Response) => {
     
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With"
    );
    res.header(
      "Access-Control-Allow-Methods",
      "POST, GET, PUT, DELETE, OPTIONS"
    );
    let id = req.params.id;
    let field = ' *';
    //let id=req.params.id
    let where = "  where uid="+id;
      
    try {
      let result = await this.ParentService.findfield(field,"evbooking",where);
      
      if (result.rowCount > 0) {
        var top = result.rows;
        res.json({ status: "1", data: top });
      } else {
        res.json({ status: "0", message: "No data found" });
      }
      
    } catch (error) {
      res.statusCode = 500;
      res.send(new ErrorResponse(error.name));
    }
  };

  public view_transactionbyid = async (req: Request, res: Response) => {
     
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With"
    );
    res.header(
      "Access-Control-Allow-Methods",
      "POST, GET, PUT, DELETE, OPTIONS"
    );
    let id = req.params.id;
    let field = ' *';
    let where = "  where uid="+id+" order by tid DESC";
      
    try {
      let result = await this.ParentService.findfield(field,"transaction",where);
      
      if (result.rowCount > 0) {
        var top = result.rows;
        res.json({ status: "1", data: top });
      } else {
        res.json({ status: "0", message: "No data found" });
      }
      
    } catch (error) {
      res.statusCode = 500;
      res.send(new ErrorResponse(error.name));
    }
  };

  public addstation = async (req: Request, res: Response) => {
     
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With"
    );
    res.header(
      "Access-Control-Allow-Methods",
      "POST, GET, PUT, DELETE, OPTIONS"
    );
    const col="cs_name,cs_city,cs_state,cs_area,capacity,is_active,username,password,isverify,location";
    const val= `'${req.body.cs_name}','${req.body.cs_city}','${req.body.cs_state}','${req.body.cs_area}','${req.body.capacity}','1','${req.body.username}','${req.body.password}','1','0'`;
      
    try {
      let result = await this.ParentService.Insert_data(
        "charge_station",
        col,
        val,
        'cs_id'
        );
      
      if (result.rowCount > 0) {
        var top = result.rows;
        res.json({ status: "1", data: top });
      } else {
        res.json({ status: "0", message: "No data found" });
      }
      
    } catch (error) {
      res.statusCode = 500;
      res.send(new ErrorResponse(error.name));
    }
  };

  public bookingcar = async (req: Request, res: Response) => {
     
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With"
    );
    res.header(
      "Access-Control-Allow-Methods",
      "POST, GET, PUT, DELETE, OPTIONS"
    );
    const col="bamt,pamt,pcity,bdate,uid,ecid,ecname";
    const val= `'${req.body.bamt}','${req.body.pamt}','${req.body.pcity}','${req.body.bdate}','${req.body.uid}','${req.body.ecid}','${req.body.ecname}'`;
      
    try {
      let result = await this.ParentService.Insert_data(
        "rentbooking",
        col,
        val,
        'brid'
        );
      
      if (result.rowCount > 0) {
        var top = result.rows;
        res.json({ status: "1", data: top });
      } else {
        res.json({ status: "0", message: "No data found" });
      }
      
    } catch (error) {
      res.statusCode = 500;
      res.send(new ErrorResponse(error.name));
    }
  };

  public bookingStation = async (req: Request, res: Response) => {
     
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With"
    );
    res.header(
      "Access-Control-Allow-Methods",
      "POST, GET, PUT, DELETE, OPTIONS"
    );
    const col="slot,date,uid,evid,evname,status";
    const val= `'${req.body.slot}','${req.body.date}','${req.body.uid}','${req.body.evid}','${req.body.evname}','${req.body.status}'`;
      
    try {
      let result = await this.ParentService.Insert_data(
        "evbooking",
        col,
        val,
        'evb_id'
        );
      
      if (result.rowCount > 0) {
        var top = result.rows;
        res.json({ status: "1", data: top });
      } else {
        res.json({ status: "0", message: "No data found" });
      }
      
    } catch (error) {
      res.statusCode = 500;
      res.send(new ErrorResponse(error.name));
    }
  };

  public adduser = async (req: Request, res: Response) => {
     
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With"
    );
    res.header(
      "Access-Control-Allow-Methods",
      "POST, GET, PUT, DELETE, OPTIONS"
    );
    const salt = EncryptionUtil.generateSalt(10);
    let hashedPassword = EncryptionUtil.encrypt(req.body.password, salt);


    const col="ufname,ulname,email,password,contact,vehicle,is_deleted,balance";
    const val= `'${req.body.ufname}','${req.body.ulname}','${req.body.email}','${hashedPassword}','${req.body.contact}','${req.body.vehicle}','1','0'`;
      
    try {
      let result = await this.ParentService.Insert_data(
        "user_tbl",
        col,
        val,
        'uid'
        );
      
      if (result.rowCount > 0) {
        var top = result.rows;
        res.json({ status: "1", data: top });
      } else {
        res.json({ status: "0", message: "No data found" });
      }
      
    } catch (error) {
      res.statusCode = 500;
      res.send(new ErrorResponse(error.name));
    }
  };



  public login_station = async (req: Request, res: Response) => {
     
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With"
    );
    res.header(
      "Access-Control-Allow-Methods",
      "POST, GET, PUT, DELETE, OPTIONS"
    );
    let email = req.body.email;
    let password = req.body.password;
    let field = ' *';
    let where = ` where password='${password}' and username='${email}' and isverify=true `;
      
    try {
      let result = await this.ParentService.findfield(field,"charge_station",where);
      
      if (result.rowCount > 0) {
        var top = result.rows;
        res.json({ status: "1", data: top });
      } else {
        res.json({ status: "0", message: "No data found" });
      }
      
    } catch (error) {
      res.statusCode = 500;
      res.send(new ErrorResponse(error.name));
    }
  };

  public login_admin = async (req: Request, res: Response) => {
     
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With"
    );
    res.header(
      "Access-Control-Allow-Methods",
      "POST, GET, PUT, DELETE, OPTIONS"
    );
    let email = req.body.email;
    let password = req.body.password;
    let field = ' *';
    let where = ` where password='${password}' and username='${email}' `;
      
    try {
      let result = await this.ParentService.findfield(field,"superadmin",where);
      
      if (result.rowCount > 0) {
        var top = result.rows;
        res.json({ status: "1", data: top });
      } else {
        res.json({ status: "0", message: "No data found" });
      }
      
    } catch (error) {
      res.statusCode = 500;
      res.send(new ErrorResponse(error.name));
    }
  };


  public login_user = async (req: Request, res: Response) => {
     
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With"
    );
    res.header(
      "Access-Control-Allow-Methods",
      "POST, GET, PUT, DELETE, OPTIONS"
    );
    let email = req.body.email;
    let password = req.body.password;
    let field = ' *';
    let where = ` where email='${email}' `;
      
    try {
      let result = await this.ParentService.findfield(field,"user_tbl",where);
      
      if (result.rowCount > 0) {
       
        var top = result.rows;
        const isPasswordMatch = EncryptionUtil.compare(password,result.rows[0].password);
        if(isPasswordMatch) 
        {      
          res.status(200).json({ status: "1", message: "Success", data: top });
        } 
        else 
        {
          res.status(200).json({ status: "0", message: "Login Failed, Invalid username or password" });
        }
      //   res.json({ status: "1", data: top });
      // } else {
      //   res.json({ status: "0", message: "No data found" });
      } else
        {
          res.status(200).json({ status: "0", message: "Your account is not activated." });
        }
      
    } catch (error) {
      res.statusCode = 500;
      res.send(new ErrorResponse(error.name));
    }
  };
  public transaction= async (req: Request, res: Response) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With"
    );
    res.header(
      "Access-Control-Allow-Methods",
      "POST, GET, PUT, DELETE, OPTIONS"
    );
    let fulldate = CommonUtils.postgressDateFormat();

    const col="uid,evid,evname,date,action,uamt,amt";
    const val= `'${req.body.uid}','0','Added By User','${fulldate}','Credit','${req.body.uamt}','${req.body.amt}'`;
      
    try {
      let result = await this.ParentService.Insert_data(
        "transaction",
        col,
        val,
        'tid'
        );
      
      if (result.rowCount > 0) {
        var top = result.rows;
        res.json({ status: "1", data: top });
      } else {
        res.json({ status: "0", message: "No data found" });
      }
      
    } catch (error) {
      res.statusCode = 500;
      res.send(new ErrorResponse(error.name));
    }  };
    public transaction1= async (req: Request, res: Response) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header(
        "Access-Control-Allow-Headers",
        "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With"
      );
      res.header(
        "Access-Control-Allow-Methods",
        "POST, GET, PUT, DELETE, OPTIONS"
      );
      let fulldate = CommonUtils.postgressDateFormat();

      let set =` balance='${req.body.uamt1}'`;
      let where = ` uid='${req.body.uid}'`
      try {
        let id = await this.ParentService.Update_data(
          " user_tbl",
          set,
          where
        );
        console.log(id);
        if (id.rowCount > 0) {
          const col="uid,evid,evname,date,action,uamt,amt";
          const val= `'${req.body.uid}','${req.body.evid}','${req.body.evname}','${fulldate}','debit','${req.body.uamt1}','${req.body.amt1}'`;
            
          try {
            let result = await this.ParentService.Insert_data(
              "transaction",
              col,
              val,
              'tid'
              );
            
            if (result.rowCount > 0) {
              var top = result.rows;
              res.json({ status:"1", data: top });
            } else {
              res.json({ status:"0", message: "No data found" });
            }
        
          } catch (error) {
            res.statusCode = 500;
            res.send(new ErrorResponse(error.name));
          } 
        } else {
          res.json({ status:"0", message: "Record Update Failed" });
        }
       } catch (error) {
          res.statusCode = 500;
          res.send(new ErrorResponse(error.name));
        }   
        
      };

  public update_location= async (req: Request, res: Response) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With"
    );
    res.header(
      "Access-Control-Allow-Methods",
      "POST, GET, PUT, DELETE, OPTIONS"
    );

    let location = req.body.location;
    let set =`location='${location}'`;

    let where = ` cs_id='${req.body.id}'`

    console.log("set: " + set);

    try {
      let id = await this.ParentService.Update_data(
        " charge_station",
        set,
        where
      );
      console.log(id);
      if (id && id.rowCount > 0) {
        res
          .status(200)
          .json({ status: "1", message: "Location Updated Successfully" });
      } else {
        res.status(200).json({ status: "0", message: "Record Update Failed" });
      }
    } catch (error) {
      res.statusCode = 500;
      res.send(new ErrorResponse(error.name));
    }
  };
  public addmoney= async (req: Request, res: Response) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With"
    );
    res.header(
      "Access-Control-Allow-Methods",
      "POST, GET, PUT, DELETE, OPTIONS"
    );

    let user_id = req.body.user_id;
    let amt = req.body.uamt;
    let set =` balance='${amt}'`;

    let where = ` uid='${user_id}'`

    console.log("set: " + set);

    try {
      let id = await this.ParentService.Update_data(
        " user_tbl",
        set,
        where
      );
      console.log(id);
      if (id && id.rowCount > 0) {
        res
          .status(200)
          .json({ status: "1", message: "Balance Updated Successfully" });
      } else {
        res.status(200).json({ status: "0", message: "Record Update Failed" });
      }
    } catch (error) {
      res.statusCode = 500;
      res.send(new ErrorResponse(error.name));
    }
  };
  public updatemoney= async (req: Request, res: Response) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With"
    );
    res.header(
      "Access-Control-Allow-Methods",
      "POST, GET, PUT, DELETE, OPTIONS"
    );

    let user_id = req.body.user_id;
    let amt = req.body.amt;
    let set =` balance='${amt}'`;

    let where = ` uid='${user_id}'`

    console.log("set: " + set);

    try {
      let id = await this.ParentService.Update_data(
        " user_tbl",
        set,
        where
      );
      console.log(id);
      if (id && id.rowCount > 0) {
        res
          .status(200)
          .json({ status: "1", message: "Balance Updated Successfully" });
      } else {
        res.status(200).json({ status: "0", message: "Record Update Failed" });
      }
    } catch (error) {
      res.statusCode = 500;
      res.send(new ErrorResponse(error.name));
    }
  };
  public view_stationbyid = async (req: Request, res: Response) => {
     
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With"
    );
    res.header(
      "Access-Control-Allow-Methods",
      "POST, GET, PUT, DELETE, OPTIONS"
    );
    let id = req.params.id;
    let field = ' *';
    //let id=req.params.id
    let where = "  where cs_id="+id;
      
    try {
      let result = await this.ParentService.findfield(field,"charge_station",where);
      
      if (result.rowCount > 0) {
        var top = result.rows;
        res.json({ status: "1", data: top });
      } else {
        res.json({ status: "0", message: "No data found" });
      }
      
    } catch (error) {
      res.statusCode = 500;
      res.send(new ErrorResponse(error.name));
    }
  };

   public view_userbyid = async (req: Request, res: Response) => {
     
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With"
    );
    res.header(
      "Access-Control-Allow-Methods",
      "POST, GET, PUT, DELETE, OPTIONS"
    );
    let id = req.params.id;
    let field = ' *';
    //let id=req.params.id
    let where = "  where uid="+id;
      
    try {
      let result = await this.ParentService.findfield(field,"user_tbl",where);
      
      if (result.rowCount > 0) {
        var top = result.rows;
        res.json({ status: "1", data: top });
      } else {
        res.json({ status: "0", message: "No data found" });
      }
      
    } catch (error) {
      res.statusCode = 500;
      res.send(new ErrorResponse(error.name));
    }
  };
  public view_evcarsbyid = async (req: Request, res: Response) => {
     
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With"
    );
    res.header(
      "Access-Control-Allow-Methods",
      "POST, GET, PUT, DELETE, OPTIONS"
    );
  
    let field = ' *';
    let where = " where carid= "+req.params.id;
      
    try {
      let result = await this.ParentService.findfield(field,"evcars",where);
      
      if (result.rowCount > 0) {
        var top = result.rows;
        res.json({ status: "1", data: top });
      } else {
        res.json({ status: "0", message: "No data found" });
      }
      
    } catch (error) {
      res.statusCode = 500;
      res.send(new ErrorResponse(error.name));
    }
  };

    public view_evcars = async (req: Request, res: Response) => {
     
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With"
    );
    res.header(
      "Access-Control-Allow-Methods",
      "POST, GET, PUT, DELETE, OPTIONS"
    );
  
    let field = ' *';
    let where = "  ";
      
    try {
      let result = await this.ParentService.findfield(field,"evcars",where);
      
      if (result.rowCount > 0) {
        var top = result.rows;
        res.json({ status: "1", data: top });
      } else {
        res.json({ status: "0", message: "No data found" });
      }
      
    } catch (error) {
      res.statusCode = 500;
      res.send(new ErrorResponse(error.name));
    }
  };
  public view_evstations = async (req: Request, res: Response) => {
     
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With"
    );
    res.header(
      "Access-Control-Allow-Methods",
      "POST, GET, PUT, DELETE, OPTIONS"
    );
  
    let field = ' *';
    let where = " where isverify=true ";
      
    try {
      let result = await this.ParentService.findfield(field,"charge_station",where);
      
      if (result.rowCount > 0) {
        var top = result.rows;
        res.json({ status: "1", data: top });
      } else {
        res.json({ status: "0", message: "No data found" });
      }
      
    } catch (error) {
      res.statusCode = 500;
      res.send(new ErrorResponse(error.name));
    }
  };
  public filter_evstations = async (req: Request, res: Response) => {
     
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With"
    );
    res.header(
      "Access-Control-Allow-Methods",
      "POST, GET, PUT, DELETE, OPTIONS"
    );
  let state=req.query.state;
  let city=req.query.city;
    let field = ' *';
    let where = ` where isverify=true and cs_state='${state}' and cs_city='${city}'`;
      
    try {
      let result = await this.ParentService.findfield(field,"charge_station",where);
      
      if (result.rowCount > 0) {
        var top = result.rows;
        res.json({ status: "1", data: top });
      } else {
        res.json({ status: "0", message: "No data found" });
      }
      
    } catch (error) {
      res.statusCode = 500;
      res.send(new ErrorResponse(error.name));
    }
  };
  public update_station= async (req: Request, res: Response) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With"
    );
    res.header(
      "Access-Control-Allow-Methods",
      "POST, GET, PUT, DELETE, OPTIONS"
    );

    let location = req.body.location;
    let set =`location='${location}' , cs_name='${req.body.cs_name}', cs_area='${req.body.cs_area}', capacity='${req.body.capacity}'`;

    let where = ` cs_id='${req.params.id}'`

    console.log("set: " + set);

    try {
      let id = await this.ParentService.Update_data(
        " charge_station",
        set,
        where
      );
      console.log(id);
      if (id && id.rowCount > 0) {
        res
          .status(200)
          .json({ status: "1", message: "Location Updated Successfully" });
      } else {
        res.status(200).json({ status: "0", message: "Record Update Failed" });
      }
    } catch (error) {
      res.statusCode = 500;
      res.send(new ErrorResponse(error.name));
    }
  };
  public viewfeedback = async (req: Request, res: Response) => {
     
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With"
    );
    res.header(
      "Access-Control-Allow-Methods",
      "POST, GET, PUT, DELETE, OPTIONS"
    );
    let id = req.params.id;
    let field = ' *';
    //let id=req.params.id
    let where = "  where evid="+id;
      
    try {
      let result = await this.ParentService.findfield(field,"feedback",where);
      
      if (result.rowCount > 0) {
        var top = result.rows;
        res.json({ status: "1", data: top });
      } else {
        res.json({ status: "0", message: "No data found" });
      }
      
    } catch (error) {
      res.statusCode = 500;
      res.send(new ErrorResponse(error.name));
    }
  };
  public viewfeedbacks = async (req: Request, res: Response) => {
     
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With"
    );
    res.header(
      "Access-Control-Allow-Methods",
      "POST, GET, PUT, DELETE, OPTIONS"
    );
    
    let field = ' *';
    //let id=req.params.id
    let where = "  ";
      
    try {
      let result = await this.ParentService.findfield(field,"feedback",where);
      
      if (result.rowCount > 0) {
        var top = result.rows;
        res.json({ status: "1", data: top });
      } else {
        res.json({ status: "0", message: "No data found" });
      }
      
    } catch (error) {
      res.statusCode = 500;
      res.send(new ErrorResponse(error.name));
    }
  };

}