import * as crypto from 'crypto';
import * as bcrypt from 'bcryptjs';


export class EncryptionUtil {

    public static signRequest(request: Request, privateKey: string, date: Date) {

        let jsonTypes = [
            'application/json',
            'application/json-patch+json',
            'application/vnd.api+json',
            'application/csp-report',
        ];

        let type = request.contentType;
        type = type.split(';')[0];

        // support parsing of json; otherwise, new string from request.body
        let body = (jsonTypes.indexOf(type) > -1 && request.body) ? JSON.stringify(request.body) : '';
        return crypto.createHmac('sha1', privateKey)
            .update(
                Buffer.from(request.method + '\n' +
                    (request.body ? crypto.createHash('md5').update(body, 'utf8').digest('hex') : '') + '\n' +
                    type + '\n' + date,
                    'utf-8')
            ).digest('base64');
    }

    public static encrypt(plainText: string, salt: string): string {
        return bcrypt.hashSync(plainText, salt);
    }

    public static generateSalt(length: number): string {
        return bcrypt.genSaltSync(length);
    }

    public static compare(plainText: string, encryptedText: string): boolean {
        return bcrypt.compareSync(plainText, encryptedText);
    }

}

export interface Request {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    contentType: string;
    body?: any;
}
