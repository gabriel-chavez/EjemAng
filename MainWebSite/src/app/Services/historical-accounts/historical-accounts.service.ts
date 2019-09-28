import { Injectable } from '@angular/core';
import { MovAccountsDto } from './models/MovAccountsDto';
import { Observable } from 'rxjs/Observable';
import { AccountIni } from './models/AccountIni';
import { ParameterModel } from './models/ParameterModel';
import { Http, ResponseContentType } from '@angular/http';
import { AppConfig } from '../../app.config';
import { JwtService } from '../../Jwt/jwt.service';
import { HistoricalAccountsResult } from './models/HistoricalAccountsResult';
import { NumberRowModel } from './models/NumberRowModel';
import { AccountPartialModel } from './models/AccountPartialModel';
import { HistoricalBasic } from './models/historical-basic';
import { MonthsResult } from './models/months-result';
import { MonthsDto } from './models/months-dto';
import { SaveHistoricalAccountDto } from './models/save-historical-account-dto';
import { ProcessBatchResult } from './models/process-batch-result';

@Injectable()
export class HistoricalAccountsService {

  private _UrlListHistorical = this.config.getConfig('UrlListHistorical');
  private _AccountList = this.config.getConfig('AccountsServiceUrl');

  constructor(
    private http: Http,
    private config: AppConfig,
    private jwt: JwtService) { }

  getListHistorical(IniMov: MovAccountsDto): Observable<HistoricalAccountsResult> {
    const { http, _UrlListHistorical } = this;
    return this.jwt.post(`${_UrlListHistorical}GetListAccountMovements`, IniMov);
  }
  getMonth(dto: MonthsDto): Observable<MonthsResult[]> {
    const { http, _UrlListHistorical } = this;
    return this.jwt.post(`${_UrlListHistorical}GetMonth`, dto);
  }
  getListAccount(modIni: AccountIni): Observable<AccountPartialModel[]>  {
    const { http, _AccountList } = this;
    return this.jwt.post(
    `${_AccountList}Get`, modIni);
  }
  getNumberRowAccounts(model: HistoricalBasic): Observable<NumberRowModel>  {
    const { http, _UrlListHistorical } = this;
    return this.jwt.post(
    `${_UrlListHistorical}GetAccountMovementNumberRow`, model);
  }
  getCertificateType(): Observable<ParameterModel[]>  {
    const { http, _UrlListHistorical } = this;
    return this.jwt.post(
    `${_UrlListHistorical}GetCertificateType`, null);
  }
  saveHistorical(SaveHistoricalDto: SaveHistoricalAccountDto): Observable<ProcessBatchResult> {
    const { http, _UrlListHistorical } = this;
    return this.jwt.post(
    `${_UrlListHistorical}SaveHistorical`, SaveHistoricalDto);
  }
  getReportHistorical(dto: MovAccountsDto): Observable<Blob> {
    const { http, _UrlListHistorical } = this;
    return this.jwt.postReport(`${_UrlListHistorical}GetReport`, dto, { responseType: ResponseContentType.Blob });
  }
}

