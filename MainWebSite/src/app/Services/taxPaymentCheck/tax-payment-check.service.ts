import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { JwtService } from '../../Jwt/jwt.service';
import { AppConfig } from '../../app.config';
import { PaymentTaxCheckPreviousFormResponse } from './models/payment-tax-check-previous-form-response';
import { PaymentTaxCheckSpreadsheetsResponse } from './models/payment-tax-check-spreadsheets-response';
import { PaymentTaxCheckData } from './models/payment-tax-check-data';
import { ProcessBatchResult } from '../shared/models/process-batch-result';

@Injectable()
export class TaxPaymentCheckService {
private PaymentTaxCheckUrl = this.config.getConfig('PaymentTaxCheckUrl');
  constructor(private http: Http, private config: AppConfig, private jwt: JwtService) { }

  getPreviousForm(): Observable<PaymentTaxCheckPreviousFormResponse[]> {
    const { http, PaymentTaxCheckUrl } = this;
    return this.jwt.post(`${PaymentTaxCheckUrl}GetPreviousForm`, '');
  }
  getForms(request): Observable<PaymentTaxCheckSpreadsheetsResponse[]> {
    const { http, PaymentTaxCheckUrl } = this;
    return this.jwt.post(`${PaymentTaxCheckUrl}GetForm`, request);
  }
  save(request: PaymentTaxCheckData): Observable<ProcessBatchResult> {
    const { http, PaymentTaxCheckUrl } = this;
    return this.jwt.post(`${PaymentTaxCheckUrl}SavePaymentTaxCheck`, request);
  }
  chargeForm(request): Observable<PaymentTaxCheckSpreadsheetsResponse[]> {
    const { http, PaymentTaxCheckUrl } = this;
    return this.jwt.postFile(`${PaymentTaxCheckUrl}LoadPayRoll`, request);
  }
  getDetail(request): Observable<PaymentTaxCheckData> {
    const { http, PaymentTaxCheckUrl } = this;
    return this.jwt.post(`${PaymentTaxCheckUrl}GetDetail`, request);
  }

  // getPaymentTaxChecks(informationPaymentTaxCheckResponseModel: DetailPayment[]): Observable<Response> {
  //   const { http, PaymentTaxCheckUrl} = this;
  //   return http.post(`${PaymentTaxCheckUrl}GetPaymentTaxChecks`, informationPaymentTaxCheckResponseModel);
  // }
}
