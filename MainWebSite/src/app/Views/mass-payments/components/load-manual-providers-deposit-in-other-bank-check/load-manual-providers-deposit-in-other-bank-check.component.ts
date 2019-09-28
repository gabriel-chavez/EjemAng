import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ProvidersDepositInOtherBankCheckService } from '../../../../Services/providersDepositInOtherBankCheck/providers-deposit-in-other-bank-check.service';
import { ProvidersDepositInOtherBankCheckSpreadsheetsDto } from '../../../../Services/providersDepositInOtherBankCheck/models/providers-deposit-in-other-bank-check-spreadsheets-dto';
import { ProvidersDepositInOtherBankCheckSpreadsheetsResult } from '../../../../Services/providersDepositInOtherBankCheck/models/providers-deposit-in-other-bank-check-spreadsheets-result';
import { ProvidersDepositInOtherBankCheckDetail } from '../../../../Services/providersDepositInOtherBankCheck/models/providers-deposit-in-other-bank-check-detail';
import { GlobalService } from '../../../../Services/shared/global.service';
import { UtilsService } from '../../../../Services/shared/utils.service';

@Component({
  selector: 'app-load-manual-providers-deposit-in-other-bank-check',
  templateUrl: './load-manual-providers-deposit-in-other-bank-check.component.html',
  styleUrls: ['./load-manual-providers-deposit-in-other-bank-check.component.css'],
  providers: [ProvidersDepositInOtherBankCheckService, UtilsService]
})
export class LoadManualProvidersDepositInOtherBankCheckComponent implements OnInit {
  @Input() detail: ProvidersDepositInOtherBankCheckDetail = new ProvidersDepositInOtherBankCheckDetail();
  isDisableAdd: boolean;
  isEdit: boolean;
  index: number;
  detailPerPage: ProvidersDepositInOtherBankCheckSpreadsheetsResult[] = [];
  @Input() requestId: ProvidersDepositInOtherBankCheckSpreadsheetsDto;
  @Output() action = new EventEmitter();
  @Input() disabled = false;

  constructor(private ProvidersDepositInOtherBankCheckService: ProvidersDepositInOtherBankCheckService,
    private messageService: GlobalService, private utilsService: UtilsService) { }

  ngOnInit() {
   if (this.requestId.id === undefined) {
    if (this.detail.detail.length === 0) {
      this.handleNewRow();
    } else {
      this.handleDetail(this.detail.detail);
      this.utilsService.validateAmountZero(this.detail);
    }
  } else {
  this.getDetailList();
  this.utilsService.validateAmountZero(this.detail);
  }
}
  getDetailList() {
    if (this.requestId !== undefined) {
      this.ProvidersDepositInOtherBankCheckService.getForms(this.requestId)
        .subscribe((response: ProvidersDepositInOtherBankCheckSpreadsheetsResult[]) => {
            this.isEdit = false;
            this.detail.detail = response;
            this.handleDetail(this.detail.detail);
        }, (error) => this.messageService.danger('Fallo en Servidor', error.message));
    }
  }
  handleDetail($event) {
    for (let i = 0 ; i < this.detail.detail.length; i++) {
      this.detail.totalamount += +this.detail.detail[i].amount;
    }
    this.action.emit(this.detail);
  }
  handleNewRow() {
    this.isDisableAdd = true;
    this.isEdit = true;
    this.detail.detail.push(new ProvidersDepositInOtherBankCheckSpreadsheetsResult({ isEdit: true }));
  }
  handlePageChanged($event: number) {
    this.detailPerPage = this.detail.detail.slice((($event - 1) * 10), 10 * $event);
  }
  handleActionRow($event) {
    this.index = this.detail.detail.indexOf($event.data);
    switch ($event.action) {
      case 'accept':
        this.detail.detail[this.index] = $event.data;
        this.detail.totalamount = 0;
        for (let i = 0 ; i < this.detail.detail.length; i++) {
          this.detail.totalamount += +this.detail.detail[i].amount;
        }
        this.isDisableAdd = false;
        this.action.emit(this.detail);
        this.detail.totalamount = 0;
        break;
      case 'delete':
        this.detail.detail.splice(this.index, 1);
        this.detail.totalamount = 0;
        for (let i = 0 ; i < this.detail.detail.length; i++) {
          this.detail.totalamount += +this.detail.detail[i].amount;
        }
        this.action.emit(this.detail);
        break;
      case 'edit':
      this.detail.totalamount = 0;
        this.isDisableAdd = true;
        break;
      case 'cancel':
      for (let i = 0 ; i < this.detail.detail.length; i++) {
        this.detail.totalamount += +this.detail.detail[i].amount;
      }
        this.isDisableAdd = false;
        this.detail.totalamount = 0;
        break;
    }
  }
}
