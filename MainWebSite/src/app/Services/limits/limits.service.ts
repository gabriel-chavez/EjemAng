import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { JwtService } from '../../Jwt/jwt.service';
import { AppConfig } from '../../app.config';
import { CompanyLimitsResult } from './models/company-limits-result';

@Injectable()
export class LimitsService {

  private _limits = this.config.getConfig('LimitsServiceUrl');
  constructor(private http: Http, private config: AppConfig, private jwt: JwtService) { }

  getCompanyLimits(): Observable<CompanyLimitsResult> {
    const { http, _limits } = this;
    return this.jwt.post(`${_limits}Get`, '');
  }

}