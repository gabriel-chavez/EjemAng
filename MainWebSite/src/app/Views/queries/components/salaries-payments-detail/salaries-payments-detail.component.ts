import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MassivePaymentsSpreadsheetsDto } from '../../../../Services/mass-payments/Models/massive-payments-spreadsheets-dto';
import { SalariesPaymentData } from '../../../../Services/mass-payments/Models/salaries-payments/salaries-payment-data';
import { SalariesPaymentsService } from '../../../../Services/mass-payments/salaries-payments.service';
import { GlobalService } from '../../../../Services/shared/global.service';

@Component({
  selector: 'app-salaries-payments-detail',
  templateUrl: './salaries-payments-detail.component.html',
  styleUrls: ['./salaries-payments-detail.component.css'],
  providers: [SalariesPaymentsService]
})
export class SalariesPaymentsDetailComponent implements OnInit, OnChanges {

  @Input() batchId: number;
  detail: SalariesPaymentData = new SalariesPaymentData();
  payments: SalariesPaymentData = new SalariesPaymentData();
  constructor(private salariesPaymentService: SalariesPaymentsService, private globalService: GlobalService) { }

  ngOnInit() {
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnChanges(changes: SimpleChanges): void {
    this.salariesPaymentService.getDetail(new MassivePaymentsSpreadsheetsDto({ id: this.batchId }))
      .subscribe(response => {
        this.detail = response;
        this.payments.speeadsheet = this.detail.speeadsheet.slice(0, 3);
      }, error => this.globalService.danger('Pagos de Haberes', error.message));
  }

  handlePageChanged($event: number) {
    this.payments.speeadsheet = this.detail.speeadsheet.slice((($event - 1) * 3), 3 * $event);
  }

}
