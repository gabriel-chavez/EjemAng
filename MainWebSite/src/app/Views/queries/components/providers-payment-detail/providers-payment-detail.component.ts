import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MassivePaymentsSpreadsheetsDto } from '../../../../Services/mass-payments/Models/massive-payments-spreadsheets-dto';
import { ProvidersPaymentData } from '../../../../Services/mass-payments/Models/providers-payments/providers-payment-data';
import { ProvidersPaymentsService } from '../../../../Services/mass-payments/providers-payments.service';
import { GlobalService } from '../../../../Services/shared/global.service';

@Component({
  selector: 'app-providers-payment-detail',
  templateUrl: './providers-payment-detail.component.html',
  styleUrls: ['./providers-payment-detail.component.css'],
  providers: [ProvidersPaymentsService]
})
export class ProvidersPaymentDetailComponent implements OnInit, OnChanges {

  @Input() batchId: number;
  detail: ProvidersPaymentData = new ProvidersPaymentData();
  payments: ProvidersPaymentData = new ProvidersPaymentData();
  constructor(private providersPaymentService: ProvidersPaymentsService, private globalService: GlobalService) { }

  ngOnInit() {
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnChanges(changes: SimpleChanges): void {
    this.providersPaymentService.getDetail(new MassivePaymentsSpreadsheetsDto({ id : this.batchId }))
      .subscribe(response => {
        this.detail = response;
        this.payments.speeadsheet = this.detail.speeadsheet.slice(0, 3);
      }, error => this.globalService.danger('Pagos a proveedores', error.message));
}

handlePageChanged($event: number) {
  this.payments.speeadsheet = this.detail.speeadsheet.slice((($event - 1) * 3), 3 * $event);
}

}
