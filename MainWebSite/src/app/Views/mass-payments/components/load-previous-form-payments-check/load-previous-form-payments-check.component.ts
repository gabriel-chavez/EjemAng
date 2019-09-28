import { Component, OnInit, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { TaxPaymentCheckService } from '../../../../Services/taxPaymentCheck/tax-payment-check.service';
import { GlobalService } from '../../../../Services/shared/global.service';
import { PaymentTaxCheckDetail } from '../../../../Services/taxPaymentCheck/models/payment-tax-check-detail';
import { PaymentTaxCheckPreviousFormResponse } from '../../../../Services/taxPaymentCheck/models/payment-tax-check-previous-form-response';
import { PaymentTaxCheckSpreadsheetsRequest } from '../../../../Services/taxPaymentCheck/models/payment-tax-check-spreadsheets-request';
import { PaymentTaxCheckSpreadsheetsResponse } from '../../../../Services/taxPaymentCheck/models/payment-tax-check-spreadsheets-response';

@Component({
  selector: 'app-load-previous-form-payments-check',
  templateUrl: './load-previous-form-payments-check.component.html',
  styleUrls: ['./load-previous-form-payments-check.component.css'],
})
export class LoadPreviousFormPaymentsCheckComponent implements OnInit {
  @Input() previousForm: PaymentTaxCheckPreviousFormResponse;
  requestId: PaymentTaxCheckSpreadsheetsRequest = new PaymentTaxCheckSpreadsheetsRequest;
  id: number;
  isVisible: boolean;
  isVisibleButton: boolean;
  detail: PaymentTaxCheckDetail = new PaymentTaxCheckDetail();
  @Output() onEvent= new EventEmitter();
  @Output() action= new EventEmitter();
  constructor(private messageService: GlobalService) {
    this.isVisibleButton = false;
      this.isVisible = false;
  }

  ngOnInit() {
   // tslint:disable-next-line:no-unused-expression
    this.previousForm;
  }
  handleSendId($event) {
    if ($event !== undefined) {
      this.action.emit($event);
    } else {
      this.messageService.info('Ningúna planilla Selecionada:', 'Seleccione una planilla válida');
      return;
    }
  }
}
