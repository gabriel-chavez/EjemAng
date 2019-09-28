import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { MassivePaymentsSpreadsheetsDto } from '../../../../Services/mass-payments/Models/massive-payments-spreadsheets-dto';
import { PaymentAchData } from '../../../../Services/mass-payments/Models/payment-ach/payment-ach-data';
import { PaymentOddAchData } from '../../../../Services/mass-payments/Models/payment-odd-ach/payment-odd-ach-data';
import { PaymentAchService } from '../../../../Services/mass-payments/payment-ach.service';
import { GlobalService } from '../../../../Services/shared/global.service';

@Component({
  selector: 'app-payment-bank-ach-detail',
  templateUrl: './payment-bank-ach-detail.component.html',
  styleUrls: ['./payment-bank-ach-detail.component.css'],
  providers: [PaymentAchService]
})
export class PaymentBankAchDetailComponent implements OnInit {
  @Input() batchId: number;
  detail: PaymentAchData = new PaymentAchData();
  payments: PaymentAchData = new PaymentAchData();

  constructor(private paymentAchService: PaymentAchService, private globalService: GlobalService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.paymentAchService.getDetail(new MassivePaymentsSpreadsheetsDto({ id: this.batchId }))
      .subscribe(response => {
        this.detail = response;
        this.payments.spreadsheet = this.detail.spreadsheet.slice(0, 3);
      }, error => this.globalService.danger('Pagos ACH.', error.message));
  }

  handlePageChanged($event: number) {
    this.payments.spreadsheet = this.detail.spreadsheet.slice((($event - 1) * 3), 3 * $event);
  }
}
