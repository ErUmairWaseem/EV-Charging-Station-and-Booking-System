import { injectable, inject } from "inversify";
import { DbManager } from "./dbManager";
import Identifiers from "../config/identifiers";
import { UserLogin } from "./model/userlogin";

@injectable()
export class ParentDbManager {
  @inject(Identifiers.DbManager)
  private dbManager: DbManager;
  public async LoginUser(username: string,password: string):Promise<UserLogin>{
    console.log("DbManager");
    let lastid = await this.dbManager.login_user(username,password);
    return lastid;
  }
    
  public async delete_data(table: string,where: string){
    let lastid = await this.dbManager.delete(table, where);
    return lastid;
  } 
  public async allcount(table: string){
    let lastid = await this.dbManager.allcount(table);
    return lastid;
  } 
  public async findrecords(table:string, where:string) {
    let result = await this.dbManager.findrecords( table ,where);
    return result;
  }

  public async get_data(table:string){
    let lastid = await this.dbManager.getAll_records(table);
    return lastid;
  } 
   public async login(email: string, password: string): Promise<UserLogin> {
    let result = await this.dbManager.login(email, password);
    return result;
  }
  
  public async Inser_data(table: string,columns: string,value: string,primaryid:string){
    console.log("Dbmngr function  ");
    let lastid = await this.dbManager.insert(table, columns, value,primaryid);
    console.log("Dbmngr return function  " + lastid );
    return lastid;
  } 

  //This method is for finding and paginating records
  public async findfieldpagi(field :string,table: string,where: string,limit:number,offset:number){
    let lastid = await this.dbManager.findfieldpagi(field,table,where,limit,offset);
    console.log("return in user db mngr");
    return lastid;
  }  

  public async Update_data(table: string,set: string,where: string){
    let lastid = await this.dbManager.update(table, set, where);
    return lastid;
  } 

  public async findfield(field :string,table: string,where: string){
    let lastid = await this.dbManager.findfield(field,table, where);
    console.log("return in user db mngr");
    return lastid;
  } 

  public async findcount(field :string,table: string,where: string){
    let lastid = await this.dbManager.findcount(field,table, where);
    console.log("return in db mngr");
    return lastid;
  } 
  public async sumfeild(field :string,table: string,where: string){
    let lastid = await this.dbManager.sumfeild(field,table, where);
    console.log("return in db mngr");
    return lastid;
  } 

  
}
