import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AppConfig } from '../../app.config';

import { VerificationCaptchaModel } from './models/verification-captcha-model';
@Injectable()
export class CaptchaService {

  private serviceCaptchaUrl = this.config.getConfig('ServiceCaptchaUrl');

  constructor(private http: Http, private config: AppConfig) {
  }

  getCaptcha(): Observable<Response> {
    const { http, serviceCaptchaUrl } = this;
    return http.get(`${serviceCaptchaUrl}`);
  }

  verifyCaptcha(verificationCaptchaModel: VerificationCaptchaModel): Observable<Response> {
    const { http, serviceCaptchaUrl } = this;
    return http.post(`${serviceCaptchaUrl}`, verificationCaptchaModel);
  }
}
