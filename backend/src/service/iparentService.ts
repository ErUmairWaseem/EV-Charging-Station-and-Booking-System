import { UserLogin } from "src/db/model/userlogin";

export interface IParentService {
    User_Login(username: string,password: string): Promise<UserLogin>;
    Insert_data(table: string, col: string, val: string, primaryid: string);
    Update_data(table:string,set: string,where:string);
    get_data(table:string);
    allcount(table:string);
    findrecords(table:string,where:string);
    findfieldpagi(field, table, where,limit,offset);
    delete_data(table:string,where:string);
    findfield(field, table, where);
    findcount(field, table, where);
    sumfeild(field, table, where);

    loginuser(email: string, password: string): Promise<UserLogin>;
}
