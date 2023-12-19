module Identifiers {
  export const ExpressServer = Symbol("ExpressServer");
  export const RouteManager = Symbol("RouteManager");
  export const ConfigParams = Symbol("ConfigParams");

  //DB Managers
  export const DbManager = Symbol("DbManager");
  // export const UserRegisterController = Symbol("UserRegistrationController");
  // export const IUserRegisterService = Symbol("IUserRegisterService");
  // export const UserRegisterDbManager = Symbol("UserRegisterDbManager");
  // export const AdminController = Symbol("AdminController");
  // export const IAdminRegisterService = Symbol("IAdminRegisterService");
  // export const AdminDbManager = Symbol("AdminDbManager");
  export const ParentController = Symbol("ParentController");
  // export const InstituteController = Symbol("InstituteController");
  // export const StudentController = Symbol("StudentController");
  // export const TeacherController = Symbol("TeacherController");
  export const EmailController = Symbol("EmailController");

  export const IParentService = Symbol("IParentService");
  export const ParentDbManager = Symbol("ParentDbManager");

  



}

export default Identifiers;
