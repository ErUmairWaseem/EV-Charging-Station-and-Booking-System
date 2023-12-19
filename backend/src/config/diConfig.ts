import "reflect-metadata";
import { Container } from "inversify";
import { ExpressServer } from "../expressServer";
import Identifiers from "./identifiers";
import { RouteManager } from "../routeManager";
import { ConfigParams } from "./configParams";
import { DbManager } from "../db/dbManager";


import {ParentController } from "../controller/ParentController";
import {EmailController } from "../controller/EmailController";
// import {InstituteController } from "../controller/InstituteController";
// import {StudentController } from "../controller/StudentController";
// import {TeacherController } from "../controller/TeacherController";
import { IParentService } from "../service/iparentService";
import { ParentDbManager } from "../db/ParentDbManager";
import { ParentService } from "../service/parentService";



let diContainer = new Container({ defaultScope: "Singleton" });
diContainer.bind<ExpressServer>(Identifiers.ExpressServer).to(ExpressServer);
diContainer.bind<RouteManager>(Identifiers.RouteManager).to(RouteManager);
diContainer.bind<ConfigParams>(Identifiers.ConfigParams).to(ConfigParams);





//DB manager
diContainer.bind<DbManager>(Identifiers.DbManager).to(DbManager);

//  AdminloginController  IAdminloginService   AdminloginDbManager

diContainer
  .bind<ParentController>(Identifiers.ParentController)
  .to(ParentController);

// diContainer
//   .bind<InstituteController>(Identifiers.InstituteController)
//   .to(InstituteController);

// diContainer
//   .bind<StudentController>(Identifiers.StudentController)
//   .to(StudentController);

// diContainer
//   .bind<TeacherController>(Identifiers.TeacherController)
//   .to(TeacherController);

  diContainer
  .bind<EmailController>(Identifiers.EmailController)
  .to(EmailController);


diContainer
  .bind<IParentService>(Identifiers.IParentService)
  .to(ParentService);
diContainer.bind<ParentDbManager>(Identifiers.ParentDbManager).to(ParentDbManager);
// school




export default diContainer;
