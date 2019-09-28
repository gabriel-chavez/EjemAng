import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { JwtService } from '../../Jwt/jwt.service';
import { FavoriteTransferRequest } from './models/favorite-transfer-request';
import { FavoriteTransferIdRequest } from './models/favorite-transfer-id-request';
import { AppConfig } from '../../app.config';
import { TransferData } from './models/transfer-data';
import { FavoriteTransferResponse } from './models/favorite-transfer-response';
import { ProcessBatchResult } from '../shared/models/process-batch-result';
import { TransferDetail } from './models/transfer-detail';
import { BatchIdDto } from './models/batch-id-dto';

@Injectable()
export class TransfersService {

  private _transfers = this.config.getConfig('TransfersServiceUrl');
  private _favoriteTransfers = this.config.getConfig('FavoriteTransfersServiceUrl');

  constructor(private http: Http, private config: AppConfig, private jwt: JwtService) { }

  save(request: TransferData): Observable<ProcessBatchResult> {
    const { http, _transfers } = this;
    return this.jwt.post(`${_transfers}SaveTransfer`, request);
  }

  getFavorites(): Observable<FavoriteTransferResponse[]> {
    const { http, _favoriteTransfers } = this;
    return this.jwt.post(`${_favoriteTransfers}Get`, '');
  }

  getDetail(batchId: BatchIdDto): Observable<TransferDetail> {
    const { http, _transfers } = this;
    return this.jwt.post(`${_transfers}GetDetail`, batchId);
  }

  updateFavorite(request: FavoriteTransferRequest): Observable<Response> {
    const { http, _favoriteTransfers } = this;
    return this.jwt.post(`${_favoriteTransfers}Update`, request);
  }

  removeFavorite(request: FavoriteTransferIdRequest): Observable<Response> {
    const { http, _favoriteTransfers } = this;
    return this.jwt.post(`${_favoriteTransfers}Remove`, request);
  }
}
