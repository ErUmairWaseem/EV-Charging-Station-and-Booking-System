import { injectable } from "inversify";
import { pg, Client } from "pg";
import { UserLogin } from "./model/userlogin";

const DatabaseConn = "postgres://postgres:Cdac23@localhost:5432/evproject";
                 

@injectable()
export class DbManager {
  public db: pg;

  public async connect() {
    this.db = new Client(DatabaseConn);

    // this.db.connect();
    this.db.connect(err => {
      if (err) {
        console.error('connection error', err.stack)
      } else {
        console.log('connected....')
      }
    })
  }
 public async insert(table: string,columns: string,value: string,id: string) 
  {
    console.log(
      " Dbmgr  "
    );
    console.log(
      "insert into " + table + "(" + columns + ") values(" + value + ") returning "+id
    );
    let lastid = await this.db.query(
      "insert into " + table + "(" + columns + ") values(" + value + ") returning "+id
    );
    console.log(
      " Dbmgr return " +lastid
    );
    return lastid;
  }
  public async login_user(username: string, password: string): Promise<UserLogin>  {
    console.log("select us.password,al.action_name from user_details us left join  actions_allowed aa on us.usertype = aa.typeid left join action_list al on al.actionid = aa.actionid where username='" + username + "' and password ='"+ password +"'");
    
    let result = await this.db.query(      
      "select us.password,al.action_name from user_details us left join  actions_allowed aa on us.usertype = aa.typeid left join action_list al on al.actionid = aa.actionid where username='" + username + "'"
    );   
    console.log("result11", result);
    return result;
  }  


 public async findfieldpagi(field, table, where,limit,offset) {

    console.log("select" + field + " from " + table + where +" OFFSET "+offset+" LIMIT "+limit);
    //SELECT * FROM users WHERE fname LIKE 'soham%'
    let result = await this.db.query(
      "select" + field + " from " + table + where+" OFFSET "+offset+" LIMIT "+limit
    );
    console.log("in db manager");
    return result;
  }

  
 

  public async findrecords(table, where) {
    console.log("findrecords select * from  " + table + where);
    let result = await this.db.query("select * from " + table + where);
    return result;
  }
public async login(email: string, password: string): Promise<UserLogin> {
  console.log("select parent_id  from parent where emailid='" +
    email +
    "' and password='" +
    password +
    "'");
    let result = await this.db.query(
      "select parent_id  from parent where emailid='" +
        email +
        "' and password='" +
        password +
        "'"
    );
    return result;
  }
  public async getAll_records(table) {
    console.log("select * from  " + table);
    let result = await this.db.query("select * from "+table);
    console.log(result)
    return result;
  }

  public async findfield(field, table, where) {

    console.log("select" + field + " from " + table + where);
    
    let result = await this.db.query(
      "select" + field + " from " + table + where
    );
    console.log("in db manager");
    return result;
  }

  public async findcount(field, table, where) {

    console.log("select count" + field + " from " + table + where);
    
    let result = await this.db.query(
      "select" + field + " from " + table + where + ""
    );

    return result;
  }
  public async sumfeild(field, table, where) {

    console.log("select SUM" + field + " from " + table + where);
    
    let result = await this.db.query(
      "select SUM" + field + " from " + table + where + ""
    );

    return result;
  }

  
  public async allcount(table) {

    console.log("select count(*) from " + table);
    
    let result = await this.db.query(
      "select count(*) from " + table 
    );

    return result;
  }

  
  public async update(table: string, set: string, where: string) {
    console.log("update " + table + " set " + set + " where " + where);
    let id = await this.db.query(
      "update " + table + " set " + set + " where " + where + ""
    );
    return id;
  }
  
  public async delete(table: string, where: string) {
    console.log("delete from " + table + " where " + where);
    let res = await this.db.query("delete from " + table + " where " + where);
    return res;
  }
  public async view_user_records1(columns, table1, table2, on, where) {
    console.log("no");
    console.log(
      "select " +
        columns +
        " from " +
        table1 +
        " inner join " +
        table2 +
        " on " +
        on +
        " inner join " +
        " where " +
        where
    );
    let result = await this.db.query(
      "select " +
        columns +
        " from " +
        table1 +
        " inner join " +
        table2 +
        " on " +
        on +
        " inner join " +
        " where " +
        where
    );
    console.log(result);
    return result;
  }

  public async view_user_records(
    columns,
    table1,
    table2,
    on,
    table3,
    on1,
    where
  ) {
    console.log("no");
    console.log(
      "select " +
        columns +
        " from " +
        table1 +
        " inner join " +
        table2 +
        " on " +
        on +
        " inner join " +
        table3 +
        " on " +
        on1 +
        " where " +
        where
    );
    let result = await this.db.query(
      "select " +
        columns +
        " from " +
        table1 +
        " inner join " +
        table2 +
        " on " +
        on +
        " inner join " +
        table3 +
        " on " +
        on1 +
        " where " +
        where
    );
    console.log(result);
    return result;
  }
  
}
