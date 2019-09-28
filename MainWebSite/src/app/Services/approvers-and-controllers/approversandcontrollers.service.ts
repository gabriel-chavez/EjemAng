import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { JwtService } from '../../Jwt/jwt.service';
import { ApproversDto } from './models/approvers-dto';
import { AppConfig } from '../../app.config';
import { ApproverOrControllerResult } from './models/approver-or-controller-result';
import { ApproversNumberResult } from './models/approvers-number-result';
import { ControllerNumberResult } from './models/controllers-number-result';
import { CismartAuthorizerDto } from './models/cismart-authorize-dto';
import { CismartAuthorizerResult } from './models/cismart-authorizer-result';
import { CismartApproversValidationDto } from './models/cismart-approvers-validation-dto';
import { CismartApproversValidationResult } from './models/cismart-approvers-validation-result';
import { GlobalService } from '../shared/global.service';

@Injectable()
export class ApproversAndControllersService {

  private _approversAndControllers = this.config.getConfig('ApproversAndControllersServiceUrl');

  constructor(private config: AppConfig, private jwt: JwtService) { }

  getApprovers(request: ApproversDto): Observable<ApproverOrControllerResult[]> {
    const { _approversAndControllers } = this;
    return this.jwt.post(`${_approversAndControllers}GetApprovers`, request);
  }

  getCismartApprovers(dto: CismartAuthorizerDto): Observable<CismartAuthorizerResult> {
    const { _approversAndControllers } = this;
    return this.jwt.post(`${_approversAndControllers}GetCismartApprovers`, dto);
  }

  getAdmApprovers(request: ApproversDto): Observable<ApproverOrControllerResult[]> {
    const { _approversAndControllers } = this;
    return this.jwt.post(`${_approversAndControllers}GetAdmApprovers`, request);
  }

  getControllers(request: ApproversDto): Observable<ApproverOrControllerResult[]> {
    const { _approversAndControllers } = this;
    return this.jwt.post(`${_approversAndControllers}GetControllers`, request);
  }

  getAdmControllers(request: ApproversDto): Observable<ApproverOrControllerResult[]> {
    const { _approversAndControllers } = this;
    return this.jwt.post(`${_approversAndControllers}GetAdmControllers`, request);
  }

  getApproversNumber(request: ApproversDto): Observable<ApproversNumberResult> {
    const { _approversAndControllers } = this;
    return this.jwt.post(`${_approversAndControllers}GetApproversNumber`, request);
  }

  getControllersNumber(request: ApproversDto): Observable<ControllerNumberResult> {
    const { _approversAndControllers } = this;
    return this.jwt.post(`${_approversAndControllers}GetControllersNumber`, request);
  }

  validateCismartApprovers(request: CismartApproversValidationDto): Observable<CismartApproversValidationResult> {
    const { _approversAndControllers } = this;
    return this.jwt.post(`${_approversAndControllers}ValidateCismartApprovers`, request);
  }

}
