import { injectable, inject } from "inversify";
import { Request, Response, Router } from "express";
// import { CommonUtils } from '../util/commonUtils';
import Identifiers from "../config/identifiers";
import { ErrorResponse } from "../dto/errorResponse";
import { IParentService } from "src/service/iparentService";
//import { EncryptionUtil } from "../util/encryptionUtil";
var nodemailer = require('nodemailer');


@injectable()
export class EmailController {
  public router: Router;

  @inject(Identifiers.IParentService)  //responsible to accessing & intaract with database
  private ParentService: IParentService;

  constructor() 
  {
    this.router = Router();
    this.router.post("/otp/mail/booking", this.bookingotp);
    this.router.get("/send/otp/booking", this.sendotp);
    
  
  }
  public sendotp = async (req: Request, res: Response) => {
     
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With"
    );
    res.header(
      "Access-Control-Allow-Methods",
      "POST, GET, PUT, DELETE, OPTIONS"
    );
   
    //let id=req.params.id
    let where = "  ";
      let field=" *"
      let otp=Math.floor(1000 + Math.random() * 9000)
    try {
      let result = await this.ParentService.findfield(field,"user_tbl",where);
      
      if (result.rowCount > 0) {
        var top = result.rows;
        res.json({ status: "1", data: top,otp:otp });
      } else {
        res.json({ status: "0", message: "No data found" });
      }
      
    } catch (error) {
      res.statusCode = 500;
      res.send(new ErrorResponse(error.name));
    }
  };

  public bookingotp= async (req: Request, res: Response) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With"
    );
    res.header(
      "Access-Control-Allow-Methods",
      "POST, GET, PUT, DELETE, OPTIONS"
    );
    var otp=req.body.otp;
    var email=req.body.email;
  
    console.log(otp)
    var subject="Payment against car booking";
    
   const textmail=`<html>
   <head>
       <meta charset="utf-8">
       <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
   </head>
   <body style="margin:0px;padding:0px">
   <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
   <div style="margin:50px auto;width:70%;padding:20px 0">
     <div style="border-bottom:1px solid #eee">
       <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">EcoWheels </a>
     </div>
     <p style="font-size:1.1em">Hi,</p>
     <p>Thank you for choosing Your EcoWheels . Use the following OTP to complete your Booking procedures.</p>
     <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
     <p style="font-size:0.9em;">Regards,<br />EcoWheels </p>
     <hr style="border:none;border-top:1px solid #eee" />
     <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
       <p>EcoWheels</p>
       <p>EV Company</p>
       <p>India</p>
     </div>
   </div>
 </div>
   </body>
   </html>`;
    const email_res=this.sendmail(email,subject,textmail);
   
      if (email_res) {
        res.json({ status: "1", data: "email send sucess" });
      } else {
        res.json({ status: "0", message: "error" });
      }
    }


  private sendmail = async (tomail:string,subject:string,textmail:string) => 
    {      
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'hitakshi06@gmail.com',
          pass: 'qwydzqulxictpigc'
        },
        secure: false,
        logger: true,
        debug: true,
        ignoreTLS: true // add this 
      });
      
      var mailOptions = {
        from: 'hitakshi06@gmail.com',
        to:tomail,
        subject:subject,
        html: textmail
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
       
  }

  
  
  
}