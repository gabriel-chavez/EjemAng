import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { JwtService } from '../../Jwt/jwt.service';
import { AppConfig } from '../../app.config';
import { BanksResult } from '../mass-payments/Models/banks-result';
import { BranchOfficeResult } from '../mass-payments/Models/branch-office-result';
import { MonthsQuantityDto } from './models/months-quantity-dto';
import { MonthsResult } from './models/months-result';
import { ParameterDto } from './models/parameter-dto';
import { ParameterResult } from './models/parameter-result';

@Injectable()
export class ParametersService {

  private _parameters = this.config.getConfig('ParametersServiceUrl');

  constructor(private http: Http, private config: AppConfig, private jwt: JwtService) { }

  getByGroupAndCode(dto: ParameterDto): Observable<ParameterResult> {
    const { http, _parameters } = this;
    return this.jwt.post(`${_parameters}GetByGroupAndCode`, dto);
  }

  getByGroup(dto: ParameterDto): Observable<ParameterResult[]> {
    const { http, _parameters } = this;
    return this.jwt.post(`${_parameters}GetByGroup`, dto);
  }

  getBranchOffices(): Observable<BranchOfficeResult[]> {
    const { http, _parameters } = this;
    return this.jwt.post(`${_parameters}GetBranchOffices`, '');
  }

  getBankList(): Observable<BanksResult[]> {
    const { http, _parameters } = this;
    return this.jwt.post(`${_parameters}GetBanks`, '');
  }

  getMonths(dto: MonthsQuantityDto): Observable<MonthsResult[]> {
    const { http, _parameters } = this;
    return this.jwt.post(`${_parameters}GetMonths`, dto);
  }
  getBankListNotBcp(): Observable<BanksResult[]> {
    const { http, _parameters } = this;
    return this.jwt.post(`${_parameters}GetBanksNotBcp`, '');
  }

}
