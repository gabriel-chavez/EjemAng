import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MassivePaymentsSpreadsheetsDto } from '../../../../Services/mass-payments/Models/massive-payments-spreadsheets-dto';
import { PaymentOddAchData } from '../../../../Services/mass-payments/Models/payment-odd-ach/payment-odd-ach-data';
import { PaymentOddAchService } from '../../../../Services/mass-payments/payment-odd-ach.service';
import { GlobalService } from '../../../../Services/shared/global.service';

@Component({
  selector: 'app-payment-ach-odd-detail',
  templateUrl: './payment-ach-odd-detail.component.html',
  styleUrls: ['./payment-ach-odd-detail.component.css'],
  providers: [PaymentOddAchService]
})
export class PaymentAchOddDetailComponent implements OnInit, OnChanges {
  @Input() batchId: number;
  detail: PaymentOddAchData = new PaymentOddAchData();
  payments: PaymentOddAchData = new PaymentOddAchData();

  constructor(private paymentOddAchService: PaymentOddAchService,
    private globalService: GlobalService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.paymentOddAchService.getDetail(new MassivePaymentsSpreadsheetsDto({ id: this.batchId }))
      .subscribe(response => {
        this.detail = response;
        this.payments.spreadsheet = this.detail.spreadsheet.slice(0, 3);
      }, error => this.globalService.danger('Pagos AchOdd.', error.message));
  }

  handlePageChanged($event: number) {
    this.payments.spreadsheet = this.detail.spreadsheet.slice((($event - 1) * 3), 3 * $event);
  }
}
