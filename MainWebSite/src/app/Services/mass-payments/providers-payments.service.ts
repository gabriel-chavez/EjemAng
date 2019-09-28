import { Injectable } from '@angular/core';
import { MassivePaymentsPreviousFormResult } from './Models/massive-payments-previous-form-result';
import { Http } from '@angular/http';
import { AppConfig } from '../../app.config';
import { JwtService } from '../../Jwt/jwt.service';
import { Observable } from 'rxjs/Observable';
import { ProvidersPaymentsSpreadsheetsResult } from './Models/providers-payments/providers-payments-spreadsheets-result';
import { ProcessBatchResult } from '../shared/models/process-batch-result';
import { ProvidersPaymentData } from './Models/providers-payments/providers-payment-data';
import { AccountProviderDto } from './Models/account-provider-dto';
import { AccountClientResult } from './Models/account-client-result';

@Injectable()
export class ProvidersPaymentsService {

  private _providersPayment = this.config.getConfig('ProvidersPaymentsServiceUrl');

  constructor(private http: Http, private config: AppConfig, private jwt: JwtService) { }

  getPreviousForm(): Observable<MassivePaymentsPreviousFormResult[]> {
    const { http, _providersPayment } = this;
    return this.jwt.post(`${_providersPayment}GetPreviousForm`, '');
  }

  getForms(request): Observable<ProvidersPaymentsSpreadsheetsResult[]> {
    const { http, _providersPayment } = this;
    return this.jwt.post(`${_providersPayment}GetForm`, request);
  }

  save(request: ProvidersPaymentData): Observable<ProcessBatchResult> {
    const { http, _providersPayment } = this;
    return this.jwt.post(`${_providersPayment}SaveProvidersPayment`, request);
  }

  verificationAccount(request: AccountProviderDto[]): Observable<AccountClientResult[]> {
    const { http, _providersPayment } = this;
    return this.jwt.post(`${_providersPayment}VerifyAccount`, request);
  }

  chargeForm(request): Observable<ProvidersPaymentsSpreadsheetsResult[]> {
    const { http, _providersPayment } = this;
    return this.jwt.postFile(`${_providersPayment}LoadPayRoll`, request);
  }
  getDetail(request): Observable<ProvidersPaymentData> {
    const { http, _providersPayment } = this;
    return this.jwt.post(`${_providersPayment}GetDetail`, request);
  }
}