import { injectable, inject } from "inversify";
import { ParentDbManager } from "../db/ParentDbManager";
import { IParentService } from "../service/iparentService";
import Identifiers from "../config/identifiers";
import { UserLogin } from "../db/model/userlogin";


@injectable()
export class ParentService implements IParentService {
  @inject(Identifiers.ParentDbManager)
  private parentDbManager: ParentDbManager;

   public async findfieldpagi(field : string ,table: string, where: string,limit:number,offset:number)
  {
    console.log("findfield Function");
    let actionid = await this.parentDbManager.findfieldpagi(field,table, where,limit,offset);
    console.log("return in db service");
    return actionid;
  }

  public async User_Login(username: string, password: string):Promise<UserLogin> 
  {
      console.log("Service Function");
      let lastid = await this.parentDbManager.LoginUser(username, password);
      return lastid;
  }  
  public async allcount(table: string):Promise<UserLogin> 
  {
      console.log("Service Function");
      let lastid = await this.parentDbManager.allcount(table);
      return lastid;
  }   
  public async findrecords(table: string,where:string):Promise<UserLogin> 
  {
      console.log("Service Function");
      let lastid = await this.parentDbManager.findrecords(table,where);
      return lastid;
  }   
  
  public async loginuser(email: string, password: string): Promise<UserLogin> 
  {
      let id = await this.parentDbManager.login(email, password);
      return id;
  }

  public async delete_data(table: string, where: string)
  {
      console.log("delete Function");
      let actionid = await this.parentDbManager.delete_data(table, where);
      return actionid;
  }

  public async get_data(table: string)
  {
      console.log("record Function");
      let actionid = await this.parentDbManager.get_data(table);
      return actionid;
  }

  public async Insert_data(table: string, col: string,val: string,primaryid:string)
  {
      console.log("Insert Function");
      let actionid = await this.parentDbManager.Inser_data(table,col,val,primaryid);
      console.log("Insert Function action id " + actionid );
      return actionid;
  }
      
  public async Update_data(table: string, set: string,where: string)
  {
      console.log("Update Function");
      let actionid = await this.parentDbManager.Update_data(table, set,where);
      return actionid;
  }
      
  public async findfield(field : string ,table: string, where: string)
  {
    console.log("findfield Function");
    let actionid = await this.parentDbManager.findfield(field,table, where);
    console.log("return in db service");
    return actionid;
  }

  public async findcount(field : string ,table: string, where: string)
  {
    console.log("findfield Function");
    let actionid = await this.parentDbManager.findfield(field,table, where);
    console.log("return in db service");
    return actionid;
  }

  public async sumfeild(field : string ,table: string, where: string)
  {
    console.log("findfield Function");
    let actionid = await this.parentDbManager.sumfeild(field,table, where);
    console.log("return in db service");
    return actionid;
  }

}
