import { Injectable } from '@angular/core';
import { Http, ResponseContentType  } from '@angular/http';
import { AppConfig } from '../../../app.config';
import { JwtService } from '../../../Jwt/jwt.service';
import { Observable } from 'rxjs/Observable';
import { GetElectronicVouchersResponse } from './models/get-electronic-vouchers-response';
import { ElectronicVoucherDto } from './models/electronic-voucher-dto';

@Injectable()
export class ElectronicVoucherService {

  private _electronicVoucher = this.config.getConfig('VoucherElectronicUrl');

  constructor(private http: Http,
    private config: AppConfig,
    private jwt: JwtService) { }

    getListElectronicVoucher(request: ElectronicVoucherDto): Observable<GetElectronicVouchersResponse[]> {
      const { http, _electronicVoucher } = this;
      return this.jwt.post(`${_electronicVoucher}GetListElectronicVoucher`, request);
    }
    getReport(getElectronicVouchersResponseDto: GetElectronicVouchersResponse): Observable<Blob> {
      const { _electronicVoucher } = this;
      return this.jwt.postReport(`${_electronicVoucher}GetReport`, getElectronicVouchersResponseDto, { responseType: ResponseContentType.Blob });
    }
}
