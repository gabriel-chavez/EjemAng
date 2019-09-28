import { Injectable } from '@angular/core';
import { Http, Response, Headers, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { JwtService } from '../../Jwt/jwt.service';
import { AppConfig } from '../../app.config';
import { InformationMovementDepositResponseModel } from './models/information-movement-deposit-response-model';
import { MovementDepositBasicRequestModel } from './models/movement-deposit-basic-request-model';
import { MovementDepositM } from './models/movement-deposit-m';
import { ConfirmationTicket } from './models/confirmation-ticket';

@Injectable()
export class MovementsDepositsService {

  private movementsAndDepositsUrl = this.config.getConfig('MovementsAndDepositsUrl');

  constructor(private http: Http, private config: AppConfig, private jwt: JwtService) { }

 getMovements(informationMovementDepositResponseModel: InformationMovementDepositResponseModel): Observable<any> {
    const { http, movementsAndDepositsUrl } = this;
    return this.jwt.post(`${movementsAndDepositsUrl}GetMovementDeposit`, informationMovementDepositResponseModel);
  }
  getTotalMovement(informationMovementDepositResponseModel: InformationMovementDepositResponseModel): Observable<any> {
    const { http, movementsAndDepositsUrl } = this;
    return this.jwt.post(`${movementsAndDepositsUrl}GetTotalMovements`, informationMovementDepositResponseModel);
  }
  getFormattedAccounts(informationMovementDepositResponseModel: InformationMovementDepositResponseModel): Observable<any> {
    const { http, movementsAndDepositsUrl } = this;
    return this.jwt.post(`${movementsAndDepositsUrl}GetFormattedAccounts`, informationMovementDepositResponseModel);
  }
  getReportMovements(dto: InformationMovementDepositResponseModel): Observable<Blob> {
    const { http, movementsAndDepositsUrl } = this;
    return this.jwt.postReport(`${movementsAndDepositsUrl}GetReport`, dto, { responseType: ResponseContentType.Blob });
  }

  getReportsMovements(dtos: MovementDepositBasicRequestModel): Observable<Blob> {
    const { http, movementsAndDepositsUrl } = this;
    return this.jwt.postReport(`${movementsAndDepositsUrl}GetReporte`, dtos, { responseType: ResponseContentType.Blob });
  }

  getConfirmationTicket(): Observable<ConfirmationTicket> {
    const { http, movementsAndDepositsUrl } = this;
    return this.jwt.post(`${movementsAndDepositsUrl}GetConfirmationTickets`, '');
  }
  saveContractConfirmation(): Observable<ConfirmationTicket> {
    const { http, movementsAndDepositsUrl } = this;
    return this.jwt.post(`${movementsAndDepositsUrl}SaveConfirmationTicket`, '');
  }
}
