import { Component, OnInit, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { GlobalService } from '../../../../Services/shared/global.service';
import { MassivePaymentsSpreadsheetsDto } from '../../../../Services/mass-payments/Models/massive-payments-spreadsheets-dto';
import { MassivePaymentsPreviousFormResult } from '../../../../Services/mass-payments/Models/massive-payments-previous-form-result';
import { CashPaymentDetail } from '../../../../Services/mass-payments/Models/cash-payments/cash-payment-detail';

@Component({
  selector: 'app-load-previous-form',
  templateUrl: './load-previous-form.component.html',
  styleUrls: ['./load-previous-form.component.css']
})
export class LoadPreviousFormComponent implements OnInit {
  @Input() previousForm: MassivePaymentsPreviousFormResult;
  requestId: MassivePaymentsSpreadsheetsDto = new MassivePaymentsSpreadsheetsDto;
  id: number;
  isVisible: boolean;
  isVisibleButton: boolean;
  detail: CashPaymentDetail = new CashPaymentDetail();
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
