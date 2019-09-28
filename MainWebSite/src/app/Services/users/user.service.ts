import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AppConfig } from '../../app.config';
import { JwtService } from '../../Jwt/jwt.service';
import { AuthenticationService } from '../users/auth.service';
import { User } from './models/user';
import { NewUserPassword } from './models/new-password-model';
import { ChangePasswordModel } from './models/change-password-model';
import { ValidatePinModel } from './models/validate-pin-model';
import { CurrentUser } from './models/current-user';

@Injectable()
export class UserService {
  private serviceAccountUrl = this.config.getConfig('AuthUrl') + 'api/Account/';
  private menu = 'config/menu.json';

  constructor(private _jwt: JwtService, private _http: Http,
    private authenticationService: AuthenticationService,
    private config: AppConfig) {
  }

  getUserInfo(id: string): Observable<Response> {
    return this._jwt.get(`${this.serviceAccountUrl}UserInfo` + '?id=' + id);
  }

  validatePin(validatePinModel: ValidatePinModel): Observable<Response> {
    return this._http.post(`${this.serviceAccountUrl}ValidatePin`, validatePinModel);
  }

  validateNewPassword(newPassword: NewUserPassword): Observable<Response> {
    return this._http.post(`${this.serviceAccountUrl}ValidateNewPassword`, newPassword);
  }

  createPassword(newPassword: NewUserPassword): Observable<Response> {
    return this._http.post(`${this.serviceAccountUrl}CreatePassword`, newPassword);
  }

  changePassword(changePasswd: ChangePasswordModel): Observable<Response> {
    return this._http.post(`${this.serviceAccountUrl}ChangePassword`, changePasswd);
  }

  getMenu(): Observable<Response> {
    const { _http, menu } = this;
    return _http.get(`${menu}`);
  }

  getUserToken(): CurrentUser {
    const user = JSON.parse(sessionStorage.getItem('userActual'));
    if (!user || user == null) {
      this.authenticationService.logout();
    }

    const token = user.token;
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    const data = JSON.parse(window.atob(base64));
    return data as CurrentUser;
  }

  getCaptcha(): Observable<Response> {
    const { _http, serviceAccountUrl } = this;
    return _http.post(`${serviceAccountUrl}GetCaptcha`, {});
  }
}
