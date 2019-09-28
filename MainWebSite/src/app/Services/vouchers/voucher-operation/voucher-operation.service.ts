import { Injectable } from '@angular/core';
import { Headers, Http, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { VoucherDto } from './models/voucher-dto';
import { VoucherResult } from './models/voucher-result';
import { JwtService } from '../../../Jwt/jwt.service';
import { AppConfig } from '../../../app.config';
import { TypeOperation } from './models/type-operation';
import { FilterDto } from './models/filter-dto';
import { UserCreationId } from './models/user-creation-id';

@Injectable()
export class VoucherOperationService {

  private _vouchers = this.config.getConfig('VouchersUrl');
  private headers = new Headers({ 'content-type': 'application/json' });

  constructor(private http: Http, private config: AppConfig, private jwt: JwtService) { }

  GetListVoucher(month: FilterDto): Observable<VoucherResult[]> {
    const { http, _vouchers } = this;
    return this.jwt.post(`${_vouchers}GetListVoucher`, month);
  }

  GetListTypeOperation(): Observable<TypeOperation[]> {
    const { http, _vouchers } = this;
    return this.jwt.post(`${_vouchers}GetListTypeOperation`, '');
  }
  /*Init*/
  getReportVouchers(request: VoucherDto): Observable<Blob> {
    const { http, _vouchers } = this;
    return this.jwt.postReport(`${_vouchers}GetReportVoucher`, request, { responseType: ResponseContentType.Blob });
  }

  getFileVouchers(request: VoucherDto): Observable<Blob> {
    const { http, _vouchers } = this;
    return this.jwt.postReport(`${_vouchers}GetFileVoucher`, request, { responseType: ResponseContentType.Blob });
  }
/*End*/
  downloadReportZip(request: VoucherDto): Observable<Blob> {
    const { http, _vouchers } = this;
    return this.jwt.postReport(`${_vouchers}DownloadReportZip`,request, { responseType: ResponseContentType.Blob });
  }
  getUserId(request: VoucherDto): Observable<UserCreationId> {
    const { http, _vouchers } = this;
    return this.jwt.post(`${_vouchers}VerificationAuthorized`, request);
  }
  getNameFileTxt(request: VoucherDto): Observable<VoucherDto> {
    const { http, _vouchers } = this;
    return this.jwt.post(`${_vouchers}DownloadNameFileTxt`, request);
  }  
}

