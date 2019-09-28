import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ParametersService } from '../../../../../Services/parameters/parameters.service';
import { MassivePaymentsSpreadsheetsDto } from '../../../../../Services/mass-payments/Models/massive-payments-spreadsheets-dto';
import { MultiplePaymentsService } from '../../../../../Services/mass-payments/multiple-payments-service.service';
import { GlobalService } from '../../../../../Services/shared/global.service';
import { MultiplePaymentDetail } from '../../../../../Services/mass-payments/Models/multiple-payments/multiple-payment-detail';
import { MultiplePaymentSpreadsheetsResult } from '../../../../../Services/mass-payments/Models/multiple-payments/multiple-payment-spreadsheets-result';
import { MultiplePaymentsGetPreviousForm } from '../../../../../Services/mass-payments/Models/multiple-payments/multiple-payments-get-previous-form';
import { Constants } from '../../../../../Services/shared/enums/constants';
import { UtilsService } from '../../../../../Services/shared/utils.service';

@Component({
  selector: 'app-form-achpayments',
  templateUrl: './form-achpayments.component.html',
  styleUrls: ['./form-achpayments.component.css'],
  providers: [MultiplePaymentsService, UtilsService]
})
export class FormAchpaymentsComponent implements OnInit {
  @Input() detail: MultiplePaymentDetail = new MultiplePaymentDetail();
  isDisableAdd: boolean;
  isEdit: boolean;
  index: number;
  lineACH: number;
  @Input() disabled: boolean;
  @Input() requestId: MultiplePaymentsGetPreviousForm;
  @Output() action = new EventEmitter();
  @Output() actionData = new EventEmitter();
  detailPerPage: MultiplePaymentSpreadsheetsResult[] = [];
  exitsData: boolean;
  constructor(private multiplePaymentsService: MultiplePaymentsService,
  private messageService: GlobalService, private utilsService: UtilsService) {
    this.lineACH = 0;
    this.disabled = false;
  }

  ngOnInit() {
    if (this.requestId.id === undefined) {
      if (this.detail.detail.length === 0) {
        this.handleNewRow();
      } else {
        this.handleSumtotal(this.detail);
        this.utilsService.validateAmountZero(this.detail);
      }
    } else {
      this.getDetailList();
    }
  }

  getDetailList() {
    if (this.requestId.id !== undefined) {
      this.requestId.paymentType = Constants.ACH_PAYMENT;
      this.multiplePaymentsService.getFormPrevious(this.requestId)
        .subscribe((resp: MultiplePaymentSpreadsheetsResult[]) => {
            this.isEdit = false;
            this.detail.detail = resp;
            if (this.detail.detail.length === 0) {
              this.requestId.id = undefined;
              this.exitsData = false;
                this.actionData.emit(this.exitsData);
            } else {
              this.handleSumtotal(this.detail);
              this.utilsService.validateAmountZero(this.detail);
            }
        }, (error) => this.messageService.danger('Fallo en Servidor', error.message));
    }
  }

  handlePageChanged($event: number) {
    this.detailPerPage = this.detail.detail.slice((($event - 1) * 10), 10 * $event);
  }

  handleSumtotal($event: MultiplePaymentDetail) {
    this.detail.totalamount = Math.round(($event.detail.reduce((sum, item) => sum + item.amount, 0)) * 1e12) / 1e12;
    for (let i = 0 ; i < $event.detail.length; i++) {
      this.lineACH = $event.detail[i].line;
    }
      this.action.emit(this.detail);
  }

  handleNewRow() {
    this.lineACH++;
    this.isDisableAdd = true;
    this.isEdit = true;
    this.detail.detail.push(new MultiplePaymentSpreadsheetsResult({ line: this.lineACH, isEdit: true }));
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
        this.lineACH--;
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
