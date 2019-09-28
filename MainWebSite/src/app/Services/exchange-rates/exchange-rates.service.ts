import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { JwtService } from '../../Jwt/jwt.service';
import { AppConfig } from '../../app.config';
import { ChangedAmount } from './models/changed-amount';
import { ExchangeRatesResponse } from './models/exchange-rates-response';

@Injectable()
export class ExchangeRatesService {

  private _exchangeRates = this.config.getConfig('ExchangeRatesServiceUrl');
  constructor(private http: Http, private config: AppConfig, private jwt: JwtService) { }

  getLastOne(): Observable<ExchangeRatesResponse> {
    const { http, _exchangeRates } = this;
    return this.jwt.post(`${_exchangeRates}GetLastOne`, '');
  }
}
