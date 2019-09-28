import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { JwtService } from '../../Jwt/jwt.service';
import { TicketDto } from './models/ticket-dto';
import { AppConfig } from '../../app.config';
import { TicketCommissionDto } from './models/ticket-commission-dto';
import { TicketCommissionResult } from './models/ticket-commission-result';
import { TicketValidationResult } from './models/ticket-validation-result';
import { TicketResult } from './models/ticket-result';

@Injectable()
export class TicketsService {

  private ticketsService = this.config.getConfig('TicketsServiceUrl');

  constructor(private config: AppConfig, private jwt: JwtService, private http: Http) { }

  getGMESATicket(request: TicketDto): Observable<TicketResult> {
    const { http, ticketsService } = this;
    return this.jwt.post(`${ticketsService}GetGMESATicket`, request);
  }

  verifyGMESATicket(request: TicketDto): Observable<TicketValidationResult> {
    const { http, ticketsService } = this;
    return this.jwt.post(`${ticketsService}VerifyGMESATicket`, request);
  }

  getSGMDDTicket(request: TicketCommissionDto): Observable<TicketCommissionResult> {
    const { http, ticketsService } = this;
    return this.jwt.post(`${ticketsService}GetSGMDDTicket`, request);
  }

  verifySGMDDTicket(request: TicketCommissionDto): Observable<Response> {
    const { http, ticketsService } = this;
    return this.jwt.post(`${ticketsService}VerifySGMDDTicket`, request);
  }
}
