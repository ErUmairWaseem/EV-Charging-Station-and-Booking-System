import { injectable } from "inversify";
import * as fs from 'fs';

@injectable()
export class ConfigParams {

    public mongoHost: string;
    public port:number;

    public read = () => {
        let fileContents = fs.readFileSync('Config.json', 'utf-8');
        let configObj = JSON.parse(fileContents);
        this.mongoHost=configObj.mongoHost;
        this.port=configObj.port;
    }

}