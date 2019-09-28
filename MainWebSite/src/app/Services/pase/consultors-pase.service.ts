import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Headers, Http, Response, ResponseContentType } from '@angular/http';
import { JwtService } from '../../Jwt/jwt.service';
import 'rxjs';
import { AppConfig } from '../../app.config';
import { RequestModelPaseAccount } from './Models/Request-model-pase';
import { RequestModelPaseDetail } from './Models/Request-model-pase';
import { RequestModelHeadPase } from './Models/Request-model-pase';
import { ResponseModelDate } from './Models/response-model-date';
import { ResponseModelPaseHead } from './Models/ResponseModelPaseHead';
import { ResponseModelPaseDetail } from './Models/ResponseModelPaseDetail';
import { ResponseModelPaseAccount } from './Models/response-model-pase';
import { RequestModelReportsPase } from './Models/Request-model-pase';

@Injectable()
export class ConsultorsPaseService {
  private _UrlPase = this.config.getConfig('PaseUrl');

  constructor(
    private http: Http,
    private config: AppConfig,
    private jwt: JwtService
  ) { }

  getAccountRoles(request: RequestModelPaseAccount): Observable<ResponseModelPaseAccount[]> {
    const { http, _UrlPase } = this;
    return this.jwt.post(
      `${_UrlPase}GetAccountRol`, request);
  }

  getDetailPase(request: RequestModelPaseDetail): Observable<ResponseModelPaseDetail[]> {
    const { http, _UrlPase } = this;
    return this.jwt.post(
      `${_UrlPase}GetBringOperationPase`, request);

  }
  getDetailHeadPase(request: RequestModelHeadPase): Observable<ResponseModelPaseHead[]> {
    const { http, _UrlPase } = this;
    return this.jwt.post(
      `${_UrlPase}GetBringOperationHeadPase`, request);
  }

  getMonth(): Observable<ResponseModelDate[]> {
    const { http, _UrlPase } = this;
    return this.jwt.post(
      `${_UrlPase}BringMonth`, '');
  }

  getReportsPase(request: RequestModelReportsPase): Observable<Blob> {
    const { http, _UrlPase } = this;
    return this.jwt.postReport(
      `${_UrlPase}GetReport`, request, { responseType: ResponseContentType.Blob });
  }

}
