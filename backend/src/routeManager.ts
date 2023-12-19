import { injectable, inject } from "inversify";
import { Application } from "express";
import Identifiers from "./config/identifiers";
import Constants from "./util/constants";
import { ParentController } from "./controller/ParentController";
// import { InstituteController } from "./controller/InstituteController";
// import { TeacherController } from "./controller/TeacherController";
// import { StudentController } from "./controller/StudentController";
import { EmailController } from "./controller/EmailController";

@injectable()
export class RouteManager { 
   
     @inject(Identifiers.ParentController)
    private ParentController:ParentController;

    @inject(Identifiers.EmailController)
    private EmailController:EmailController;

    // @inject(Identifiers.InstituteController)
    // private InstituteController:InstituteController;

    // @inject(Identifiers.TeacherController)
    // private TeacherController:TeacherController;

    // @inject(Identifiers.StudentController)
    // private StudentController:StudentController;
  
    public configure = (express: Application) => {       
        
        console.log('router function');
      
        express.use(Constants.resource_URL, this.ParentController.router);
        // express.use(Constants.resource_URL, this.InstituteController.router);
        // express.use(Constants.resource_URL, this.TeacherController.router);
        // express.use(Constants.resource_URL, this.StudentController.router);
        express.use(Constants.resource_URL, this.EmailController.router);
        
    }
 
}
