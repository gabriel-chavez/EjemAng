import { Injectable } from '@angular/core';
import { MassivePaymentsPreviousFormResult } from './Models/massive-payments-previous-form-result';
import { SalariesPaymentData } from './Models/salaries-payments/salaries-payment-data';
import { ProcessBatchResult } from '../shared/models/process-batch-result';
import { SalariesPaymentsSpreadsheetsResult } from './Models/salaries-payments/salaries-payments-spreadsheets-result';
import { Observable } from 'rxjs/Observable';
import { JwtService } from '../../Jwt/jwt.service';
import { AppConfig } from '../../app.config';
import { Http } from '@angular/http';
import { AccountClientDto } from './Models/account-client-dto';
import { AccountClientResult } from './Models/account-client-result';

@Injectable()
export class SalariesPaymentsService {
  private _salariesPayment = this.config.getConfig('SalariesPaymentServiceUrl');

  constructor(private http: Http, private config: AppConfig, private jwt: JwtService) { }

  getPreviousForm(): Observable<MassivePaymentsPreviousFormResult[]> {
    const { http, _salariesPayment } = this;
    return this.jwt.post(`${_salariesPayment}GetPreviousForm`, '');
  }

  getForms(request): Observable<SalariesPaymentsSpreadsheetsResult[]> {
    const { http, _salariesPayment } = this;
    return this.jwt.post(`${_salariesPayment}GetForm`, request);
  }

  save(request: SalariesPaymentData): Observable<ProcessBatchResult> {
    const { http, _salariesPayment } = this;
    return this.jwt.post(`${_salariesPayment}SaveSalariesPayment`, request);
  }

  verificationAccount(request: AccountClientDto[]): Observable<AccountClientResult[]> {
    const { http, _salariesPayment } = this;
    return this.jwt.post(`${_salariesPayment}VerifyAccount`, request);
  }

  chargeForm(request): Observable<SalariesPaymentsSpreadsheetsResult[]> {
    const { http, _salariesPayment } = this;
    return this.jwt.postFile(`${_salariesPayment}LoadPayRoll`, request);
  }

  getDetail(request): Observable<SalariesPaymentData> {
    const { http, _salariesPayment } = this;
    return this.jwt.post(`${_salariesPayment}GetDetail`, request);
  }
}
