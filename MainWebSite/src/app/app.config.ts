import { Inject, Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';

class EnvData {
    env: string;
}

@Injectable()
export class AppConfig {

    private config: any = null;
    private env: any = null;

    constructor(private http: Http) { }

    public getConfig(key: any) {
        return this.config[key];
    }

    public getEnv(key: any) {
        let res: any = this.config;
        key.split('.').forEach(k => res = res[k]);
        return res;
    }

    public load() {
        return new Promise((resolve, reject) => {
            this.http.get('config/config.json').map(res => res.json()).catch((error: any): any => {
                console.log('Configuration file "config.json" could not be read');
                console.log(error);
                resolve(true);
                return Observable.throw('Server error');
            }).subscribe((envResponse: EnvData) => {
                this.env = envResponse;
                let request: any = null;
                request = this.http.get('config/config.' + envResponse.env + '.json');
                if (request) {
                    request
                        .map(res => res.json())
                        .catch((error: any) => {
                            console.error('Error reading ' + envResponse.env + ' configuration file');
                            resolve(error);
                            return Observable.throw(error.json().error || 'Server error');
                        })
                        .subscribe((responseData: any) => {
                            this.config = responseData;
                            resolve(true);
                        });
                } else {
                    console.error('Env config file "env.json" is not valid');
                    resolve(true);
                }
            });
        });
    }
}
