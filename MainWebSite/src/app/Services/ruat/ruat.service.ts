import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { JwtService } from '../../Jwt/jwt.service';
import { AppConfig } from '../../app.config';
import { RuatDto } from './models/ruat-dto';
import { VehicleDebtResult } from './models/vehicle-debt-result';
import { PropertyDebtResult } from './models/property-debt-result';

@Injectable()
export class RuatService {

  private _ruatService = this.config.getConfig('RuatServiceUrl');

  constructor(private http: Http, private config: AppConfig, private jwt: JwtService) { }

  getVehicleDebt(dto: RuatDto): Observable<VehicleDebtResult> {
    const { http, _ruatService } = this;
    return this.jwt.post(`${_ruatService}GetVehicleDebt`, dto);
  }

  getPropertyDebt(dto: RuatDto): Observable<PropertyDebtResult> {
    const { http, _ruatService } = this;
    return this.jwt.post(`${_ruatService}GetPropertyDebt`, dto);
  }
}
