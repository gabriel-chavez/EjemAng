import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { JwtService } from '../../Jwt/jwt.service';
import { AppConfig } from '../../app.config';
import { Http } from '@angular/http';
import { MassivePaymentsPreviousFormResult } from './Models/massive-payments-previous-form-result';
import { PaymentOddAchSpreadsheetResult } from './Models/payment-odd-ach/payment-odd-ach-spreadsheet-result';
import { ProcessBatchResult } from '../shared/models/process-batch-result';
import { PaymentOddAchData } from './Models/payment-odd-ach/payment-odd-ach-data';

@Injectable()
export class PaymentOddAchService {

  private _paymentOddAch = this.config.getConfig('PaymentOddAchUrl');

  constructor(private http: Http, private config: AppConfig,
    private jwt: JwtService) { }

    getPreviousForm(): Observable<MassivePaymentsPreviousFormResult[]> {
      const { http, _paymentOddAch } = this;
      return this.jwt.post(`${_paymentOddAch}GetPreviousForm`, '');
    }
    getForms(request): Observable<PaymentOddAchSpreadsheetResult[]> {
      const { http, _paymentOddAch } = this;
      return this.jwt.post(`${_paymentOddAch}GetForm`, request);
    }
    save(request: PaymentOddAchData): Observable<ProcessBatchResult> {
      const { http, _paymentOddAch } = this;
      return this.jwt.post(`${_paymentOddAch}SavePaymenOddAch`, request);
    }
    chargeForm(request): Observable<PaymentOddAchSpreadsheetResult[]> {
      const { http, _paymentOddAch } = this;
      return this.jwt.postFile(`${_paymentOddAch}LoadPayRoll`, request);
    }
    getDetail(request): Observable<PaymentOddAchData> {
      const { http, _paymentOddAch } = this;
      return this.jwt.post(`${_paymentOddAch}GetDetail`, request);
    }
}
