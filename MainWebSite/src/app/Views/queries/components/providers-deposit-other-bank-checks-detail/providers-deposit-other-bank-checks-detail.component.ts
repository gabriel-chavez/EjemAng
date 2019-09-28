import { Component, Input, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { ProvidersDepositInOtherBankCheckData } from '../../../../Services/providersDepositInOtherBankCheck/models/providers-deposit-in-other-bank-check-data';
import { ProvidersDepositInOtherBankCheckSpreadsheetsDto } from '../../../../Services/providersDepositInOtherBankCheck/models/providers-deposit-in-other-bank-check-spreadsheets-dto';
import { ProvidersDepositInOtherBankCheckService } from '../../../../Services/providersDepositInOtherBankCheck/providers-deposit-in-other-bank-check.service';
import { GlobalService } from '../../../../Services/shared/global.service';

@Component({
  selector: 'app-providers-deposit-other-bank-checks-detail',
  templateUrl: './providers-deposit-other-bank-checks-detail.component.html',
  styleUrls: ['./providers-deposit-other-bank-checks-detail.component.css'],
  providers: [ProvidersDepositInOtherBankCheckService]
})
export class ProvidersDepositOtherBankChecksDetailComponent implements OnInit, OnChanges {
  @Input() batchId: number;
  detail: ProvidersDepositInOtherBankCheckData = new ProvidersDepositInOtherBankCheckData();
  payments: ProvidersDepositInOtherBankCheckData = new ProvidersDepositInOtherBankCheckData();

  constructor(private ProvidersDepositInOtherBankCheckService: ProvidersDepositInOtherBankCheckService, private globalService: GlobalService) { }

  ngOnInit() {
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngOnChanges(changes: SimpleChanges): void {
    this.ProvidersDepositInOtherBankCheckService.getDetail(new ProvidersDepositInOtherBankCheckSpreadsheetsDto({ id: this.batchId }))
      .subscribe(response => {
        this.detail = response;
        this.payments.speeadsheet = this.detail.speeadsheet.slice(0, 3);
      }, error => this.globalService.danger('Proveedores Otro Cheque', error.message));
  }

  handlePageChanged($event: number) {
    this.payments.speeadsheet = this.detail.speeadsheet.slice((($event - 1) * 3), 3 * $event);
  }
}
