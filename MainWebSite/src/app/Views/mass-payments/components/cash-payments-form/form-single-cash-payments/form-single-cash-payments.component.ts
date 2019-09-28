import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CashPaymentDetail } from '../../../../../Services/mass-payments/Models/cash-payments/cash-payment-detail';
import { MassivePaymentsSpreadsheetsDto } from '../../../../../Services/mass-payments/Models/massive-payments-spreadsheets-dto';
import { CashPaymentsService } from '../../../../../Services/mass-payments/cash-payments.service';
import { GlobalService } from '../../../../../Services/shared/global.service';
import { CashPaymentsSpreadsheetsResult } from '../../../../../Services/mass-payments/Models/cash-payments/cash-payments-spreadsheets-result';
import { SalariesPaymentsService } from '../../../../../Services/mass-payments/salaries-payments.service';
import { UtilsService } from '../../../../../Services/shared/utils.service';

@Component({
  selector: 'app-form-single-cash-payments',
  templateUrl: './form-single-cash-payments.component.html',
  styleUrls: ['./form-single-cash-payments.component.css'],
  providers: [SalariesPaymentsService, UtilsService]
})
export class FormSingleCashPaymentsComponent implements OnInit {

  @Input() detail: CashPaymentDetail;
  isDisableAdd: boolean;
  isEdit: boolean;
  index: number;
  detailPerPage: CashPaymentsSpreadsheetsResult[] = [];
  @Input() requestId: MassivePaymentsSpreadsheetsDto;
  @Output() action = new EventEmitter();
  @Input() disabled = false;

  constructor(private cashPaymentsService: CashPaymentsService,
    private messageService: GlobalService, private utilsService: UtilsService) { }

  ngOnInit() {
    if (this.requestId.id === undefined) {
      if (this.detail.detail.length === 0) {
        this.handleNewRow();
      } else {
        this.handleDetail(this.detail);
        this.utilsService.validateAmountZero(this.detail);
      }
    } else {
      this.getDetailList();
    }
  }

  getDetailList() {
    if (this.requestId !== undefined) {
      this.cashPaymentsService.getForms(this.requestId)
        .subscribe((response: CashPaymentsSpreadsheetsResult[]) => {
            this.isEdit = false;
            this.detail.detail = response;
            this.handleDetail(this.detail);
            this.utilsService.validateAmountZero(this.detail);
        }, (error) => this.messageService.danger('Fallo en Servidor', error.message));
    }
  }

  handleDetail($event) {
    for (let i = 0 ; i < $event.detail.length; i++) {
      this.detail.totalamount += +$event.detail[i].amount;
    }
    this.action.emit(this.detail);
  }

  handlePageChanged($event: number) {
    this.detailPerPage = this.detail.detail.slice((($event - 1) * 10), 10 * $event);
  }

  handleNewRow() {
    this.isDisableAdd = true;
    this.isEdit = true;
    this.detail.detail.push(new CashPaymentsSpreadsheetsResult({ isEdit: true }));
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
