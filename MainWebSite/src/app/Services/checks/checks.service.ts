import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { JwtService } from '../../Jwt/jwt.service';
import { AppConfig } from '../../app.config';
import { CheckDto } from './models/check-dto';
import { CheckListDto } from './models/check-list-dto';
import { CheckResult, CheckListResult } from './models/check-result';
import { ProcessResult } from './models/process-result';

@Injectable()
export class ChecksService {
  private checks = this.config.getConfig('ChecksServiceUrl');

  constructor(private http: Http, private config: AppConfig, private jwt: JwtService) { }

  getChecks(request: CheckListDto): Observable<CheckListResult> {
    const { http, checks } = this;
    return this.jwt.post(`${checks}GetChecks`, request);
  }

  getImage(request: CheckDto): Observable<CheckResult> {
    const { http, checks } = this;
    return this.jwt.post(`${checks}GetImage`, request);
  }

}
