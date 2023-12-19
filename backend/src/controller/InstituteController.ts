import { injectable, inject } from "inversify";
import { Request, Response, Router } from "express";
import { CommonUtils } from '../util/commonUtils';
import Identifiers from "../config/identifiers";
import { ErrorResponse } from "../dto/errorResponse";
import { IParentService } from "src/service/iparentService";
//import { EncryptionUtil } from "../util/encryptionUtil";


@injectable()
export class InstituteController {
  public router: Router;

  @inject(Identifiers.IParentService)
  private ParentService: IParentService;

  constructor() 
  {
    this.router = Router();
    this.router.get("/view/institute/:id", this.view_institute);
    this.router.post("/login/institute", this.login_user);
    this.router.post("/add/institute", this.addinstitute);

//Group    
    this.router.post("/add/group", this.addgroup);
    this.router.post("/add/student/group", this.addstudgroup);
    this.router.get("/view/group", this.view_group);
    this.router.get("/view/groupbyid", this.view_groupbyid);
    this.router.get("/search/group", this.search_group);
    this.router.get("/notadded/group", this.addstudlist);
    this.router.get("/added/group", this.addedstudlist);
    this.router.get("/addedsearch/group", this.addedsearchstud);
    this.router.get("/nonaddedsearch/group", this.nonaddedsearchstud);
    this.router.post("/remove/student", this.remove_stud);
  }
  public remove_stud = async (req: Request, res: Response) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With"
    );
    res.header(
      "Access-Control-Allow-Methods",
      "POST, GET, PUT, DELETE, OPTIONS"
    );

    let sid = req.body.sid;
    let gid = req.body.gid;
  


    let where = ` studentid= ${sid} and groupid=${gid}`;

    try {
      let id = await this.ParentService.delete_data(
        " studgrp",
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

  public nonaddedsearchstud = async (req: Request, res: Response) => {
     
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
    let iid=req.query.iid
    let gid=req.query.gid
    let q=req.query.find
    let where = ` where institute_id=${iid} and student_fname LIKE'%${q}%'  and student_id not in (select studentid from studgrp where groupid=${gid} )`;
      
    try {
      let result = await this.ParentService.findfield(field,"student",where);
      
      if (result.rowCount > 0) {
        var top = result.rows;
        res.json({ status: "1", data: top ,gcount:result.rowCount});
      } else {
        res.json({ status: "0", message: "No data found" });
      }
 
    } catch (error) {
      res.statusCode = 500;
      res.send(new ErrorResponse(error.name));
    }
  };




  public addedsearchstud = async (req: Request, res: Response) => {
     
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With"
    );
    res.header(
      "Access-Control-Allow-Methods",
      "POST, GET, PUT, DELETE, OPTIONS"
    );
    let gid=req.query.gid
    let q=req.query.find
    let field = ' s.*,sg.*';
    let where = ` Join student s on s.student_id=sg.studentid where sg.groupid=${gid} and s.student_fname LIKE'%${q}%'`;

      
    try {
      let result = await this.ParentService.findfield(field,"studgrp sg",where);
      
      if (result.rowCount > 0) {
        var top = result.rows;
        res.json({ status: "1", data: top ,gcount:result.rowCount});
      } else {
        res.json({ status: "0", message: "No data found" });
      }
      
    } catch (error) {
      res.statusCode = 500;
      res.send(new ErrorResponse(error.name));
    }
  };

  public addedstudlist = async (req: Request, res: Response) => {
     
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With"
    );
    res.header(
      "Access-Control-Allow-Methods",
      "POST, GET, PUT, DELETE, OPTIONS"
    );
    // let field = ' *';
    let gid=req.query.gid
    // let where = ` where groupid=${gid}`;
    let field = ' s.*,sg.*';
    let where = ` Join student s on s.student_id=sg.studentid where sg.groupid=${gid}`;

      

    try {
      let result = await this.ParentService.findfield(field,"studgrp sg",where);
      
      if (result.rowCount > 0) {
        var top = result.rows;
        res.json({ status: "1", data: top ,gcount:result.rowCount});
      } else {
        res.json({ status: "0", message: "No data found" });
      }
      
    } catch (error) {
      res.statusCode = 500;
      res.send(new ErrorResponse(error.name));
    }
  };

  public addstudlist = async (req: Request, res: Response) => {
     
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
    let iid=req.query.iid
    let gid=req.query.gid
    let cyear=req.query.cyear
    let course=req.query.course
    let where = ` where institute_id=${iid} and course='${course}' and cyear='${cyear}' and student_id not in (select studentid from studgrp where groupid=${gid} )`;
      
    try {
      let result = await this.ParentService.findfield(field,"student",where);
      
      if (result.rowCount > 0) {
        var top = result.rows;
        res.json({ status: "1", data: top ,gcount:result.rowCount});
      } else {
        res.json({ status: "0", message: "No data found" });
      }
      
    } catch (error) {
      res.statusCode = 500;
      res.send(new ErrorResponse(error.name));
    }
  };

  public view_group = async (req: Request, res: Response) => {
     
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
    let tid=req.query.tid
    let type=req.query.type
    let where
    if(type=="teacher"){
      where= ` where admin_id=${tid}`;
    }else{
      where= ` where iid=${id}`;
      
    }
     
    try {
      let result = await this.ParentService.findfield(field,"groups",where);
      
      if (result.rowCount > 0) {
        var top = result.rows;
        res.json({ status: "1", data: top ,gcount:result.rowCount});
      } else {
        res.json({ status: "0", message: "No data found" });
      }
      
    } catch (error) {
      res.statusCode = 500;
      res.send(new ErrorResponse(error.name));
    }
  };

  public search_group = async (req: Request, res: Response) => {
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
    var q=req.query.find;
    var id=req.query.id;
    let where = ` where iid=${id} and group_name LIKE'%${q}%' `;
  
    try {
      let result = await this.ParentService.findfield(
        field,
        " groups",
        where,
      );
      if (result.rowCount > 0) {
        var top = result.rows;
       res.json({ status: "1", data:top });
      } else {
        res.json({ status: "0", message: "No data found" });
      }
      
    } catch (error) {
      res.statusCode = 500;
      res.send(new ErrorResponse(error.name));
    }
  }


  public view_groupbyid = async (req: Request, res: Response) => {
     
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
    let field = ' g.*,t.*,i.institute_id,i.institute_name';
    let id=req.query.id;
    let where = ` Join teacher t on t.teacher_id=g.admin_id Join institute i on i.institute_id=g.iid where g.group_id=${id}`;
    //let where = ` where group_id=${id}`;
      
    try {
      let result = await this.ParentService.findfield(field,"groups g",where);
      
      if (result.rowCount > 0) {
        var top = result.rows;
        res.json({ status: "1", data: top ,gcount:result.rowCount});
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
    let where = ` where del_flag='0' and institute_email='${email}' and institute_password='${password}'`;
      
    try {
      let result = await this.ParentService.findfield(field,"institute",where);
      
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

  public addinstitute = async (req: Request, res: Response) => {
     
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With"
    );
    res.header(
      "Access-Control-Allow-Methods",
      "POST, GET, PUT, DELETE, OPTIONS"
    );

    var Profile
    var uploadPath
    Profile = req.files.Profile;
    let img=CommonUtils.generateUniqueID()+"-"+Profile.name;
    let path="E:/Final year project/frontend/public";
    uploadPath = path + '/uploads/' +img ;
    
    console.log(Profile.name)
        Profile.mv(uploadPath, function(err) {
            if (err){
            // return res.status(500).send(err);
            console.log("fail")
            }
            else{
            console.log('File uploaded!');
            }
        });



    const col="institute_name,institute_email,institute_password,institute_contact,del_flag,i_img";
    const val= `'${req.body.institute_name}','${req.body.institute_email}','${req.body.institute_password}','${req.body.institute_contact}','0','${img}'`;
      
    try {
      let result = await this.ParentService.Insert_data(
        "institute",
        col,
        val,
        'institute_id'
        );
      
      if (result.rowCount > 0) {
        var data = result.rows;
        res.json({ status: "1", data: data });
      } else {
        res.json({ status: "0", message: "Faild to register" });
      }
      
    } catch (error) {
      res.statusCode = 500;
      res.send(new ErrorResponse(error.name));
    }
  };

  public addgroup = async (req: Request, res: Response) => {
     
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With"
    );
    res.header(
      "Access-Control-Allow-Methods",
      "POST, GET, PUT, DELETE, OPTIONS"
    );

    var Profile
    var uploadPath
    Profile = req.files.Profile;
    let fulldate = CommonUtils.postgressDateFormat();
    let img=CommonUtils.generateUniqueID()+"-"+Profile.name;
    let path="E:/Final year project/frontend/public";
    uploadPath = path + '/uploads/' +img ;
    
    console.log(Profile.name)
        Profile.mv(uploadPath, function(err) {
            if (err){
            // return res.status(500).send(err);
            console.log("fail")
            }
            else{
            console.log('File uploaded!');
            }
        });
    const col="group_name,group_decp,grp_img,iid,created_at,admin_id,course,year";
    const val= `'${req.body.gname}','${req.body.gdecp}','${img}','${req.body.iid}','${fulldate}','${req.body.admin_id}','${req.body.course}','${req.body.year}'`;
      
    try {
      let result = await this.ParentService.Insert_data(
        "groups",
        col,
        val,
        'group_id'
        );
      
      if (result.rowCount > 0) {
        var data = result.rows;
        res.json({ status: "1", data: data });
      } else {
        res.json({ status: "0", message: "Faild to create" });
      }
      
    } catch (error) {
      res.statusCode = 500;
      res.send(new ErrorResponse(error.name));
    }
  };


  public addstudgroup = async (req: Request, res: Response) => {
     
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
    const col="instituteid,studentid,groupid,created_at";
    const val= `'${req.body.iid}','${req.body.sid}','${req.body.gid}','${fulldate}'`;
      
    try {
      let result = await this.ParentService.Insert_data(
        " studgrp",
        col,
        val,
        ' eid'
        );
      
      if (result.rowCount > 0) {
        var data = result.rows;
        res.json({ status: "1", data: data });
      } else {
        res.json({ status: "0", message: "Faild to Add" });
      }
      
    } catch (error) {
      res.statusCode = 500;
      res.send(new ErrorResponse(error.name));
    }
  };

  public view_institute = async (req: Request, res: Response) => {
     
    res.header("Access-Control-Allow-Origin", "*");  //restrict cors error(allow all domain using *)
    res.header(
      "Access-Control-Allow-Headers",
      "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With"
    );
    res.header(
      "Access-Control-Allow-Methods",    //allow methods
      "POST, GET, PUT, DELETE, OPTIONS"
    );
    //let id = req.params.id;
    let field = ' *';
    let id=req.params.id
    let where = "  where institute_id="+id;
      
    try {
      let result = await this.ParentService.findfield(field,"institute",where);
      
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