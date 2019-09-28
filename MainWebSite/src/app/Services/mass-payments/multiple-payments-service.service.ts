import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { JwtService } from '../../Jwt/jwt.service';
import { AppConfig } from '../../app.config';
import { MultiplePaymentsData } from './Models/multiple-payments/multiple-payments-data';
import { MassivePaymentsPreviousFormResult } from './Models/massive-payments-previous-form-result';
import { MultiplePaymentSpreadsheetsResult } from './Models/multiple-payments/multiple-payment-spreadsheets-result';
import { Constants } from '../shared/enums/constants';
import { MultiplePaymentsGetPreviousForm } from './Models/multiple-payments/multiple-payments-get-previous-form';
import { AccountClientDto } from './Models/account-client-dto';
import { AccountClientResult } from './Models/account-client-result';
import { AccountProviderDto } from './Models/account-provider-dto';
import { MultiplePaymentUpdateDto } from './Models/multiple-payments/multiple-payment-update-dto';
import { MultiplePaymentsUpdateResult } from './Models/multiple-payments/multiple-payment-update-result';

@Injectable()
export class MultiplePaymentsService {
  private _multiplePayment = this.config.getConfig('MultiplePaymentServiceUrl');

  constructor(private http: Http, private config: AppConfig, private jwt: JwtService) { }

  getForm(): Observable<MassivePaymentsPreviousFormResult> {
    const { http, _multiplePayment } = this;
    return this.jwt.post(`${_multiplePayment}GetForm`, '');
  }

  getFormPrevious(dto: MultiplePaymentsGetPreviousForm): Observable<MultiplePaymentSpreadsheetsResult[]> {
    const { http, _multiplePayment } = this;
    return this.jwt.post(`${_multiplePayment}GetPreviousForm`, dto);
  }

  save(dto: MultiplePaymentsData) {
    const { jwt, _multiplePayment } = this;
    return jwt.post(`${_multiplePayment}SaveMultiplePayment`, dto);
  }

  verifySalariesAccounts(dto: AccountClientDto[]): Observable<AccountClientResult[]> {
    const { jwt, _multiplePayment } = this;
    return jwt.post(`${_multiplePayment}VerifySalariesAccount`, dto);
  }

  verifyProvidersAccounts(dto: AccountProviderDto[]): Observable<AccountClientResult[]> {
    const { jwt, _multiplePayment } = this;
    return jwt.post(`${_multiplePayment}VerifyProvidersAccount`, dto);
  }

  chargeForm(dto): Observable<MultiplePaymentSpreadsheetsResult[]> {
    const { jwt, _multiplePayment } = this;
    return jwt.postFile(`${_multiplePayment}LoadPayRoll`, dto);
  }

  getDetail(dto): Observable<MultiplePaymentsData> {
    const { jwt, _multiplePayment } = this;
    return jwt.postFile(`${_multiplePayment}GetDetail`, dto);
  }

  updateMultiplePayments(dto: MultiplePaymentUpdateDto): Observable<MultiplePaymentsUpdateResult> {
    const { jwt, _multiplePayment } = this;
    return jwt.postFile(`${_multiplePayment}UpdateMultiplePayments`, dto);
  }

}
