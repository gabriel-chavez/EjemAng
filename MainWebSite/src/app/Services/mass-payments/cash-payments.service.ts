import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { JwtService } from '../../Jwt/jwt.service';
import { AppConfig } from '../../app.config';
import { MassivePaymentsPreviousFormResult } from './Models/massive-payments-previous-form-result';
import { ProcessBatchResult } from '../shared/models/process-batch-result';
import { CashPaymentsSpreadsheetsResult } from './Models/cash-payments/cash-payments-spreadsheets-result';
import { CashPaymentData } from './Models/cash-payments/cash-payment-data';


@Injectable()
export class CashPaymentsService {
  private _cashPayment = this.config.getConfig('CashPaymentServiceUrl');

  constructor(private http: Http, private config: AppConfig, private jwt: JwtService) { }

  getPreviousForm(): Observable<MassivePaymentsPreviousFormResult[]> {
    const { http, _cashPayment } = this;
    return this.jwt.post(`${_cashPayment}GetForm`, '');
  }

  getForms(request): Observable<CashPaymentsSpreadsheetsResult[]> {
    const { http, _cashPayment } = this;
    return this.jwt.post(`${_cashPayment}GetPreviousForm`, request);
  }

  save(request: CashPaymentData): Observable<ProcessBatchResult> {
    const { http, _cashPayment } = this;
    return this.jwt.post(`${_cashPayment}SaveCashPayment`, request);
  }

  chargeForm(request): Observable<CashPaymentsSpreadsheetsResult[]> {
    const { http, _cashPayment } = this;
    return this.jwt.postFile(`${_cashPayment}LoadPayRoll`, request);
  }

  getDetail(request): Observable<CashPaymentData> {
    const { http, _cashPayment } = this;
    return this.jwt.post(`${_cashPayment}GetDetail`, request);
  }
}
