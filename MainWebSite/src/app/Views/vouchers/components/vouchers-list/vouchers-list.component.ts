import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { VouchersByOperationService } from '../../../../Services/vouchers-by-operation/vouchers-by-operation.service';
import { UserService } from '../../../../Services/users/user.service';
import { Router } from '@angular/router';
import { GlobalService } from '../../../../Services/shared/global.service';
import { VoucherDto } from '../../../../Services/vouchers-by-operation/models/voucher-dto';
import { VoucherResult } from '../../../../Services/vouchers-by-operation/models/voucher-result';

@Component({
  selector: 'app-vouchers-list',
  templateUrl: './vouchers-list.component.html',
  styleUrls: ['./vouchers-list.component.css'],
  providers: [VouchersByOperationService]
})
export class VouchersListComponent implements OnInit {

  nameReport = 'Comprobante por operación';

  requestResult: VoucherResult = new VoucherResult();
  countChecked: number;
  formatDate: string
  currentDate: Date;

  vouchersLength: number;
  companyName: string;
  listVouchers: VoucherResult[] = [];
  allVouchersSelected = false;

  vouchersIds: VoucherResult[] = [];

  pageSize = 10;

  @Input() order: boolean;
  @Input() vouchers: VoucherResult[] = [];
  @Input() vouchersDto: VoucherDto = new VoucherDto();

  constructor(private userService: UserService, private vouchersByOperationService: VouchersByOperationService, private globalService: GlobalService, private router: Router) {
    this.currentDate = new Date();
  }

  ngOnInit() {
    this.vouchersLength = this.vouchers.length;
    this.companyName = this.userService.getUserToken().company_name;
  }

  handlePageChanged($event: number) {
    this.listVouchers = this.vouchers.slice((($event - 1) * this.pageSize), this.pageSize * $event);
  }

  handleDownloadReport(voucher: VoucherResult) {
    this.vouchersByOperationService.getReport(voucher)
      .subscribe((resp: Blob) => {
        if (navigator.msSaveBlob) {
          return navigator.msSaveOrOpenBlob(resp, this.nameReport);
        }

        const data = window.URL.createObjectURL(resp);
        const link = document.createElement('a');
        link.href = data;
        link.download = (this.nameReport + '_' + this.companyName).replace(/\./gi, " ");
        link.click();
      }, (error) => this.globalService.danger('Falló descarga de comprobante: ', error.message));
  }

  handleAllVouchersChecked() {
    this.vouchersIds = [];
    for (const voucher of this.listVouchers) {
      voucher.isSelected = this.allVouchersSelected;
      this.vouchersIds = this.changeStatus(this.allVouchersSelected, this.vouchersIds, voucher);
    }
  }

  handleVoucherChecked(voucher: VoucherResult) {
    this.vouchersIds = this.changeStatus(voucher.isSelected, this.vouchersIds, voucher);
  }

  changeStatus(selected: boolean, array: VoucherResult[], item: VoucherResult): VoucherResult[] {
    if (selected) {
      array.push(item);
    } else {
      array.splice(array.indexOf(item, 0), 1);
    }
    return array;
  }
  handleDownloadZip() {

    this.countChecked = 0;
    this.formatDate = this.currentDate.getDate().toString() + '-' + (this.currentDate.getMonth() + 1).toString() + '-' + this.currentDate.getFullYear().toString();

    for (var i = 0; i < this.vouchersIds.length; i++) {
      this.countChecked = this.countChecked + 1;
    }
    if (this.countChecked > 0) {
      this.currentDate = new Date();

      this.vouchersByOperationService.downloadReportZip(this.vouchersIds)
        .subscribe((resp: Blob) => {
          const data = window.URL.createObjectURL(resp);
          const link = document.createElement('a');
          link.href = data;
          link.download = 'Comprobantes_' + this.formatDate + '.zip';
          link.click();
        }, (error) => this.globalService.warning('Fallo del servicio: ', error.message));
    }
    else {
      this.globalService.warning('Nota:', 'No existe ningún registro seleccionado.');
    }
  }
}
