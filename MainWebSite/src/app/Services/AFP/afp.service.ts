import { Injectable } from '@angular/core';
import { AppConfig } from '../../app.config';
import { JwtService } from '../../Jwt/jwt.service';
import { Observable } from 'rxjs/Observable';
import { RequestModelsAfpquery } from './Models/request-models-afpquery';
import { ResponseModelsAfpquery } from './Models/response-models-afpquery';
import { ProcessBatchResult } from '../shared/models/process-batch-result';
import { AFPPayment } from '../AFP/Models/PaymentAFP';
import { PaymentAfpDetailDto } from './Models/payment-afp-detail-dto';
import { PaymentAfpDetailResult } from './Models/payment-afp-detail-result';

@Injectable()
export class AfpService {
  private urlAFP = this.config.getConfig('AFPUrl');

  constructor(
    private config: AppConfig,
    private jwt: JwtService
  ) { }

  getDetailAFP(request: RequestModelsAfpquery): Observable<ResponseModelsAfpquery> {
    const { jwt, urlAFP } = this;
    return jwt.post(`${urlAFP}GetDataAFPDetail`, request);
  }

  SavePaymentAFP(request: AFPPayment): Observable<ProcessBatchResult> {
    const { jwt, urlAFP } = this;
    return jwt.post(`${urlAFP}SavePaymentAFP`, request);
  }

  getPaymetAfpDetail(paymentAfpDetailDto: PaymentAfpDetailDto): Observable<PaymentAfpDetailResult> {
    const { jwt, urlAFP } = this;
    return jwt.post(`${urlAFP}GetPaymentAFPDetail`, paymentAfpDetailDto);
  }
}
