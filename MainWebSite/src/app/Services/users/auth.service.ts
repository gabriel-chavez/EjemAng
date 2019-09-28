
import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { URLSearchParams } from "@angular/http"
import { Router } from "@angular/router"
import { AppConfig } from '../../app.config';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import { Observable } from 'rxjs';

declare var Fingerprint2: any;

import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
    public token: string;

    constructor(private http: Http, private router: Router, private config: AppConfig) {
        // set token if saved in local storage
        const userActual = JSON.parse(sessionStorage.getItem('userActual'));
        this.token = userActual && userActual.token;
    }

    login(username: string, password: string, captcha: string, captchaToVerify: string): Observable<boolean> {
        //TODO configurar clientId y url
        const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        const options = new RequestOptions({ headers: headers });

        const body = new URLSearchParams();
        body.set('username', username);
        body.set('password', password);
        body.set('captchaValue', captcha);
        body.set('captchaValueToVerify', captchaToVerify);
        body.set('grant_type', 'password');
        body.set('client_id', this.config.getConfig('ClientId'));

        return this.http.post(this.config.getConfig('AuthUrl') + 'oauth2/token', body)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                const token = response.json() && response.json().access_token;
                const refreshToken = response.json() && response.json().refresh_token;

                if (token) {
                    // set token property
                    this.token = token;

                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    sessionStorage.setItem('userActual', JSON.stringify({ username: username, token: token, refreshToken: refreshToken }));

                    new Fingerprint2({ excludeCanvas: true, excludeWebGL: true, excludeJsFonts: true }).get(function (result, components) {
                        sessionStorage.setItem('fingerprint', JSON.stringify(components));

                    });

                    // return true to indicate successful login
                    return true;
                } else {
                    // return false to indicate failed login
                    return true;
                }
            });
    }

    logout(): void {
        // clear token remove user from local storage to log user out
        //console.log('desloguear');
        this.token = null;
        sessionStorage.removeItem('userActual');
        this.router.navigate(['/login']);
    }

    refreshToken(): Observable<boolean> {
        //TODO configurar clientId y url
        const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        const options = new RequestOptions({ headers: headers });
        const userActual = JSON.parse(sessionStorage.getItem('userActual'));

        const body = new URLSearchParams();

        body.set('refresh_token', userActual.refreshToken);
        body.set('grant_type', 'refresh_token');
        body.set('client_id', this.config.getConfig('ClientId'));
        //console.log('refresh', this.config.getConfig('AuthUrl') + 'oauth2/token', body, this.http, this.http.post(this.config.getConfig('AuthUrl') + 'oauth2/token', body));
        return this.http.post(this.config.getConfig('AuthUrl') + 'oauth2/token', body, options)
            .map((response: Response) => {
                console.log('response', response);
                // login successful if there's a jwt token in the response
                const token = response.json() && response.json().access_token;
                const refreshToken = response.json() && response.json().refresh_token;

                if (token) {
                    // set token property
                    this.token = token;

                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    sessionStorage.setItem('userActual', JSON.stringify({ username: userActual.username, token: token, refreshToken: refreshToken }));

                    new Fingerprint2({ excludeCanvas: true, excludeWebGL: true, excludeJsFonts: true }).get(function (result, components) {
                        sessionStorage.setItem('fingerprint', JSON.stringify(components));

                    });
                    // return true to indicate successful login
                    return true;
                } else {
                    // return false to indicate failed login
                    return false;
                }
            });//...errors if

    }
}
