import { Component, OnInit, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { ProvidersCheckManagementService } from '../../../../Services/providersCheckManagement/providers-check-management.service';
import { ProvidersCheckManagementSpreadsheetsRequest} from '../../../../Services/providersCheckManagement/models/providers-check-management-spreadsheets-request';
import { ProvidersCheckManagementSpreadsheetsResponse} from '../../../../Services/providersCheckManagement/models/providers-check-management-spreadsheets-response';
import { ProvidersCheckManagementPreviousFormResponse} from '../../../../Services/providersCheckManagement/models/providers-check-management-previous-form-response';
import { GlobalService } from '../../../../Services/shared/global.service';
import { ProvidersCheckManagementDetail} from '../../../../Services/providersCheckManagement/models/providers-check-management-detail';

@Component({
  selector: 'app-load-previous-form-providers-check-management',
  templateUrl: './load-previous-form-providers-check-management.component.html',
  styleUrls: ['./load-previous-form-providers-check-management.component.css'],
  // providers: [ProvidersCheckManagementService]
})
export class LoadPreviousFormProvidersCheckManagementComponent implements OnInit {
  @Input() previousForm: ProvidersCheckManagementPreviousFormResponse;
  requestId: ProvidersCheckManagementSpreadsheetsRequest = new ProvidersCheckManagementSpreadsheetsRequest;
  id: number;
  isVisible: boolean;
  isVisibleButton: boolean;
  detail: ProvidersCheckManagementDetail = new ProvidersCheckManagementDetail();
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
