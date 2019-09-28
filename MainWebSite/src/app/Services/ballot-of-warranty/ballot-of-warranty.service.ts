import { Injectable } from '@angular/core';
import { Headers, Response, ResponseContentType } from '@angular/http';
import { AppConfig } from '../../app.config';
import { JwtService } from '../../Jwt/jwt.service';
import { Observable } from 'rxjs/Observable';
import { RatesResult } from './models/rates-result';
import { CompanyDataResult } from './models/company-data-result';
import { EmployResult } from './models/employ-result';
import { PublicWritingDetailResult } from './models/public-writing-detail-result';
import { TimeDepositResult } from './models/time-deposit-result';
import { ConvertNumberResult } from './models/convert-number-result';
import { ConvertNumberDto } from './models/convert-number-dto';
import { ParameterDto } from '../parameters/models/parameter-dto';
import { ParameterResult } from '../parameters/models/parameter-result';
// import { BallotOfWarrantyData } from './models/ballot-of-warranty-data';
import { ProcessBatchResult } from '../shared/models/process-batch-result';
import { ContractResult } from './models/contract-result';
import { ParametersResult } from './models/parameters-result';
import { BallotOfWarrantyDto } from './models/ballot-of-warranty-dto';

@Injectable()
export class BallotOfWarrantyService {

  private _ballotOfWarranty = this.config.getConfig('BallotOfWarrantyUrl');
  constructor(private config: AppConfig, private jwt: JwtService) { }

  getRates(): Observable<RatesResult> {
    const { jwt, _ballotOfWarranty } = this;
    return jwt.post(`${_ballotOfWarranty}GetRates`, '');
  }

  getParameters(): Observable<ParametersResult> {
    const { jwt, _ballotOfWarranty } = this;
    return jwt.post(`${_ballotOfWarranty}GetParameters`, '');
  }

  getPublicWritingDetail(): Observable<PublicWritingDetailResult[]> {
    const { jwt, _ballotOfWarranty } = this;
    return jwt.post(`${_ballotOfWarranty}GetPublicWritingDetail`, '');
  }

  getTimeDeposit(): Observable<TimeDepositResult[]> {
    const { jwt, _ballotOfWarranty } = this;
    return jwt.post(`${_ballotOfWarranty}GetTimeDeposit`, '');
  }

  // GetContract(request: BallotOfWarrantyData): Observable<ContractResult> {
  //   const { jwt, _ballotOfWarranty } = this;
  //   return jwt.post(`${_ballotOfWarranty}GetContract`, request );
  // }

  Save(dto: BallotOfWarrantyDto): Observable<ProcessBatchResult> {
    const { jwt, _ballotOfWarranty } = this;
    return jwt.post(`${_ballotOfWarranty}Save`, dto);
  }
}
