import { Injectable } from '@angular/core';
import { AuthenticationService } from '../Services/users/auth.service';
import { GlobalService } from '../Services/shared/global.service';
import { Http, RequestOptionsArgs, Response, XHRBackend } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/operator/catch';

import { JwtRequestOptions, JwtRequestOptionsFile } from './jwt.options';

@Injectable()
export class JwtService extends Http {
    public token: string;
    private headers: any;
    public antiCsrfToken: string;
    public responseType: any;
    public url: any;
    private filesTypesList = [
        { value: 'application/pdf' },
        { value: 'application/vnd.ms-excel' },
        { value: 'application/txt' },
        { value: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' },
        { value: 'application/file' },
        { value: 'application/zip' }
    ];
    constructor(
        backend: XHRBackend,
        defaultOptions: JwtRequestOptions,
        private authenticationService: AuthenticationService,
        private globalService: GlobalService) {
        super(backend, defaultOptions);
        const user = JSON.parse(sessionStorage.getItem('userActual'));
        if (user) {
            this.token = user.token;
        }
        this.antiCsrfToken = undefined;
    }

    // HttpService
    get(url: string, options?: RequestOptionsArgs): Observable<any> {
        if (this.IsTokenExpired()) {
            return this.authenticationService.refreshToken().catch((error: any) => {
                console.log('errorcatch', error);
                this.authenticationService.logout();
                return Observable.throw(new Error(error.status));
            }).flatMap(() => this.get(url, options));
        }

        options = this.requestOptions(options);
        if (this.antiCsrfToken !== undefined) {
            options.headers.append('X-CSRFToken', this.antiCsrfToken);
        }

        console.log(this.getFullUrl(url));
        this.globalService.showLoader(true);
        return super.get(this.getFullUrl(url), options)
            .do((res: Response) => {
                if (res.headers.get('csrftoken') !== undefined) {
                    this.antiCsrfToken = res.headers.get('csrftoken');
                }
            }, (error: any) => {
                this.globalService.danger('Error', 'Mostrar error aqui', false, false);
                if (error.headers.get('csrftoken') !== undefined) {
                    this.antiCsrfToken = error.headers.get('csrftoken');
                }
            })
            .finally(() => {
                this.globalService.showLoader(false);
            });
    }

    post(url: string, body: any, options?: RequestOptionsArgs): Observable<any> {
        if (this.IsTokenExpired()) {
            return this.authenticationService.refreshToken().catch((error: any) => {
                this.authenticationService.logout();
                return Observable.throw(new Error(error.status));
            }).flatMap(() => this.post(url, body, options));
        }
        options = this.requestOptions(options);
        if (this.antiCsrfToken !== undefined) {
            options.headers.append('X-CSRFToken', this.antiCsrfToken);
        }
        this.globalService.showLoader(true);
        return super.post(this.getFullUrl(url), body, options)
            .do((res: Response) => {
                if (res.headers.get('csrftoken') !== undefined) {
                    this.antiCsrfToken = res.headers.get('csrftoken');
                }
            }, (error: any) => {
                if (error.headers.get('csrftoken') !== undefined) {
                    this.antiCsrfToken = error.headers.get('csrftoken');
                }
            })
            .finally(() => {
                this.globalService.showLoader(false);
            })
            // .timeout(3000)
            .map(res => {
                const result = res.json();
                if (result.isOk) {
                    return result.body;
                }
                throw Observable.throw(new Error(result.message));
            }).catch((error: any) => {
                if (error.status === 401) {
                    this.authenticationService.logout();
                    return Observable.throw('Terminó el tiempo de la Sesion');
                }
                if (error.error) {
                    return Observable.throw(new Error(error.error.message));
                }
                if (error.status === 422) {
                    let msgResult = '';
                    const errors = error.json();
                    Object.keys(errors).forEach(function (key) {
                        msgResult = msgResult + `Campo:'${key}', Error':${errors[key]}'\n`;
                    });
                    return Observable.throw(new Error(msgResult));
                }
                console.log(error);
                return Observable.throw(new Error('No se puede acceder al servicio'));
            });
    }
    postFile(url: string, body: any, options?: RequestOptionsArgs): Observable<any> {
        if (this.IsTokenExpired()) {
            return this.authenticationService.refreshToken().catch((error: any) => {
                this.authenticationService.logout();
                return Observable.throw(new Error(error.status));
            }).flatMap(() => this.post(url, body, options));
        }
        options = new JwtRequestOptionsFile();
        if (this.antiCsrfToken !== undefined) {
            options.headers.append('X-CSRFToken', this.antiCsrfToken);
        }
        this.globalService.showLoader(true);
        return super.post(this.getFullUrl(url), body, options)
            .do((res: Response) => {
                if (res.headers.get('csrftoken') !== undefined) {
                    this.antiCsrfToken = res.headers.get('csrftoken');
                }
            }, (error: any) => {
                // this.globalService.danger('Error', 'Mostrar error aqui', false);
                if (error.headers.get('csrftoken') !== undefined) {
                    this.antiCsrfToken = error.headers.get('csrftoken');
                }
            })
            .finally(() => {
                this.globalService.showLoader(false);
            })
            .map(res => {
                const result = res.json();
                if (result.isOk) {
                    return result.body;
                }
                throw Observable.throw(new Error(result.message));
                // return Observable.throw();
            }).catch((error: any) => {
                if (error.error) {
                    return Observable.throw(new Error(error.error.message));
                }
                if (error.status === 422) {
                    let msgResult = '';
                    const errors = error.json();
                    Object.keys(errors).forEach(function (key) {
                        msgResult = msgResult + `Campo:'${key}', Error':${errors[key]}'\n`;
                    });
                    return Observable.throw(new Error(msgResult));
                }
                console.log(error);
                return Observable.throw(new Error('No se puede acceder al servicio'));
            });
    }

    postReport(url: string, body: any, options?: RequestOptionsArgs): Observable<any> {
        if (this.IsTokenExpired()) {
            return this.authenticationService.refreshToken().catch((error: any) => {
                this.authenticationService.logout();
                return Observable.throw(new Error(error.status));
            })
                .flatMap(() => this.post(url, body, options));
        }

        options = this.requestOptions(options);
        if (this.antiCsrfToken !== undefined) {
            options.headers.append('X-CSRFToken', this.antiCsrfToken);
        }
        this.globalService.showLoader(true);
        return super.post(this.getFullUrl(url), body, options)
            .do((res: Response) => {
                if (res.headers.get('csrftoken') !== undefined) {
                    this.antiCsrfToken = res.headers.get('csrftoken');
                }
            }, (error: any) => {
                // this.globalService.danger('Error', 'Mostrar error aqui', false);
                if (error.headers.get('csrftoken') !== undefined) {
                    this.antiCsrfToken = error.headers.get('csrftoken');
                }
            })
            .finally(() => {
                this.globalService.showLoader(false);
            })
            .map(res => {
                const result = res.json();
                for (let i = 0; i < this.filesTypesList.length; i++) {
                    if (result.type === this.filesTypesList[i].value) {
                        const report = new Blob([res.blob()], { type: result.type });
                        return report;
                    }
                }
                throw Observable.throw(new Error(result.message));
                // return Observable.throw();
            }).catch((error: any) => {
                if (error.error) {
                    return Observable.throw(new Error(error.error.message));
                }
                if (error.status === 422) {
                    let msgResult = '';
                    const errors = error.json();
                    Object.keys(errors).forEach(function (key) {
                        msgResult = msgResult + `Campo:'${key}', Error':${errors[key]}'\n`;
                    });
                    return Observable.throw(new Error(msgResult));
                }
                console.log(error);
                return Observable.throw(new Error('No se puede acceder al servicio'));
            });
    }

    put(url: string, body: any, options?: RequestOptionsArgs): Observable<any> {
        if (this.IsTokenExpired()) {
            return this.authenticationService.refreshToken().catch((error: any) => {
                this.authenticationService.logout();
                return Observable.throw(new Error(error.status));
            })
                .flatMap(() => this.put(url, body, options));
        }

        options = this.requestOptions(options);
        if (this.antiCsrfToken !== undefined) {
            options.headers.append('X-CSRFToken', this.antiCsrfToken);
        }

        this.globalService.showLoader(true);
        return super.put(this.getFullUrl(url), body, options)
            .do((res: Response) => {
                if (res.headers.get('csrftoken') !== undefined) {
                    this.antiCsrfToken = res.headers.get('csrftoken');
                }
            }, (error: any) => {
                this.globalService.danger('Error', 'Mostrar error aqui', false, false);
                if (error.headers.get('csrftoken') !== undefined) {
                    this.antiCsrfToken = error.headers.get('csrftoken');
                }
            })
            .finally(() => {
                this.globalService.showLoader(false);
            });
    }

    private getFullUrl(url: string): string {
        return url;
    }

    private IsTokenExpired(): boolean {
        const user = JSON.parse(sessionStorage.getItem('userActual'));
        if (!user || user == null) {
            this.authenticationService.logout();
        }
        if (!user.token) {
            return true;
        }
        this.token = user.token;
        const base64Url = this.token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        const data = JSON.parse(window.atob(base64));
        if ((Date.now() / 1000) > data.exp) {
            return false;
        }
        data.exp -= 240;
        return (Date.now() / 1000) > data.exp;
    }

    private requestOptions(options?: RequestOptionsArgs): RequestOptionsArgs {
        if (options == null) {
            options = new JwtRequestOptions();
        } else {
            this.responseType = options;
        }
        if (options.headers == null) {
            options = new JwtRequestOptions();
            options.responseType = 3;
        }
        return options;
    }

}
