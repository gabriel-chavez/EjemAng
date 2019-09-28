import { Component, OnInit, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { ProvidersDepositInOtherBankCheckService } from '../../../../Services/providersDepositInOtherBankCheck/providers-deposit-in-other-bank-check.service';
import { ProvidersDepositInOtherBankCheckSpreadsheetsDto } from '../../../../Services/providersDepositInOtherBankCheck/models/providers-deposit-in-other-bank-check-spreadsheets-dto';
import { ProvidersDepositInOtherBankCheckSpreadsheetsResult } from '../../../../Services/providersDepositInOtherBankCheck/models/providers-deposit-in-other-bank-check-spreadsheets-result';
import { ProvidersDepositInOtherBankCheckPreviousFormResult } from '../../../../Services/providersDepositInOtherBankCheck/models/providers-deposit-in-other-bank-check-previous-form-result';
import { GlobalService } from '../../../../Services/shared/global.service';
import { ProvidersDepositInOtherBankCheckDetail } from '../../../../Services/providersDepositInOtherBankCheck/models/providers-deposit-in-other-bank-check-detail';

@Component({
  selector: 'app-load-previous-form-providers-deposit-in-other-bank-check',
  templateUrl: './load-previous-form-providers-deposit-in-other-bank-check.component.html',
  styleUrls: ['./load-previous-form-providers-deposit-in-other-bank-check.component.css']
  // providers: [ProvidersDepositInOtherBankCheckService]
})
export class LoadPreviousFormProvidersDepositInOtherBankCheckComponent implements OnInit {
  @Input() previousForm: ProvidersDepositInOtherBankCheckPreviousFormResult;
  requestId: ProvidersDepositInOtherBankCheckSpreadsheetsDto = new ProvidersDepositInOtherBankCheckSpreadsheetsDto;
  id: number;
  isVisible: boolean;
  isVisibleButton: boolean;
  detail: ProvidersDepositInOtherBankCheckDetail = new ProvidersDepositInOtherBankCheckDetail();
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
