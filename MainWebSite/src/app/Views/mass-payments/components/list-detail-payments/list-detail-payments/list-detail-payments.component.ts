import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DetailPayment } from '../../../../../Services/taxPaymentCheck/models/detail-payment';
import { RowListDetailPaymentsComponent } from '../row-list-detail-payments/row-list-detail-payments.component';
import { InformationPaymentTaxCheckResponseModel } from '../../../../../Services/taxPaymentCheck/models/information-payment-tax-check-response-model';
import { PaymentTaxCheckDetail} from '../../../../../Services/taxPaymentCheck/models/payment-tax-check-detail';
import { PaymentTaxCheckSpreadsheetsResponse } from '../../../../../Services/taxPaymentCheck/models/payment-tax-check-spreadsheets-response';
import { PaymentTaxCheckSpreadsheetsRequest } from '../../../../../Services/taxPaymentCheck/models/payment-tax-check-spreadsheets-request';
import {TaxPaymentCheckService} from '../../../../../Services/taxPaymentCheck/tax-payment-check.service';
import {PaymentTaxCheckBasicRequestModel} from '../../../../../Services/taxPaymentCheck/models/payment-tax-check-basic-request-model';
import { PaymentTaxCheckResponse } from '../../../../../Services/taxPaymentCheck/models/payment-tax-check-response';
import { GlobalService } from '../../../../../Services/shared/global.service';
import { UtilsService } from '../../../../../Services/shared/utils.service';

@Component({
  selector: 'app-list-detail-payments',
  templateUrl: './list-detail-payments.component.html',
  styleUrls: ['./list-detail-payments.component.css'],
  providers: [TaxPaymentCheckService, UtilsService]
})
export class ListDetailPaymentsComponent implements OnInit {

  @Input() detail: PaymentTaxCheckDetail = new PaymentTaxCheckDetail();
  isDisableAdd: boolean;
  isEdit: boolean;
  index: number;
  detailPerPage: PaymentTaxCheckSpreadsheetsResponse[] = [];
  @Input() requestId: PaymentTaxCheckSpreadsheetsRequest;
  @Output() action = new EventEmitter();
  @Input() disabled = false;

  constructor(private TaxPaymentCheckService: TaxPaymentCheckService,
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
      this.TaxPaymentCheckService.getForms(this.requestId)
        .subscribe((response: PaymentTaxCheckSpreadsheetsResponse[]) => {
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
    this.detail.detail.push(new PaymentTaxCheckSpreadsheetsResponse({ isEdit: true }));
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
