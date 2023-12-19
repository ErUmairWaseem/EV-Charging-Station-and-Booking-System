import { Response } from '../types/reponse';
import { Request } from 'express';

import * as uuidv4 from 'uuid/v4';
import * as fs from 'fs';
import * as crypto from 'crypto';
import * as ejs from 'ejs';
import * as path from 'path';



export class CommonUtils {

   
    public static isEmpty(array: Array<any>): boolean {
        return (!array || array.length === 0);
    }

    
    public static isSuccess(response: Response<any>): boolean {
        return (response.success && response.data);
    }

   
    public static isPublicRoute(req: Request, publicRoutes: string[]): boolean {
        if (!CommonUtils.isEmpty(publicRoutes)) {
            for (const publicRoute of publicRoutes) {
                if (CommonUtils.matchRouteWithPattern(req.path, publicRoute)) {
                    return true;
                }
            }
        }
        return false;
    }

    
    private static matchRouteWithPattern(route: string, pattern: string): boolean {
        let isMatch = false;
        if (pattern.includes('*')) {
            const delimiter = '/';
            const routes = route.split(delimiter);
            const patterns = pattern.split(delimiter);
            if (routes.length < patterns.length) {
                isMatch = false;
            } else {
                const length = patterns.length;
                isMatch = true;
                for (let i = 0; i < length; i++) {
                    if (routes[i] !== patterns[i] && patterns[i] !== '*') {
                        isMatch = false;
                        break;
                    }
                }
            }
        } else {
            isMatch = route === pattern;
        }

        return isMatch;
    }

   
    public static generateUniqueID(): string {
        return uuidv4();
    }

   
    public static generateMD5Checksum(filePath: string): Promise<string> {
        return new Promise<string>(function (resolve, reject) {
            if (fs.existsSync(filePath)) {
                let md5Hash = crypto.createHash('md5');
                let stream = fs.createReadStream(filePath);

                stream.on('data', function (data) {
                    md5Hash.update(data);
                });

                stream.on('end', function () {
                    let hash = md5Hash.digest('base64');
                    resolve(hash);
                });

            } else {
                reject('error');
            }
        });

    }

    public static getHtmlFromTemplate(template: string, data: any): string {
        const templatePath = path.join(__dirname, `/../views/${template}.ejs`);
        const templateString = fs.readFileSync(templatePath, 'utf-8');
        const html = ejs.render(templateString, data);
        return html;
    }

    
    public static postgressDateFormat(): String {
        let d = new Date();
           let gdate = d.getDate();
           let gmon = d.getMonth() + 1;
           let gyr = d.getFullYear();
           let gh = d.getHours();
           let gm = d.getMinutes();
           let gsec = d.getSeconds();
   
           let fulldate =
             gyr + "-" + gmon + "-" + gdate + " " + gh + ":" + gm + ":" + gsec;
   
          
        return fulldate;
    }

    public static days_between(firstDate, secondDate) {

     let diffInMilliSeconds = Math.abs(firstDate - secondDate) / 1000;

    // calculate days
    const days = Math.floor(diffInMilliSeconds / 86400);
    diffInMilliSeconds -= days * 86400;
    console.log('calculated days', days);

    // calculate hours
    const hours = Math.floor(diffInMilliSeconds / 3600) % 24;
    diffInMilliSeconds -= hours * 3600;
    console.log('calculated hours', hours);

    // calculate minutes
    const minutes = Math.floor(diffInMilliSeconds / 60) % 60;
    diffInMilliSeconds -= minutes * 60;
    console.log('minutes', minutes);

    let difference = '';
        if (days > 0) {
            difference = (days === 1) ? `${days} day, ` : `${days} days ago, `;
        } else if (hours !== 0) {
            difference = (hours === 0 || hours === 1) ? `${hours} hour ago, ` : `${hours} hours ago, `;
        } else {
            difference = (minutes !== 0) ? `${minutes} minutes ago` : `${minutes} minutes ago`;
        }
    return difference;
  
    }
}
