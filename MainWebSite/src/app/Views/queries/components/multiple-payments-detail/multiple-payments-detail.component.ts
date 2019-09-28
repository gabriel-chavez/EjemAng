import { Component, OnInit, Input, SimpleChanges, OnChanges, Output, EventEmitter } from '@angular/core';
import { MultiplePaymentsData } from '../../../../Services/mass-payments/Models/multiple-payments/multiple-payments-data';
import { MultiplePaymentsService } from '../../../../Services/mass-payments/multiple-payments-service.service';
import { MassivePaymentsSpreadsheetsDto } from '../../../../Services/mass-payments/Models/massive-payments-spreadsheets-dto';
import { GlobalService } from '../../../../Services/shared/global.service';
import { UserService } from '../../../../Services/users/user.service';
import { MultiplePaymentSpreadsheetsResult } from '../../../../Services/mass-payments/Models/multiple-payments/multiple-payment-spreadsheets-result';
import { ItemMultiplePaymentUpdate } from '../../../../Services/mass-payments/Models/multiple-payments/item-multiple-payment-update';
import { MultiplePaymentUpdateDto } from '../../../../Services/mass-payments/Models/multiple-payments/multiple-payment-update-dto';
import { CurrencyPipe } from '@angular/common';
import { Constants } from '../../../../Services/shared/enums/constants';

@Component({
  selector: 'app-multiple-payments-detail',
  templateUrl: './multiple-payments-detail.component.html',
  styleUrls: ['./multiple-payments-detail.component.css'],
  providers: [MultiplePaymentsService, CurrencyPipe]
})
export class MultiplePaymentsDetailComponent implements OnInit, OnChanges {

  @Input() batchId: number;
  @Input() isShow: boolean;
  @Input() isAuthorize: boolean;
  @Output() onChangeDetail = new EventEmitter();
  detail: MultiplePaymentsData = new MultiplePaymentsData();
  payments: MultiplePaymentsData = new MultiplePaymentsData();
  isVisibleAch: boolean;
  isVisibleCash: boolean;
  isVisibleProviders: boolean;
  isVisibleSalaries: boolean;
  isAuthorizeFtp: boolean;
  pageSize = 5;
  multiplePaymentUpdateDto: MultiplePaymentUpdateDto = new MultiplePaymentUpdateDto();
  updateMultiplePayments: ItemMultiplePaymentUpdate[] = [];
  isCredentialsValidationVisible: boolean;

  constructor(private multiplePaymentsService: MultiplePaymentsService,
    private globalService: GlobalService,
    private currencyPipe: CurrencyPipe,
    private userService: UserService) {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.isAuthorizeFtp = this.userService.getUserToken().authorize_ftp && this.isAuthorize;
    if (this.isShow) {
      this.getDetail();
    }
  }

  getDetail() {
    this.updateMultiplePayments = [];
    this.multiplePaymentUpdateDto = new MultiplePaymentUpdateDto();
    this.multiplePaymentsService.getDetail(new MassivePaymentsSpreadsheetsDto({ id: this.batchId }))
      .subscribe(response => {
        this.detail = response;
        this.detail.speeadsheet.formAchPayments.length > 0 ? this.isVisibleAch = true : this.isVisibleAch = false;
        this.detail.speeadsheet.formCashPayments.length > 0 ? this.isVisibleCash = true : this.isVisibleCash = false;
        this.detail.speeadsheet.formProvidersPayments.length > 0 ? this.isVisibleProviders = true : this.isVisibleProviders = false;
        this.detail.speeadsheet.formSalariesPayments.length > 0 ? this.isVisibleSalaries = true : this.isVisibleSalaries = false;
        const pageInit = 1;
        if (this.payments.speeadsheet.formSalariesPayments && this.payments.speeadsheet.formSalariesPayments.length > 0) {
          this.payments.speeadsheet.formSalariesPayments = this.detail.speeadsheet.formSalariesPayments.slice(((pageInit - 1) * this.pageSize), this.pageSize * pageInit);
        }
        if (this.payments.speeadsheet.formProvidersPayments && this.payments.speeadsheet.formProvidersPayments.length > 0) {
          this.payments.speeadsheet.formProvidersPayments = this.detail.speeadsheet.formProvidersPayments.slice(((pageInit - 1) * this.pageSize), this.pageSize * pageInit);
        }
        if (this.payments.speeadsheet.formCashPayments && this.payments.speeadsheet.formCashPayments.length > 0) {
          this.payments.speeadsheet.formCashPayments = this.detail.speeadsheet.formCashPayments.slice(((pageInit - 1) * this.pageSize), this.pageSize * pageInit);
        }
        if (this.payments.speeadsheet.formAchPayments && this.payments.speeadsheet.formAchPayments.length > 0) {
          this.payments.speeadsheet.formAchPayments = this.detail.speeadsheet.formAchPayments.slice(((pageInit - 1) * this.pageSize), this.pageSize * pageInit);
        }
      }, (error) => this.globalService.danger('No se pudo obtener el Detalle', error.message));
  }

