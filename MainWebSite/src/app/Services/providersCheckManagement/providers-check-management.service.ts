import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { JwtService } from '../../Jwt/jwt.service';
import { AppConfig } from '../../app.config';
import { ProvidersCheckManagementData } from './models/providers-check-management-data';
import { DetailProvider } from './models/detail-provider';
import { InformationProvidersCheckManagementResponseModel } from './models/information-providers-check-management-response-model';
import { ProvidersCheckManagementPreviousFormResponse } from './models/providers-check-management-previous-form-response';
import { ProvidersCheckManagementSpreadsheetsResponse } from './models/providers-check-management-spreadsheets-response';
import { ProcessBatchResult } from '../shared/models/process-batch-result';

@Injectable()
export class ProvidersCheckManagementService {
  private ProvidersCheckManagementUrl = this.config.getConfig('ProvidersCheckManagementUrl');
  constructor(private http: Http, private config: AppConfig, private jwt: JwtService) { }

  getPreviousForm(): Observable<ProvidersCheckManagementPreviousFormResponse[]> {
    const { http, ProvidersCheckManagementUrl } = this;
    return this.jwt.post(`${ProvidersCheckManagementUrl}GetPreviousForm`, '');
  }
  getForms(request): Observable<ProvidersCheckManagementSpreadsheetsResponse[]> {
    const { http, ProvidersCheckManagementUrl } = this;
    return this.jwt.post(`${ProvidersCheckManagementUrl}GetForm`, request);
  }

  save(request: ProvidersCheckManagementData): Observable<ProcessBatchResult> {
    const { http, ProvidersCheckManagementUrl } = this;
    return this.jwt.post(`${ProvidersCheckManagementUrl}SaveProvidersCheckManagement`, request);
  }
  chargeForm(request): Observable<ProvidersCheckManagementSpreadsheetsResponse[]> {
    const { http, ProvidersCheckManagementUrl } = this;
    return this.jwt.postFile(`${ProvidersCheckManagementUrl}LoadPayRoll`, request);
  }

  getDetail(request): Observable<ProvidersCheckManagementData> {
    const { http, ProvidersCheckManagementUrl } = this;
    return this.jwt.post(`${ProvidersCheckManagementUrl}GetDetail`, request);
  }
}
