import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { JwtService } from '../../Jwt/jwt.service';
import { AccountDto } from './models/account-dto';
import { AccountNumberDto } from './models/account-number-dto';
import { AppConfig } from '../../app.config';
import { AccountIdDto } from '../balances-and-movements/models/account-id-dto';
import { AccountResult } from '../balances-and-movements/models/account-result';
import { AccountOwnerResult } from './models/account-owner-result';
import { CompleteAccountResult } from './models/complete-account-result';

@Injectable()
export class AccountsService {

  private accounts = this.config.getConfig('AccountsServiceUrl');

  constructor(private http: Http, private config: AppConfig, private jwt: JwtService) { }

  getAccounts(accountRequest: AccountDto): Observable<AccountResult[]> {
    const { http, accounts } = this;
    return this.jwt.post(`${accounts}Get`, accountRequest);
  }

  getCompanyAccounts(accountRequest: AccountDto): Observable<AccountResult[]> {
    const { http, accounts } = this;
    return this.jwt.post(`${accounts}GetByCompany`, accountRequest);
  }

  getOwner(accountNumberRequest: AccountNumberDto): Observable<AccountOwnerResult> {
    const { http, accounts } = this;
    return this.jwt.post(`${accounts}GetOwner`, accountNumberRequest);
  }

  getById(accountIdRequest: AccountIdDto): Observable<CompleteAccountResult> {
    const { http, accounts } = this;
    return this.jwt.post(`${accounts}GetById`, accountIdRequest);
  }
}
