import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { JwtService } from '../../Jwt/jwt.service';
import { AppConfig } from '../../app.config';
import { PendingBatchResult } from './models/pending-batch-result';
import { ProcessBatch } from './models/process-batch';
import { BatchStatus } from './models/batch-status';
import { Constants } from '../shared/enums/constants';

@Injectable()
export class AuthorizationService {

  private authorization = this.config.getConfig('AuthorizationServiceUrl');

  constructor(private http: Http, private config: AppConfig, private jwt: JwtService) { }

  getPendingBatches(): Observable<PendingBatchResult> {
    const { http, authorization } = this;
    return this.jwt.post(`${authorization}GetPendingBatches`, '');
  }

  processBatches(dto: ProcessBatch): Observable<BatchStatus[]> {
    const { http, authorization } = this;
    return dto.operation == Constants.rejectionOperation ? this.jwt.post(`${authorization}RejectBatches`, dto) :
      this.jwt.post(`${authorization}ProcessBatches`, dto);
  }
}
