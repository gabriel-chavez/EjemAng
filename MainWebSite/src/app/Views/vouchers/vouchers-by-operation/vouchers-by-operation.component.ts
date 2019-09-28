import { Component, OnInit } from '@angular/core';
import { DateRangeModel, OptionsDateRange } from '../../shared/components/date-range-picker/date-range-picker.component';
import { VouchersByOperationService } from '../../../Services/vouchers-by-operation/vouchers-by-operation.service';
import { GlobalService } from '../../../Services/shared/global.service';
import { UserService } from '../../../Services/users/user.service';
import { VoucherDto } from '../../../Services/vouchers-by-operation/models/voucher-dto';
import { VoucherResult } from '../../../Services/vouchers-by-operation/models/voucher-result';
import * as moment from 'moment';

@Component({
  selector: 'app-vouchers-by-operation',
  templateUrl: './vouchers-by-operation.component.html',
  styleUrls: ['./vouchers-by-operation.component.css'],
  providers: [VouchersByOperationService]
})
export class VouchersByOperationComponent implements OnInit {

  dateRange?: DateRangeModel = new DateRangeModel();
  voucherDto: VoucherDto = new VoucherDto();
  vouchers: VoucherResult[] = [];
  today: Date;
  lastYear: Date;
  operationIdInput: string;
  batchIdInput: number;
  providerInput: string;
  swTable: boolean;

  optionsDateRange: OptionsDateRange = {
    isHorizontal: false,
    isMaxDateNow: true,
    maxMonthRange: 3,
    showClearDate: false
  };

  constructor(private userService: UserService, private vouchersByOperationService: VouchersByOperationService, private globalService: GlobalService) { }

  ngOnInit() {
    this.today = new Date();
    this.lastYear = moment(new Date()).add(-365, 'd').toDate();
    this.dateRange.dateEnd = this.today;
    this.dateRange.dateInit = moment(new Date()).add(-1, 'd').toDate();

    this.swTable = false;
    this.operationIdInput = '';
    this.batchIdInput = 0;
    this.providerInput = '';
  }

  handleSearch() {
    this.swTable = false;
    if (this.IsValid()) {
      this.voucherDto.EndDate = this.dateRange.dateEnd;
      this.voucherDto.InitialDate = this.dateRange.dateInit;
      this.voucherDto.BatchId = this.batchIdInput || 0;
      this.voucherDto.OperationId = this.operationIdInput;
      this.voucherDto.Provider = this.providerInput;
      this.getVouchers(this.voucherDto);
    }
  }

  getVouchers(dto: VoucherDto) {
    this.vouchersByOperationService.getVouchers(dto)
      .subscribe((response: VoucherResult[]) => {
        this.vouchers = response;
        this.vouchers.length > 0 ? this.swTable = true : this.globalService.warning('Advertencia', 'No existen transacciones en las fechas seleccionadas. ');
      }, error => {
        this.globalService.danger('VouchersByOperation: ', error.message);
        this.swTable = false;
      });
  }

  handleClear() {
    this.operationIdInput = '';
    this.batchIdInput = 0;
    this.providerInput = '';
  }

  IsValid(): boolean {
    let flag = false;
    if (this.dateRange.dateEnd >= this.lastYear && this.dateRange.dateInit >= this.lastYear) {
      if ((this.dateRange.dateEnd.getTime() - this.dateRange.dateInit.getTime()) / 1000000 < 2678) {
        flag = true;
      } else {
        flag = false;
        this.globalService.warning('Advertencia', 'El rango de búsqueda no puede sobrepasar los 31 días. ');
      }
    } else {
      flag = false;
      this.globalService.warning('Advertencia', 'La búsqueda no puede ser mayor a 365 días a partir de la fecha actual. ');
    }
    
    return flag;
  }

}
