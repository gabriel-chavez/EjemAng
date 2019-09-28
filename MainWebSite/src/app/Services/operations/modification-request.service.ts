import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AppConfig } from '../../app.config';
import { JwtService } from '../../Jwt/jwt.service';
import { ModificationData } from './models/request-modification/modification-data';
import { OperationTypeResult } from './models/request-modification/operation-type-result';
import { OriginalData } from './models/request-modification/original-data';
import { ProcessBatchResult } from '../shared/models/process-batch-result';

@Injectable()
export class ModificationRequestService {

  private modificationRequestUrl = this.config.getConfig('ModificationRequestUrl');
  constructor(private http: Http, private config: AppConfig, private jwt: JwtService) { }

  getOperationTypes(): Observable<OperationTypeResult[]> {
    return this.jwt.post(`${this.modificationRequestUrl}GetListOperationType`, '');
  }

  getOriginalData(): Observable<OriginalData> {
    return this.jwt.post(`${this.modificationRequestUrl}DataFull`, '');
  }

  saveChanges(modificationData: ModificationData): Observable<ProcessBatchResult> {
    return this.jwt.post(`${this.modificationRequestUrl}SaveChanges`, modificationData);
  }
}
