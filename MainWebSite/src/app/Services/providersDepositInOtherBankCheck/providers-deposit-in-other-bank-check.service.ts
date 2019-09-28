import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { JwtService } from '../../Jwt/jwt.service';
import { AppConfig } from '../../app.config';
import { ProvidersDepositInOtherBankCheckData } from './models/providers-deposit-in-other-bank-check-data';
import { DetailProvidersOtherBank } from './models/detail-providers-other-bank';
import { InformationProvidersDepositInOtherBankCheckResult } from './models/information-providers-deposit-in-other-bank-check-result';
import { ProvidersDepositInOtherBankCheckPreviousFormResult } from './models/providers-deposit-in-other-bank-check-previous-form-result';
import { ProvidersDepositInOtherBankCheckSpreadsheetsResult } from './models/providers-deposit-in-other-bank-check-spreadsheets-result';
import { ProcessBatchResult } from '../shared/models/process-batch-result';

@Injectable()
export class ProvidersDepositInOtherBankCheckService {
  private ProvidersDepositInOtherBankCheckUrl = this.config.getConfig('ProvidersDepositInOtherBankCheckUrl');
  constructor(private http: Http, private config: AppConfig, private jwt: JwtService) { }

  getPreviousForm(): Observable<ProvidersDepositInOtherBankCheckPreviousFormResult[]> {
    const { http, ProvidersDepositInOtherBankCheckUrl } = this;
    return this.jwt.post(`${ProvidersDepositInOtherBankCheckUrl}GetPreviousForm`, '');
  }
  getForms(request): Observable<ProvidersDepositInOtherBankCheckSpreadsheetsResult[]> {
    const { http, ProvidersDepositInOtherBankCheckUrl } = this;
    return this.jwt.post(`${ProvidersDepositInOtherBankCheckUrl}GetForm`, request);
  }

  save(request: ProvidersDepositInOtherBankCheckData): Observable<ProcessBatchResult> {
    const { http, ProvidersDepositInOtherBankCheckUrl } = this;
    return this.jwt.post(`${ProvidersDepositInOtherBankCheckUrl}SaveProvidersDepositOtherBankCheck`, request);
  }

  chargeForm(request): Observable<ProvidersDepositInOtherBankCheckSpreadsheetsResult[]> {
    const { http, ProvidersDepositInOtherBankCheckUrl } = this;
    return this.jwt.postFile(`${ProvidersDepositInOtherBankCheckUrl}LoadPayRoll`, request);
  }
  getDetail(request): Observable<ProvidersDepositInOtherBankCheckData> {
    const { http, ProvidersDepositInOtherBankCheckUrl } = this;
    return this.jwt.post(`${ProvidersDepositInOtherBankCheckUrl}GetDetail`, request);
  }
}
