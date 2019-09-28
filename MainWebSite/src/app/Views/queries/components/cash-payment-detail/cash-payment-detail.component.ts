import { Component, Input, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { CashPaymentsService } from '../../../../Services/mass-payments/cash-payments.service';
import { CashPaymentData } from '../../../../Services/mass-payments/Models/cash-payments/cash-payment-data';
import { MassivePaymentsSpreadsheetsDto } from '../../../../Services/mass-payments/Models/massive-payments-spreadsheets-dto';
import { GlobalService } from '../../../../Services/shared/global.service';

@Component({
  selector: 'app-cash-payment-detail',
  templateUrl: './cash-payment-detail.component.html',
  styleUrls: ['./cash-payment-detail.component.css'],
  providers: [CashPaymentsService]
})
export class CashPaymentDetailComponent implements OnInit, OnChanges {
  @Input() batchId: number;
  detail: CashPaymentData = new CashPaymentData();
  payments: CashPaymentData = new CashPaymentData();

  constructor(private cashPaymentService: CashPaymentsService, private globalService: GlobalService) { }

  ngOnInit() {
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    this.cashPaymentService.getDetail(new MassivePaymentsSpreadsheetsDto({ id : this.batchId }))
      .subscribe(response => {
        this.detail = response;
        this.payments.speeadsheet = this.detail.speeadsheet.slice(0, 3);
      }, error => this.globalService.danger('Pagos en Efectivo', error.message));
  }

  handlePageChanged($event: number) {
    this.payments.speeadsheet = this.detail.speeadsheet.slice((($event - 1) * 3), 3 * $event);
  }

}
