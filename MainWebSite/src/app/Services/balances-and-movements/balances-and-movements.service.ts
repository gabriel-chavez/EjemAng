import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { JwtService } from '../../Jwt/jwt.service';
import { BalancesDto } from './models/balances-dto';
import { AccountIdDto } from './models/account-id-dto';
import { AppConfig } from '../../app.config';
import { AccountResult } from './models/account-result';
import { AccountBalancesResult } from './models/account-balances-result';
import { MovementsResult } from './models/movements-result';

@Injectable()
export class BalancesAndMovementsService {

  private _balancesAndMovements = this.config.getConfig('BalancesAndMovementsServiceUrl');

  constructor(private http: Http, private config: AppConfig, private jwt: JwtService) { }

  getAccountBalancesById(request: AccountIdDto): Observable<AccountResult> {
    const { http, _balancesAndMovements } = this;
    return this.jwt.post(`${_balancesAndMovements}GetBalancesById`, request);
  }

  getBalances(request: BalancesDto): Observable<AccountBalancesResult> {
    const { http, _balancesAndMovements } = this;
    return this.jwt.post(`${_balancesAndMovements}GetBalances`, request);
  }

  getMovements(request: AccountIdDto): Observable<MovementsResult> {
    const { http, _balancesAndMovements } = this;
    return this.jwt.post(`${_balancesAndMovements}GetMovements`, request);
  }

}