  handlePageChangedSalaries($event: number) {
    this.payments.speeadsheet.formSalariesPayments = this.detail.speeadsheet.formSalariesPayments.slice((($event - 1) * this.pageSize), this.pageSize * $event);
  }

  handlePageChangedProviders($event: number) {
    this.payments.speeadsheet.formProvidersPayments = this.detail.speeadsheet.formProvidersPayments.slice((($event - 1) * this.pageSize), this.pageSize * $event);
  }

  handlePageChangedCash($event: number) {
    this.payments.speeadsheet.formCashPayments = this.detail.speeadsheet.formCashPayments.slice((($event - 1) * this.pageSize), this.pageSize * $event);
  }

  handlePageChangedAch($event: number) {
    this.payments.speeadsheet.formAchPayments = this.detail.speeadsheet.formAchPayments.slice((($event - 1) * this.pageSize), this.pageSize * $event);
  }

  handleRemove(data: MultiplePaymentSpreadsheetsResult) {
    data.isDelete = true;
    this.updateTotalAmount(data.multiplePaymentId, 0);
    data.isEdit = false;
  }

  handleSave(data: MultiplePaymentSpreadsheetsResult) {
    if (data.amount <= 0) {
      this.globalService.danger('Actualización de montos', `El monto no puede ser 0`);
    } else {
      this.updateTotalAmount(data.multiplePaymentId, data.amount);
      data.isEdit = false;
    }
  }

  handleCredentialsValidationSubmit($event: any) {
    this.multiplePaymentUpdateDto.multiplePayments = this.updateMultiplePayments;
    this.multiplePaymentUpdateDto.tokenCode = $event.code;
    this.multiplePaymentUpdateDto.tokenName = $event.name;

    this.multiplePaymentsService.updateMultiplePayments(this.multiplePaymentUpdateDto)
      .subscribe(response => {
        this.isCredentialsValidationVisible = false;
        this.getDetail();
        this.globalService.success('Actualización de montos', `Se actualizó  correctamente el lote ${this.batchId}, su nuevo monto es: ${this.currencyPipe.transform(response.totalAmount)}`, true);
        this.onChangeDetail.emit();
      }, error => this.globalService.danger('Autorización', error.message));
  }

  updateTotalAmount(paymentId: number, newAmount: number) {
    const index = this.updateMultiplePayments.findIndex(x => x.multiplePaymentId === paymentId);
    if (index > -1) {
      this.updateMultiplePayments.splice(index, 1);
    }
    this.detail.amount = this.detail.speeadsheet.formAchPayments.map(x => !x.isDelete ? +x.amount : 0)
      .concat(this.detail.speeadsheet.formCashPayments.map(x => !x.isDelete ? +x.amount : 0))
      .concat(this.detail.speeadsheet.formProvidersPayments.map(x => !x.isDelete ? +x.amount : 0))
      .concat(this.detail.speeadsheet.formSalariesPayments.map(x => !x.isDelete ? +x.amount : 0))
      .reduce((a, b) => a + b, 0);
    this.updateMultiplePayments.push({ multiplePaymentId: paymentId, amount: newAmount });
  }

}
