import Setting from "./setting";
import * as xml from "xml";
import * as xml2js from "xml2js";
import fetch from "node-fetch";

export default class Client {
    private setting: Setting;
    private readonly expires = new Date(Date.UTC(2037, 7, 12, 14, 45, 0));

    public constructor(setting: Setting) {
        this.setting = setting;
    }

    public post(path: string, action: string, parameters: Array<any>): Promise<Object> {
        const bodyObject = {};
        bodyObject[action] = [{'parameters': parameters}];
        const xmlObject = {
            'soap:Envelope': [
                {
                    '_attr': {'xmlns:soap': 'http://www.w3.org/2003/05/soap-envelope'}
                },
                {
                    'soap:Header': [
                        {'Action': action},
                        {
                            'Security': [{
                                'UsernameToken': [
                                    {'Username': this.setting.username},
                                    {'Password': this.setting.password}
                                ]
                            }]
                        },
                        {
                            'Timestamp': [
                                {'Created': this.toISOString(new Date())},
                                {'Expires': this.toISOString(this.expires)}
                            ]
                        },
                        {
                            'Locale': this.setting.locale
                        }
                    ]
                },
                {
                    'soap:Body': [bodyObject]
                }
            ]
        };
        const xmlString = xml(xmlObject, {declaration: true});
        return fetch(this.setting.baseUrl + path, {
            method: 'POST',
            body: xmlString,
            headers: {
                'Content-Type': 'text/xml; charset=UTF-8'
            },
            // compress: true causes "incorrect header check" error on cybozu.com
            // https://github.com/bitinn/node-fetch/issues/45
            compress: false
        }).then(res => {
            if (res.ok) {
                return res.text();
            } else {
                return Promise.reject(new Error(res.statusText));
            }
        }).then(text => {
            return new Promise((resolve, reject) => {
                xml2js.parseString(text, {
                    trim: true
                }, (err, data) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(data);
                });
            });
        }).then(data => {
            return data['soap:Envelope']['soap:Body'];
        });
    }

    private pad(number: number): string {
        let str = String(number);
        if (str.length === 1) {
            str = '0' + str;
        }
        return str;
    }

    private toISOString(date: Date): string {
        const year = date.getUTCFullYear();
        const month = this.pad(date.getUTCMonth() + 1);
        const day = this.pad(date.getUTCDate());
        const hour = this.pad(date.getUTCHours());
        const minute = this.pad(date.getUTCMinutes());
        const second = this.pad(date.getUTCSeconds());
        return `${year}-${month}-${day}T${hour}:${minute}:${second}Z`;
    }
}
