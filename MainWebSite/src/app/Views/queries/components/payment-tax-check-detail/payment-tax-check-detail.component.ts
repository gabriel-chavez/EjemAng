import { Component, Input, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { GlobalService } from '../../../../Services/shared/global.service';
import { PaymentTaxCheckData } from '../../../../Services/taxPaymentCheck/models/payment-tax-check-data';
import { PaymentTaxCheckSpreadsheetsRequest } from '../../../../Services/taxPaymentCheck/models/payment-tax-check-spreadsheets-request';
import { TaxPaymentCheckService } from '../../../../Services/taxPaymentCheck/tax-payment-check.service';

@Component({
  selector: 'app-payment-tax-check-detail',
  templateUrl: './payment-tax-check-detail.component.html',
  styleUrls: ['./payment-tax-check-detail.component.css'],
  providers: [TaxPaymentCheckService]
})
export class PaymentTaxCheckDetailComponent implements OnInit, OnChanges {
  @Input() batchId: number;
  detail: PaymentTaxCheckData = new PaymentTaxCheckData();
  payments: PaymentTaxCheckData = new PaymentTaxCheckData();

  constructor(private TaxPaymentCheckService: TaxPaymentCheckService, private globalService: GlobalService) { }

  ngOnInit() {
  }
// tslint:disable-next-line:use-life-cycle-interface
ngOnChanges(changes: SimpleChanges): void {
  this.TaxPaymentCheckService.getDetail(new PaymentTaxCheckSpreadsheetsRequest({ id: this.batchId }))
    .subscribe(response => {
      this.detail = response;
      this.payments.speeadsheet = this.detail.speeadsheet.slice(0, 3);
    }, error => this.globalService.danger('Pago Impuestos Cheque Gerencia', error.message));
}

handlePageChanged($event: number) {
  this.payments.speeadsheet = this.detail.speeadsheet.slice((($event - 1) * 3), 3 * $event);
}
}
