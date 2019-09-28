import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FavoritePaymentsService } from '../../../../../Services/mass-payments/favorite-payments.service';
import { StatusFavoritePayment } from '../../../../../Services/shared/enums/status-favorite-payment';
import { MassivePaymentsSpreadsheetsDto } from '../../../../../Services/mass-payments/Models/massive-payments-spreadsheets-dto';
import { GlobalService } from '../../../../../Services/shared/global.service';
import { FavoritePaymentsSpreadsheetsResult } from '../../../../../Services/mass-payments/Models/favorite-payments/favorite-payments-spreadsheets-result';
import { FavoritePaymentDetail } from '../../../../../Services/mass-payments/Models/favorite-payments/favorite-payment-detail';
import { Constants } from '../../../../../Services/shared/enums/constants';
import { AccountProviderDto } from '../../../../../Services/mass-payments/Models/account-provider-dto';
import { AccountClientResult } from '../../../../../Services/mass-payments/Models/account-client-result';
import { UtilsService } from '../../../../../Services/shared/utils.service';

@Component({
  selector: 'app-form-providers-payments',
  templateUrl: './form-providers-payments.component.html',
  styleUrls: ['./form-providers-payments.component.css'],
  providers: [FavoritePaymentsService, UtilsService]
})
export class FormProvidersPaymentsComponent implements OnInit {

  @Input() detail: FavoritePaymentDetail;
  @Input() typeOfLoad: string;
  removed: FavoritePaymentDetail = new FavoritePaymentDetail();
  isDisableAdd: boolean;
  isEdit: boolean;
  index: number;
  linePROV: number;
  detailPerPage: FavoritePaymentsSpreadsheetsResult[] = [];
  @Output() action = new EventEmitter();
  requestId: MassivePaymentsSpreadsheetsDto =  new MassivePaymentsSpreadsheetsDto();
  @Input() disabled: boolean;
  @Output() actionData = new EventEmitter();
  @Output() actionRemoved = new EventEmitter();
  @Output() dataVerify = new EventEmitter();
  exitsData: boolean;
  accountVerify: AccountProviderDto[] = [];
  errorCounter = 0;
  constructor(private favoritePaymentsService: FavoritePaymentsService,
  private messageService: GlobalService, private utilsService: UtilsService) {
    this.linePROV = 0;
    this.disabled = false;
   }

  ngOnInit() {
    this.requestId.paymentType = Constants.PROVIDERS_PAYMENT;
    if (this.typeOfLoad === Constants.TYPEOFLOAD_FILECHARGE) {
      this.verifyAccount(this.detail);
      this.utilsService.validateAmountZero(this.detail);
    } else if (this.typeOfLoad === Constants.TYPEOFLOAD_MANUAL && !this.detail.isNew) {
      this.getDetailList();
    } else {
      this.handleNewRow();
    }
  }
  getDetailList() {
      this.favoritePaymentsService.getManualChargeForm(this.requestId)
        .subscribe((resp: FavoritePaymentsSpreadsheetsResult[]) => {
          if (!this.verifyContainData(resp)) {
            this.isEdit = false;
            this.detail.detail = resp;
            this.dataVerify.emit(this.detail.detail);
            this.verifyAccount(this.detail);
            this.utilsService.validateAmountZero(this.detail);
          }
        }, (error) => this.messageService.danger('Fallo en Servidor', error.message));
  }
  handlePageChanged($event: number) {
    this.detailPerPage = this.detail.detail.slice((($event - 1) * 10), 10 * $event);
  }
  handleSumtotal($event: FavoritePaymentDetail) {
    for (let i = 0; i < $event.detail.length; i++) {
      $event.detail[i].typeOfLoad = this.typeOfLoad;
      this.linePROV = $event.detail[i].line;
    }
    this.detail.totalamount = Math.round(($event.detail.reduce((sum, item) => sum + item.amount, 0)) * 1e12) / 1e12;
    this.action.emit($event);
  }

  verifyContainData($event: FavoritePaymentsSpreadsheetsResult[]) {
    if ($event.length === 0) {
      this.requestId.id = undefined;
      this.exitsData = false;
      this.actionData.emit(this.exitsData);
      return true;
    }
  }

  verifyAccount($event: FavoritePaymentDetail) {
    for (let i = 0; i < $event.detail.length; i++) {
      this.accountVerify.push($event.detail[i]);
    }

    this.favoritePaymentsService.verifyProvidersAccounts(this.accountVerify)
      .subscribe((responseaccount: AccountClientResult[]) => {
        if (this.utilsService.countErrorsMassivePayments(responseaccount)) {
        for (let i = 0; i < $event.detail.length; i++) {
          $event.detail[i].branchOfficeId = 0;
          if (responseaccount[i].isOk) {
            $event.detail[i].titularName = responseaccount[i].titularAccount;
            this.handleSumtotal($event);
          } else {
           $event.detail[i].titularName = responseaccount[i].titularAccount;
            this.errorCounter++;
           $event.detail[i].isEdit = true;
          }
        }
      } else {
        this.requestId.id = undefined;
        this.exitsData = false;
        this.actionData.emit(this.exitsData);
        this.detail.detail = [];
        this.messageService.danger('Error en la planilla de Proveedores', ' los pagos sobrepasaron la cantidad maxima de 10 errores por planilla y por tanto no seran validos los pagos de Proveedores');
      }
      }, (error) => this.messageService.danger('Fallo en la verificación de cuentas', error));
  }

  handleNewRow() {
    this.linePROV++;
    this.isDisableAdd = true;
    this.isEdit = true;
    this.detail.detail.push(new FavoritePaymentsSpreadsheetsResult({ line: this.linePROV,
       isEdit: true,  operationStatusId: 1, isDeleted: false }));
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
      this.handleLogicalDelete($event.data);
        this.detail.detail.splice(this.index, 1);
        this.detail.totalamount = 0;
        for (let i = 0 ; i < this.detail.detail.length; i++) {
          this.detail.totalamount += +this.detail.detail[i].amount;
        }
        this.linePROV--;
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
  handleLogicalDelete($event) {
    if ($event.isDeleted === true && ($event.operationStatusId === StatusFavoritePayment.PROCESSED
      || $event.operationStatusId === StatusFavoritePayment.EDIT_PROCESSED)) {
      this.removed.detail = $event;
      this.actionRemoved.emit(this.removed);
    }
  }
}
