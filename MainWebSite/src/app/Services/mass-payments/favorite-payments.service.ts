import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { JwtService } from '../../Jwt/jwt.service';
import { AppConfig } from '../../app.config';
import { FavoritePaymentsData } from './Models/favorite-payments/favorite-payments-data';
import { MassivePaymentsPreviousFormResult } from './Models/massive-payments-previous-form-result';
import { ProcessBatchResult } from '../shared/models/process-batch-result';
import { FavoritePaymentsSpreadsheetsResult } from './Models/favorite-payments/favorite-payments-spreadsheets-result';
import { MassivePaymentsSpreadsheetsDto } from './Models/massive-payments-spreadsheets-dto';
import { AccountClientDto } from './Models/account-client-dto';
import { AccountClientResult } from './Models/account-client-result';
import { AccountProviderDto } from './Models/account-provider-dto';

@Injectable()
export class FavoritePaymentsService {
  private _favoritePayment = this.config.getConfig('FavoritePaymentServiceUrl');

  constructor(private http: Http, private config: AppConfig, private jwt: JwtService) { }

  getForm(): Observable<MassivePaymentsPreviousFormResult[]> {
    const { http, _favoritePayment } = this;
    return this.jwt.post(`${_favoritePayment}GetForm`, '');
  }

  getPreviousForm(request: MassivePaymentsSpreadsheetsDto): Observable<FavoritePaymentsSpreadsheetsResult[]> {
    const { http, _favoritePayment } = this;
    return this.jwt.post(`${_favoritePayment}GetPreviousFavoriteForm`, request);
  }

  getManualChargeForm(request: MassivePaymentsSpreadsheetsDto): Observable<FavoritePaymentsSpreadsheetsResult[]> {
    const { http, _favoritePayment } = this;
    return this.jwt.post(`${_favoritePayment}GetPreviousManualFavoriteForm`, request);
  }

  save(request: FavoritePaymentsData): Observable<ProcessBatchResult> {
    const { http, _favoritePayment } = this;
    return this.jwt.post(`${_favoritePayment}SaveFavoritePayment`, request);
  }

  saveConfiguration(request: FavoritePaymentsData): Observable<ProcessBatchResult> {
    const { http, _favoritePayment } = this;
    return this.jwt.post(`${_favoritePayment}SaveConfigurationFavoritePayment`, request);
  }

  chargeFormFavorite(request): Observable<FavoritePaymentsSpreadsheetsResult[]> {
    const { http, _favoritePayment } = this;
    return this.jwt.postFile(`${_favoritePayment}LoadMassPayRoll`, request);
  }

  chargeFormConfigurationFavorite(request): Observable<FavoritePaymentsSpreadsheetsResult[]> {
    const { http, _favoritePayment } = this;
    return this.jwt.postFile(`${_favoritePayment}LoadPayRoll`, request);
  }

  verifySalariesAccounts(request: AccountClientDto[]): Observable<AccountClientResult[]> {
    const { http, _favoritePayment } = this;
    return this.jwt.post(`${_favoritePayment}VerifySalariesAccount`, request);
  }

  verifyProvidersAccounts(request: AccountProviderDto[]): Observable<AccountClientResult[]> {
    const { http, _favoritePayment } = this;
    return this.jwt.post(`${_favoritePayment}VerifyProvidersAccount`, request);
  }

  getDetailMassFavorite(request): Observable<FavoritePaymentsData> {
    const { http, _favoritePayment } = this;
    return this.jwt.postFile(`${_favoritePayment}GetDetailMassFavorite`, request);
  }

  getDetailFavorite(request): Observable<FavoritePaymentsData> {
    const { http, _favoritePayment } = this;
    return this.jwt.postFile(`${_favoritePayment}GetDetailFavorite`, request);
  }
}
