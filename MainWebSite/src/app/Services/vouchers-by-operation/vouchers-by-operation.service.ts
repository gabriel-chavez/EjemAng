import { Injectable } from '@angular/core';
import { Headers, Http, Response, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { JwtService } from '../../Jwt/jwt.service';
import { AppConfig } from '../../app.config';
import { VoucherDto } from './models/voucher-dto';
import { VoucherResult } from './models/voucher-result';

@Injectable()
export class VouchersByOperationService {
  private vouchersByOperation = this.config.getConfig('VouchersByOperationUrl');
  constructor(private http: Http, private config: AppConfig, private jwt: JwtService) { }

  getVouchers(request: VoucherDto): Observable<VoucherResult[]> {
    const { http, vouchersByOperation } = this;
    return this.jwt.post(`${vouchersByOperation}GetVouchers`, request);
  }

  getReport(request: VoucherResult): Observable<Blob> {
    const { http, vouchersByOperation } = this;
    return this.jwt.postReport(`${vouchersByOperation}GetReport`, request, { responseType: ResponseContentType.Blob });
  }

  downloadReportZip(request: VoucherResult[]): Observable<Blob> {
    const { http, vouchersByOperation } = this;
    return this.jwt.postReport(`${vouchersByOperation}DownloadReportZip`, request, { responseType: ResponseContentType.Blob });
  }
}
