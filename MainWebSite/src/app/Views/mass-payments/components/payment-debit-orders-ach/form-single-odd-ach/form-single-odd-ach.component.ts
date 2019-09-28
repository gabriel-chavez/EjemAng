import { Component, OnInit, Input, EventEmitter, Output, ChangeDetectorRef } from '@angular/core';
import { PaymentOddAchService } from '../../../../../Services/mass-payments/payment-odd-ach.service';
import { PaymentOddAchDetail } from '../../../../../Services/mass-payments/Models/payment-odd-ach/payment-odd-ach-detail';
import { MassivePaymentsSpreadsheetsDto } from '../../../../../Services/mass-payments/Models/massive-payments-spreadsheets-dto';
import { Constants } from '../../../../../Services/shared/enums/constants';
import { GlobalService } from '../../../../../Services/shared/global.service';
import { PaymentOddAchSpreadsheetResult } from '../../../../../Services/mass-payments/Models/payment-odd-ach/payment-odd-ach-spreadsheet-result';
import { UtilsService } from '../../../../../Services/shared/utils.service';

@Component({
  selector: 'app-form-single-odd-ach',
  templateUrl: './form-single-odd-ach.component.html',
  styleUrls: ['./form-single-odd-ach.component.css'],
  providers: [PaymentOddAchService, UtilsService]
})
export class FormSingleOddAchComponent implements OnInit {

  @Input() detail: PaymentOddAchDetail = new PaymentOddAchDetail();
  isDisableAdd: boolean;
  isEdit: boolean;
  index: number;
  @Input() requestId: MassivePaymentsSpreadsheetsDto;
  @Output() action = new EventEmitter();
  @Input() disabled = false;
  constants: Constants = new Constants;
  errorCounter = 0;
  detailPerPage: PaymentOddAchSpreadsheetResult[] = [];

  constructor(private paymentsService: PaymentOddAchService,
    private messageService: GlobalService, private utilsService: UtilsService) { }

  ngOnInit() {
    if (this.requestId.id === undefined) {
      if (this.detail.detail.length === 0) {
        this.handleNewRow();
      } else {
        this.handleDetail(this.detail.detail);
        this.validateAmountZero(this.detail);
      }
    } else {
      this.getDetailList();
    }
  }

  getDetailList() {
    if (this.requestId.id !== undefined) {
      this.paymentsService.getForms(this.requestId)
        .subscribe((response: PaymentOddAchSpreadsheetResult[]) => {
            this.isEdit = false;
            this.detail.detail = response;
            this.handleDetail(this.detail.detail);
            this.validateAmountZero(this.detail);
        }, (error) => this.messageService.success('Obtención de la planilla', error.message));
    }
  }
  handleDetail($event) {
    for (let i = 0 ; i < $event.length; i++) {
      this.detail.totalamount += +$event[i].amount;
    }
    this.action.emit(this.detail);
  }
  public validateAmountZero($event: any) {
    for (let i = 0; i < $event.detail.length; i++) {
      if ($event.detail[i].amount === 0) {
          $event.detail[i].isEdit = true;
      }
      if ($event.detail[i].businessName === '' || $event.detail[i].businessName == null ) {
          $event.detail[i].isEdit = true;
      }
    }
  }

  handlePageChanged($event: number) {
    this.detailPerPage = this.detail.detail.slice((($event - 1) * 10), 10 * $event);
  }
  handleNewRow() {
    this.isDisableAdd = true;
    this.isEdit = true;
    this.detail.detail.push(new PaymentOddAchSpreadsheetResult({ isEdit: true }));
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
