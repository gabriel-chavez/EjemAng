import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FavoritePaymentsService } from '../../../../../Services/mass-payments/favorite-payments.service';
import { MassivePaymentsSpreadsheetsDto } from '../../../../../Services/mass-payments/Models/massive-payments-spreadsheets-dto';
import { GlobalService } from '../../../../../Services/shared/global.service';
import { StatusFavoritePayment } from '../../../../../Services/shared/enums/status-favorite-payment';
import { FavoritePaymentDetail } from '../../../../../Services/mass-payments/Models/favorite-payments/favorite-payment-detail';
import { FavoritePaymentsSpreadsheetsResult } from '../../../../../Services/mass-payments/Models/favorite-payments/favorite-payments-spreadsheets-result';
import { Constants } from '../../../../../Services/shared/enums/constants';
import { UtilsService } from '../../../../../Services/shared/utils.service';

@Component({
  selector: 'app-form-achpayments',
  templateUrl: './form-achpayments.component.html',
  styleUrls: ['./form-achpayments.component.css'],
  providers: [FavoritePaymentsService, UtilsService]
})
export class FormAchpaymentsComponent implements OnInit {

  @Input() detail: FavoritePaymentDetail;
  detailAux: FavoritePaymentDetail =  new FavoritePaymentDetail();
  @Input() typeOfLoad: string;
  removed: FavoritePaymentDetail = new FavoritePaymentDetail();
  isDisableAdd: boolean;
  isEdit: boolean;
  index: number;
  lineACH: number;
  @Input() disabled: boolean;
  detailPerPage: FavoritePaymentsSpreadsheetsResult[] = [];
  requestId: MassivePaymentsSpreadsheetsDto = new MassivePaymentsSpreadsheetsDto();
  @Output() action = new EventEmitter();
  @Output() actionData = new EventEmitter();
  @Output() actionRemoved = new EventEmitter();
  @Output() dataVerify = new EventEmitter();
  exitsData: boolean;
  constructor(private favoritePaymentsService: FavoritePaymentsService,
    private messageService: GlobalService, private utilsService: UtilsService) {
    this.lineACH = 0;
    this.disabled = false;
  }

  ngOnInit() {
    this.requestId.paymentType = Constants.ACH_PAYMENT;
    if (this.typeOfLoad === Constants.TYPEOFLOAD_FILECHARGE) {
      this.handleSumtotal(this.detail);
      this.utilsService.validateAmountZero(this.detail);
    } else if (this.typeOfLoad === Constants.TYPEOFLOAD_MANUAL && !this.detail.isNew) {
      this.getDetailList();
    } else {
      this.handleNewRow();
    }
  }

  handlePageChanged($event: number) {
    this.detailPerPage = this.detail.detail.slice((($event - 1) * 10), 10 * $event);
  }

  getDetailList() {
    this.favoritePaymentsService.getManualChargeForm(this.requestId)
      .subscribe((resp: FavoritePaymentsSpreadsheetsResult[]) => {
        if (!this.verifyContainData(resp)) {
          this.isEdit = false;
          this.detail.detail = resp;
          for (let i = 0; i < this.detail.detail.length; i++) {
            this.detail.detail[i].typeOfLoad = this.typeOfLoad;
            this.lineACH = this.detail.detail[i].line;
          }
          this.dataVerify.emit(this.detail.detail);
          this.handleSumtotal(this.detail);
          this.utilsService.validateAmountZero(this.detail);
        }
      }, (error) => this.messageService.danger('No se pudieron obtener los pagos ACH configurados', error.message));
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

  handleNewRow() {
    this.lineACH++;
    this.isDisableAdd = true;
    this.isEdit = true;
    this.detail.detail.push(new FavoritePaymentsSpreadsheetsResult({
      line: this.lineACH, isEdit: true, operationStatusId: 1, isDeleted: false
    }));
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
        this.isDisableAdd = false;
        this.action.emit(this.detail);
        this.detail.totalamount = 0;
        break;
      case 'delete':
        this.handleLogicalDelete($event.data);
        this.detail.detail.splice(this.index, 1);
        this.detail.totalamount = 0;
        for (let i = 0; i < this.detail.detail.length; i++) {
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
        for (let i = 0; i < this.detail.detail.length; i++) {
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
