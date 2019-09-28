import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { JwtService } from '../../Jwt/jwt.service';
import { AppConfig } from '../../app.config';
import { ClaimRequestSpreadsheetsResult } from './models/claim-request-spreadsheets-result';
import { ClaimRequestData } from './models/claim-request-data';
import { ClaimRequestDto } from './models/claim-request-dto';
import { ClaimRequestResult } from './models/claim-request-result';
import { ClaimRequestSpreadsheetsDto } from './models/claim-request-spreadsheets-dto';
import { DetailClaimRequest } from './models/detail-claim-request';
import { ProcessBatchResult } from '../shared/models/process-batch-result';

@Injectable()
export class ClaimRequestService {
  private ClaimRequestUrl = this.config.getConfig('ClaimRequestUrl');

  constructor(private http: Http, private config: AppConfig, private jwt: JwtService) { }
  SaveClaimRequest(request: ClaimRequestDto): Observable<ProcessBatchResult> {
    const { http, ClaimRequestUrl } = this;
    return this.jwt.post(`${ClaimRequestUrl}SaveClaimRequest`, request);
  }

}
