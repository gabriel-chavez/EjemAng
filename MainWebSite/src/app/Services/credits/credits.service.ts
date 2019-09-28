import { Injectable } from '@angular/core';
import { Headers, Http, Response, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { JwtService } from '../../Jwt/jwt.service';
import { AppConfig } from '../../app.config';
import { ConsultQuotaDto } from './models/consult-quota-dto';
import { ConsultQuotaResult } from './models/consult-quota-result';
import { QuotaPaymentDto } from './models/quota-payment-dto';
import { ProcessBatchResult } from '../shared/models/process-batch-result';
import { VouchersCreditsDto } from './models/vouchers-credits-dto';
import { GetPaymentListCreditResult } from './models/get-payment-list-credit-result';
import { QuotaPaymentDetailDto } from './models/quota-payment-detail-dto';
import { QuotaPaymentDetailResult } from './models/quota-payment-detail-result';

@Injectable()
export class CreditsService {

  private creditsUrl = this.config.getConfig('CreditsServiceUrl');

  constructor(private config: AppConfig, private jwt: JwtService) { }

  getQuotaPayment(request: ConsultQuotaDto): Observable<ConsultQuotaResult> {
    const { jwt, creditsUrl } = this;
    return jwt.post(`${creditsUrl}GetQuotaPayment`, request);
  }

  saveQuotaPayment(request: QuotaPaymentDto): Observable<ProcessBatchResult> {
    const { jwt, creditsUrl } = this;
    return jwt.post(`${creditsUrl}SaveQuotaPayment`, request);
  }

  GetPaymentsListCredit(request: VouchersCreditsDto): Observable<GetPaymentListCreditResult[]> {
    const { jwt, creditsUrl } = this;
    return jwt.post(`${creditsUrl}GetPaymentsListCredit`, request);
  }

  GetPaymentsListCreditReport(request: VouchersCreditsDto): Observable<Blob> {
    const { jwt, creditsUrl } = this;
    return jwt.postReport(`${creditsUrl}GetPaymentsListCreditReport`, request, { responseType: ResponseContentType.Blob });
  }

  GetDetailPaymentCredit(request: VouchersCreditsDto): Observable<any> {
    const { jwt, creditsUrl } = this;
    return jwt.post(`${creditsUrl}GetDetailPaymentCredit`, request);
  }

  GetDetailPaymentCreditReport(request: VouchersCreditsDto): Observable<Blob> {
    const { jwt, creditsUrl } = this;
    return jwt.postReport(`${creditsUrl}GetDetailPaymentCreditReport`, request, { responseType: ResponseContentType.Blob });
  }

  GetDisbursements(request: VouchersCreditsDto): Observable<GetPaymentListCreditResult[]> {
    const { jwt, creditsUrl } = this;
    return jwt.post(`${creditsUrl}GetDisbursements`, request);
  }

  GetDisbursementsListReport(request: VouchersCreditsDto): Observable<Blob> {
    const { jwt, creditsUrl } = this;
    return jwt.postReport(`${creditsUrl}GetDisbursementsListReport`, request, { responseType: ResponseContentType.Blob });
  }

  GetDisbursementsHeaderReport(request: VouchersCreditsDto): Observable<Blob> {
    const { jwt, creditsUrl } = this;
    return jwt.postReport(`${creditsUrl}GetDisbursementsHeaderReport`, request, { responseType: ResponseContentType.Blob });
  }

  GetPaymentPlan(request: VouchersCreditsDto): Observable<Blob> {
    const { jwt, creditsUrl } = this;
    return jwt.postReport(`${creditsUrl}GetPaymentPlan`, request, { responseType: ResponseContentType.Blob });
  }

  GetQuotaPaymentDetail(request: QuotaPaymentDetailDto): Observable<QuotaPaymentDetailResult> {
    const { jwt, creditsUrl } = this;
    return jwt.post(`${creditsUrl}GetQuotaPaymentDetail`, request);
  }
}
