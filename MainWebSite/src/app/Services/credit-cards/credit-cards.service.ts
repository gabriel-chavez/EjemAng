import { AppConfig } from '../../app.config';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, ResponseContentType } from '@angular/http';
import { JwtService } from '../../Jwt/jwt.service';
import { CreditCardsAccountByIdDto } from './models/credit-cards-by-id-dto';
import { AccountDto } from '../accounts/models/account-dto';
import { CreditCardsMovementsDto } from './models/credit-cards-movements-dto';
import { CreditCardsAccountResult } from './models/credit-cards-account-result';
import { CreditCardsMovementsResult } from './models/credit-cards-movements-result';


@Injectable()
export class CreditCardsService {
  private _creditCardsUrl = this.config.getConfig('CreditCardsServiceUrl');
  private headers = new Headers({ 'content-type': 'application/json' });

  constructor(private http: Http, private config: AppConfig, private jwt: JwtService) { }
  getAccountsCreditCards(dto: AccountDto): Observable<CreditCardsAccountResult[]> {
    const { http, _creditCardsUrl } = this;
    return this.jwt.post(`${_creditCardsUrl}GetAccounts`, dto);
  }

  getAccountsCreditCardsById(dto: CreditCardsAccountByIdDto): Observable<CreditCardsAccountResult> {
    const { http, _creditCardsUrl } = this;
    return this.jwt.post(`${_creditCardsUrl}GetAccountsById`, dto);
  }

  getMovementsCreditCards(dto: CreditCardsMovementsDto): Observable<CreditCardsMovementsResult[]> {
    const { http, _creditCardsUrl } = this;
    return this.jwt.post(`${_creditCardsUrl}GetMovements`, dto);
  }

  getReportMovements(dto: CreditCardsMovementsDto): Observable<Blob> {
    const { http, _creditCardsUrl } = this;
    return this.jwt.postReport(`${_creditCardsUrl}GetReport`, dto, { responseType: ResponseContentType.Blob });
  }
}
