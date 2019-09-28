import { Component, OnInit, Input } from '@angular/core';
import { GlobalService } from '../../../../../Services/shared/global.service';
import { GetElectronicVouchersResponse } from '../../../../../Services/vouchers/electronic-voucher/models/get-electronic-vouchers-response';
import { ElectronicVoucherService } from '../../../../../Services/vouchers/electronic-voucher/electronic-voucher.service';


@Component({
  selector: 'app-table-electronic-voucher',
  templateUrl: './table-electronic-voucher.component.html',
  styleUrls: ['./table-electronic-voucher.component.css'],
  providers: [ElectronicVoucherService]
})
export class TableElectronicVoucherComponent implements OnInit {

  @Input() listElectronicVoucher: GetElectronicVouchersResponse = new GetElectronicVouchersResponse();

  constructor(private globalService: GlobalService,
              private electronicVoucherService: ElectronicVoucherService) { }

  ngOnInit() {
  }
  handleGetReport(listElectronicVouchersResponse: GetElectronicVouchersResponse) {
      this.electronicVoucherService.getReport(listElectronicVouchersResponse)
      .subscribe((resp: Blob) => {
        if (navigator.msSaveBlob) {
          return navigator.msSaveOrOpenBlob(resp, 'Reporte Comprobantes Electronicos');
        }
        const data = window.URL.createObjectURL(resp);
        const link = document.createElement('a');
        link.href = data;
        link.download = 'RptCompElt';
        link.click();
      }, (error) => this.globalService.danger('Fallo del servicio: ', error.message));

  }
}
