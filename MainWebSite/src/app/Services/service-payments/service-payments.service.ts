import { Injectable } from '@angular/core';
import { GetDebtRequest } from './models/get-debt-request';
import { Observable } from 'rxjs/Observable';
import { AppConfig } from '../../app.config';
import { JwtService } from '../../Jwt/jwt.service';
import { Http, Response } from '@angular/http';
import { ServiceTypes } from '../shared/enums/service-types';
import { ServicePayment } from './models/service-payment';
import { GetFavorites } from './models/get-favorites';
import { FavoritePayment } from '../shared/models/favorite-payment';
import { RuatPayment } from '../ruat/models/ruat-payment';
import { ProcessBatchResult } from '../shared/models/process-batch-result';
import { Constants } from '../shared/enums/constants';
import { BatchIdDto } from './models/batch-id-dto';

@Injectable()
export class ServicePaymentsService {

  private servicePaymentService = this.config.getConfig('ServicePaymentsServiceUrl');
  private ruatServicePayment = this.config.getConfig('RuatServiceUrl');
  private afpUrl = this.config.getConfig('AFPUrl');
  private constants: Constants = new Constants();

  constructor(private config: AppConfig, private jwt: JwtService, private http: Http) { }

  getDebts(request: GetDebtRequest): Observable<Response> {
    const { http, servicePaymentService } = this;
    return +request.service === ServiceTypes.Delapaz ?
      this.jwt.post(`${servicePaymentService}getDELAPAZDebt`, request) :
      this.jwt.post(`${servicePaymentService}getCRESAGUAPACDebt`, request);
  }

  savePayment(request: ServicePayment): Observable<ProcessBatchResult> {
    const { http, servicePaymentService } = this;
    return this.jwt.post(`${servicePaymentService}savePayment`, request);
  }

  getFavorites(request: GetFavorites): Observable<FavoritePayment[]> {
    const { http, servicePaymentService } = this;
    return this.jwt.post(`${servicePaymentService}getFavorites`, request);
  }

  saveRuatPayment(request: RuatPayment): Observable<ProcessBatchResult> {
    const { http, ruatServicePayment } = this;
    return request.service === Constants.ruatVehicles ?
      this.jwt.post(`${ruatServicePayment}saveVehiclePayment`, request) :
      this.jwt.post(`${ruatServicePayment}savePropertyPayment`, request);
  }

  getBatchDetail(dto: BatchIdDto): Observable<any> {
    const { http, servicePaymentService, ruatServicePayment, afpUrl, constants } = this;
    let address;
    switch (dto.service) {
      case constants.creService:
      case constants.saguapacService:
        address = `${servicePaymentService}getCresaguapacDetail`;
        break;
      case constants.delapazService:
        address = `${servicePaymentService}getDelapazDetail`;
        break;
      case constants.fixedTelephonyService:
      case constants.mobileTelephonyService:
        address = `${servicePaymentService}getTelephonyDetail`;
        break;
      case constants.vehicleRuatService:
        address = `${ruatServicePayment}getVehicleDetail`;
        break;
      case constants.propertyRuatService:
        address = `${ruatServicePayment}getPropertyDetail`;
        break;
    }
    return this.jwt.post(address, dto);
  }
}
