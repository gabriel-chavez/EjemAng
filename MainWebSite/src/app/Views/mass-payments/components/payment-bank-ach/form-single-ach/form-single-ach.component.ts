import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PaymentAchService } from '../../../../../Services/mass-payments/payment-ach.service';
import { GlobalService } from '../../../../../Services/shared/global.service';
import { PaymentAchDetail } from '../../../../../Services/mass-payments/Models/payment-ach/payment-ach-detail';
import { MassivePaymentsSpreadsheetsDto } from '../../../../../Services/mass-payments/Models/massive-payments-spreadsheets-dto';
import { PaymentAchSpreadsheetResult } from '../../../../../Services/mass-payments/Models/payment-ach/payment-ach-spreadsheet-result';
import { Constants } from '../../../../../Services/shared/enums/constants';
import { UtilsService } from '../../../../../Services/shared/utils.service';

@Component({
  selector: 'app-form-single-ach',
  templateUrl: './form-single-ach.component.html',
  styleUrls: ['./form-single-ach.component.css'],
  providers: [PaymentAchService, UtilsService]
})
export class FormSingleAchComponent implements OnInit {

  @Input() detail: PaymentAchDetail;
  isDisableAdd: boolean;
  isEdit: boolean;
  index: number;
  @Input() requestId: MassivePaymentsSpreadsheetsDto;
  @Output() action = new EventEmitter();
  @Input() disabled = false;
  constants: Constants = new Constants;
  errorCounter = 0;
  detailPerPage: PaymentAchSpreadsheetResult[] = [];
  constructor(private paymentsService: PaymentAchService,
  private messageService: GlobalService, private utilsService: UtilsService) {
  }

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
    }
  }

  getDetailList() {
    if (this.requestId.id !== undefined) {
      this.paymentsService.getForms(this.requestId)
        .subscribe((response: PaymentAchSpreadsheetResult[]) => {
            this.isEdit = false;
            this.detail.detail = response;
            this.handleDetail(this.detail.detail);
            this.validateAmountZero(this.detail);
        }, (error) => this.messageService.success('Obtención de la planilla, ', error));
    }
  }
  public validateAmountZero($event: any) {
    for (let i = 0; i < $event.detail.length; i++) {
      if ($event.detail[i].amount === 0) {
        $event.detail[i].isEdit = true;
      }
    }
  }
  handleDetail($event) {
    for (let i = 0 ; i < $event.length; i++) {
      this.detail.totalamount += +$event[i].amount;
    }
    this.action.emit(this.detail);
  }
  handlePageChanged($event: number) {
    this.detailPerPage = this.detail.detail.slice((($event - 1) * 10), 10 * $event);
  }
  handleNewRow() {
    this.isDisableAdd = true;
    this.isEdit = true;
    this.detail.detail.push(new PaymentAchSpreadsheetResult({ isEdit: true }));
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
