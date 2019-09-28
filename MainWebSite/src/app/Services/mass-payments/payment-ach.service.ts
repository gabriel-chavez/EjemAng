import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { JwtService } from '../../Jwt/jwt.service';
import { AppConfig } from '../../app.config';
import { Http} from '@angular/http';
import { MassivePaymentsPreviousFormResult } from './Models/massive-payments-previous-form-result';
import { ProcessBatchResult } from '../shared/models/process-batch-result';
import { PaymentAchSpreadsheetResult } from './Models/payment-ach/payment-ach-spreadsheet-result';
import { PaymentAchData } from './Models/payment-ach/payment-ach-data';
import { AccountInfoAch } from './Models/payment-ach/account-info-ach';


@Injectable()
export class PaymentAchService {
  private _paymentBankAch = this.config.getConfig('PaymentAchUrl');

  constructor(private http: Http, private config: AppConfig, private jwt: JwtService) { }

  getPreviousForm(): Observable<MassivePaymentsPreviousFormResult[]> {
    const { http, _paymentBankAch } = this;
    return this.jwt.post(`${_paymentBankAch}GetPreviousForm`, '');
  }
  getForms(request): Observable<PaymentAchSpreadsheetResult[]> {
    const { http, _paymentBankAch } = this;
    return this.jwt.post(`${_paymentBankAch}GetForm`, request);
  }
  save(request: PaymentAchData): Observable<ProcessBatchResult> {
    const { http, _paymentBankAch } = this;
    return this.jwt.post(`${_paymentBankAch}SavePaymentBankACH`, request);
  }
  chargeForm(request): Observable<PaymentAchSpreadsheetResult[]> {
    const { http, _paymentBankAch } = this;
    return this.jwt.postFile(`${_paymentBankAch}LoadPayRoll`, request);
  }
  getDetail(request): Observable<PaymentAchData> {
    const { http, _paymentBankAch } = this;
    return this.jwt.post(`${_paymentBankAch}GetDetail`, request);
  }
  getAccountInfoAch(request): Observable<AccountInfoAch> {
    const { http, _paymentBankAch } = this;
    return this.jwt.post(`${_paymentBankAch}AccountInfoAch`, request);
  }
}
