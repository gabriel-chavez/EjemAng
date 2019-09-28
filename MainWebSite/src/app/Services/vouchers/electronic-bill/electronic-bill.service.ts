import { Injectable } from '@angular/core';
import { Headers, Http, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { JwtService } from '../../../Jwt/jwt.service';
import { AppConfig } from '../../../app.config';
import { HeaderBillDto } from './models/header-bill-dto';
import { HeaderBillResult } from './models/header-bill-result';

@Injectable()
export class ElectronicBillService {

  private _electronicBill = this.config.getConfig('ElectronicBillUrl');
  private headers = new Headers({ 'content-type': 'application/json' });

  constructor(private http: Http, private config: AppConfig, private jwt: JwtService) { }

  GetListBill(request: HeaderBillDto): Observable<HeaderBillResult[]> {
    const { http, _electronicBill } = this;
    return this.jwt.post(`${_electronicBill}GetListBill`, request);
  }

  GetDetailBill(request: HeaderBillDto): Observable<Blob> {
    const { http, _electronicBill } = this;
    return this.jwt.postReport(`${_electronicBill}GetDetailBill`, request, { responseType: ResponseContentType.Blob });
  }

  GetBillPerMonth(request: HeaderBillDto): Observable<Blob> {
    const { http, _electronicBill } = this;
    return this.jwt.postReport(`${_electronicBill}GetBillPerMonth`, request, { responseType: ResponseContentType.Blob });
  }

  GetListBillReport(request: HeaderBillDto): Observable<Blob> {
    const { http, _electronicBill } = this;
    return this.jwt.postReport(`${_electronicBill}GetListBillReport`, request, { responseType: ResponseContentType.Blob });
  }

}
