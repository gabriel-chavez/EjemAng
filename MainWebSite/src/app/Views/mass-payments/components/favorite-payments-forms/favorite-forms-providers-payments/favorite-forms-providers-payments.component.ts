import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FavoritePaymentsService } from '../../../../../Services/mass-payments/favorite-payments.service';
import { MassivePaymentsSpreadsheetsDto } from '../../../../../Services/mass-payments/Models/massive-payments-spreadsheets-dto';
import { GlobalService } from '../../../../../Services/shared/global.service';
import { FavoritePaymentDetail } from '../../../../../Services/mass-payments/Models/favorite-payments/favorite-payment-detail';
import { FavoritePaymentsSpreadsheetsResult } from '../../../../../Services/mass-payments/Models/favorite-payments/favorite-payments-spreadsheets-result';
import { Constants } from '../../../../../Services/shared/enums/constants';
import { AccountProviderDto } from '../../../../../Services/mass-payments/Models/account-provider-dto';
import { AccountClientResult } from '../../../../../Services/mass-payments/Models/account-client-result';
import { UtilsService } from '../../../../../Services/shared/utils.service';

@Component({
  selector: 'app-favorite-forms-providers-payments',
  templateUrl: './favorite-forms-providers-payments.component.html',
  styleUrls: ['./favorite-forms-providers-payments.component.css'],
  providers: [FavoritePaymentsService, UtilsService]
})
export class FavoriteFormsProvidersPaymentsComponent implements OnInit {

  @Input() detail: FavoritePaymentDetail;
  @Input() typeOfLoad: string;
  isDisableAdd: boolean;
  isEdit: boolean;
  index: number;
  linePROV: number;
  detailPerPage: FavoritePaymentsSpreadsheetsResult[] = [];
  @Output() action = new EventEmitter();
  @Input() requestId: MassivePaymentsSpreadsheetsDto;
  @Input() disabled: boolean;
  @Output() actionData = new EventEmitter();
  exitsData: boolean;
  accountVerify: AccountProviderDto[] = [];
  constructor(private favoritePaymentsService: FavoritePaymentsService,
    private messageService: GlobalService, private utilsService: UtilsService) {
    this.linePROV = 0;
    this.disabled = false;
  }

  ngOnInit() {
    this.requestId.paymentType = Constants.PROVIDERS_PAYMENT;
    switch (this.typeOfLoad) {
      case Constants.TYPEOFLOAD_FILECHARGE:
        this.detail.typeOfLoad = this.typeOfLoad;
        for (let i = 0; i < this.detail.detail.length; i++) {
          this.detail.detail[i].typeOfLoad = this.typeOfLoad;
        }
        this.handleSumtotal(this.detail);
        this.utilsService.validateAmountZero(this.detail);
        break;
      case Constants.TYPEOFLOAD_AUTOMATIC:
        this.detail.typeOfLoad = this.typeOfLoad;
        this.getPreviousDetailList();
        break;
      case Constants.TYPEOFLOAD_MANUAL:
        this.detail.typeOfLoad = this.typeOfLoad;
        this.getManualDetailList();
        break;
    }
  }

  handlePageChanged($event: number) {
    this.detailPerPage = this.detail.detail.slice((($event - 1) * 10), 10 * $event);
  }

  getPreviousDetailList() {
    if (this.requestId.id !== undefined) {
      this.favoritePaymentsService.getPreviousForm(this.requestId)
        .subscribe((resp: FavoritePaymentsSpreadsheetsResult[]) => {
          if (!this.verifyContainData(resp)) {
            this.isEdit = false;
            this.detail.detail = resp;
            for (let i = 0; i < this.detail.detail.length; i++) {
              this.detail.detail[i].typeOfLoad = this.typeOfLoad;
              this.detail.detail[i].isChecked = true;
            }
            this.verifyAccount(this.detail);
            this.utilsService.validateAmountZero(this.detail);
          }
        }, (error) => this.messageService.danger('No se puedieron obtener los pagos anteriores', error.message));
    }
  }

  getManualDetailList() {
    this.favoritePaymentsService.getManualChargeForm(this.requestId)
      .subscribe((resp: FavoritePaymentsSpreadsheetsResult[]) => {
        if (!this.verifyContainData(resp)) {
          this.isEdit = false;
          this.detail.detail = resp;
          for (let i = 0; i < this.detail.detail.length; i++) {
            this.detail.detail[i].typeOfLoad = this.typeOfLoad;
            this.detail.detail[i].isChecked = false;
          }
          this.verifyAccount(this.detail);
        }
      }, (error) => this.messageService.danger('No se pudo cargar la configuracion favorita', error.message));
  }

  handleSumtotal($event: FavoritePaymentDetail) {
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
        for (let i = 0; i < responseaccount.length; i++) {
          if (responseaccount[i].isOk) {
            $event.detail[i].titularName = responseaccount[i].titularAccount;
          } else {
            $event.detail.splice($event.detail.indexOf($event.detail[i], i), i + 1);
            responseaccount.splice(responseaccount.indexOf(responseaccount[i], i), i + 1);
          }
        }
        if ($event.detail.length === 0) {
          this.verifyContainData($event.detail);
        } else if (this.typeOfLoad === Constants.TYPEOFLOAD_AUTOMATIC) {
          this.handleSumtotal($event);
        }
      }, (error) => this.messageService.danger('Fallo en la verificación de cuentas', error));
  }

  handleActionRow($event) {
    switch ($event.action) {
      case 'accept':
        this.action.emit($event.data);
        this.isDisableAdd = false;
        break;
    }
  }
}
