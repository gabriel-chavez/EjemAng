import { Injectable } from '@angular/core';
import { Headers, Http, Response, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { JwtService } from '../../Jwt/jwt.service';
import { AppConfig } from '../../app.config';
import { TrackTransfersDto } from './models/track-transfers-dto';
import { TrackTransfersResult } from './models/track-transfers-result';
import { TrackStatusResult } from './models/track-status-result';
import { OperationTypeResult } from './models/operation-type-result';

@Injectable()
export class TrackTransfersService {
  private trackTransfers = this.config.getConfig('TrackTransfersUrl');

  constructor(private http: Http, private config: AppConfig, private jwt: JwtService) { }

  trackingListParameters(request: TrackTransfersDto): Observable<TrackTransfersResult[]> {
    const { http, trackTransfers} = this;
    return this.jwt.post(`${trackTransfers}TrackingListParameters`, request);
  }
  getTransfersBeneficiaries(): Observable<string[]> {
    const { http, trackTransfers} = this;
    return this.jwt.post(`${trackTransfers}GetTransfersBeneficiaries`, '');
  }
  getReportOperations(request: TrackTransfersDto): Observable<Blob> {
    const { http, trackTransfers } = this;
    return this.jwt.postReport(`${trackTransfers}GetReport`, request, { responseType: ResponseContentType.Blob });
  }
  getOperationStatus(): Observable<TrackStatusResult[]> {
    const { http, trackTransfers } = this;
    return this.jwt.post(`${trackTransfers}GetOperationStatus`, '');
  }
  getOperationTypes(): Observable<OperationTypeResult[]> {
    const { http, trackTransfers } = this;
    return this.jwt.post(`${trackTransfers}GetOperationTypes`, '');
  }
}
