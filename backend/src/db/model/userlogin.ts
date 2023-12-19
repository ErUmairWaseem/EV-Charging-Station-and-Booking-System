import { BaseModel } from "./baseModel";

export class UserLogin extends BaseModel {
  email: string;
  password: string;
}
