import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { MultiplePaymentsService } from '../../../../../Services/mass-payments/multiple-payments-service.service';
import { GlobalService } from '../../../../../Services/shared/global.service';
import { MultiplePaymentDetail } from '../../../../../Services/mass-payments/Models/multiple-payments/multiple-payment-detail';
import { MultiplePaymentSpreadsheetsResult } from '../../../../../Services/mass-payments/Models/multiple-payments/multiple-payment-spreadsheets-result';
import { MultiplePaymentsGetPreviousForm } from '../../../../../Services/mass-payments/Models/multiple-payments/multiple-payments-get-previous-form';
import { Constants } from '../../../../../Services/shared/enums/constants';
import { AccountClientDto } from '../../../../../Services/mass-payments/Models/account-client-dto';
import { AccountClientResult } from '../../../../../Services/mass-payments/Models/account-client-result';
import { UtilsService } from '../../../../../Services/shared/utils.service';

@Component({
  selector: 'app-form-payments-of-assets',
  templateUrl: './form-payments-of-assets.component.html',
  styleUrls: ['./form-payments-of-assets.component.css'],
  providers: [MultiplePaymentsService, UtilsService]
})
export class FormPaymentsOfAssetsComponent implements OnInit {
  @Input() detail: MultiplePaymentDetail;
  @Input() requestId: MultiplePaymentsGetPreviousForm;
  @Input() disabled: boolean;
  @Output() action = new EventEmitter();
  @Output() actionData = new EventEmitter();
  isDisableAdd: boolean;
  isEdit: boolean;
  index: number;
  detailPerPage: MultiplePaymentSpreadsheetsResult[] = [];
  lineAsset: number;
  exitsData: boolean;
  accountVerify: AccountClientDto[] = [];
  errorCounter = 0;
  quantity = 1;
  constructor(private multiplePaymentsService: MultiplePaymentsService,
    private messageService: GlobalService, private utilsService: UtilsService) {
    this.lineAsset = 0;
    this.disabled = false;

  }

  ngOnInit() {
    if (this.requestId.id === undefined) {
      if (this.detail.detail.length === 0) {
        this.handleNewRow();
      } else {
        this.verifyAccount(this.detail.detail);
        this.utilsService.validateAmountZero(this.detail);
        this.handleSumtotal(this.detail);
      }
    } else {
      this.getDetailList();
    }
  }

  handlePageChanged($event: number) {
    this.detailPerPage = this.detail.detail.slice((($event - 1) * 10), 10 * $event);
  }

  getDetailList() {
    if (this.requestId.id !== undefined) {
      this.requestId.paymentType = Constants.SALARIES_PAYMENT;
      this.multiplePaymentsService.getFormPrevious(this.requestId)
        .subscribe((resp: MultiplePaymentSpreadsheetsResult[]) => {
          this.isEdit = false;
          this.detail.detail = resp;
          if (this.detail.detail.length === 0) {
            this.requestId.id = undefined;
            this.exitsData = false;
            this.actionData.emit(this.exitsData);
          } else {
            this.verifyAccount(this.detail.detail);
            this.utilsService.validateAmountZero(this.detail);
            this.handleSumtotal(this.detail);
          }
        }, (error) => this.messageService.danger(error, Constants.EMPTY_STRING));
    }
  }

  handleSumtotal($event: MultiplePaymentDetail) {
    this.detail.totalamount = Math.round(($event.detail.reduce((sum, item) => sum + item.amount, 0)) * 1e12) / 1e12;
    for (let i = 0 ; i < $event.detail.length; i++) {
      this.lineAsset = $event.detail[i].line;
    }
      this.action.emit(this.detail);
  }

  verifyAccount($event: MultiplePaymentSpreadsheetsResult[]) {
    for (let i = 0; i < $event.length; i++) {
      this.accountVerify.push($event[i]);
    }

    this.multiplePaymentsService.verifySalariesAccounts(this.accountVerify)
      .subscribe((responseaccount: AccountClientResult[]) => {
        if (this.utilsService.countErrorsMassivePayments(responseaccount)) {
          for (let i = 0; i < this.detail.detail.length; i++) {
            this.detail.detail[i].telephoneNumber = this.detail.detail[i].telephoneNumber.trim();
            this.detail.detail[i].branchOfficeId = 0;
            if (responseaccount[i].isOk) {
              this.detail.detail[i].titularName = responseaccount[i].titularAccount;
            } else {
              this.detail.detail[i].titularName = responseaccount[i].titularAccount;
              this.errorCounter++;
              this.detail.detail[i].isEdit = true;
            }
          }
        } else {
          this.requestId.id = undefined;
          this.exitsData = false;
          this.actionData.emit(this.exitsData);
          this.detail.detail = [];
          this.messageService.danger('Error en la planilla de Haberes', ' los pagos sobrepasaron la cantidad maxima de 10 errores por planilla y por tanto no seran validos los pagos de Haberes');
        }
      }, (error) => this.messageService.danger('Fallo en la verificación de cuentas', error));
  }

  handleNewRow() {
    this.lineAsset++;
    this.isDisableAdd = true;
    this.isEdit = true;
    this.detail.detail.push(new MultiplePaymentSpreadsheetsResult({ line: this.lineAsset, isEdit: true }));
  }

  handleActionRow($event) {
    this.index = this.detail.detail.indexOf($event.data);
    switch ($event.action) {
      case 'accept':
        this.detail.detail[this.index] = $event.data;
        this.detail.totalamount = 0;
        for (let i = 0; i < this.detail.detail.length; i++) {
          this.detail.totalamount += +this.detail.detail[i].amount;
        }
        if (!this.detail.detail[this.index].isFail) {
          this.errorCounter--;
        }
        this.isDisableAdd = false;
        this.action.emit(this.detail);
        this.detail.totalamount = 0;
        break;
      case 'delete':
        this.detail.detail.splice(this.index, 1);
        this.detail.totalamount = 0;
        for (let i = 0; i < this.detail.detail.length; i++) {
          this.detail.totalamount += +this.detail.detail[i].amount;
        }
        this.lineAsset--;
        this.action.emit(this.detail);
        break;
      case 'edit':
        this.detail.totalamount = 0;
        this.isDisableAdd = true;
        break;
      case 'cancel':
        for (let i = 0; i < this.detail.detail.length; i++) {
          this.detail.totalamount += +this.detail.detail[i].amount;
        }
        this.isDisableAdd = false;
        this.detail.totalamount = 0;
        break;
    }
  }
}
