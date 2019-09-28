import { BaseRequestOptions } from '@angular/http';
export class JwtRequestOptions extends BaseRequestOptions {
public token: string;
constructor (customOptions?: any) {
super();
        let user = JSON.parse(sessionStorage.getItem('userActual'));
        let fingerprint = sessionStorage.getItem('fingerprint');
        this.token = user && user.token;
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Authorization', 'Bearer ' + this.token );
        this.headers.append('Fingerprint', fingerprint);

    }
}
export class JwtRequestOptionsFile extends BaseRequestOptions {
    public token: string;
    constructor (customOptions?: any) {
    super();
            this.headers.delete('Content-Type');
            let user = JSON.parse(sessionStorage.getItem('userActual'));
            let fingerprint = sessionStorage.getItem('fingerprint');
            this.token = user && user.token;
            this.headers.append('Authorization', 'Bearer ' + this.token );
            this.headers.append('Fingerprint', fingerprint);
    }
}