import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ProvidersCheckManagementService } from '../../../../Services/providersCheckManagement/providers-check-management.service';
import { ProvidersCheckManagementSpreadsheetsRequest} from '../../../../Services/providersCheckManagement/models/providers-check-management-spreadsheets-request';
import { ProvidersCheckManagementSpreadsheetsResponse} from '../../../../Services/providersCheckManagement/models/providers-check-management-spreadsheets-response';
import { ProvidersCheckManagementDetail } from '../../../../Services/providersCheckManagement/models/providers-check-management-detail';
import { GlobalService } from '../../../../Services/shared/global.service';
import { UtilsService } from '../../../../Services/shared/utils.service';

@Component({
  selector: 'app-load-manual-providers-check-management',
  templateUrl: './load-manual-providers-check-management.component.html',
  styleUrls: ['./load-manual-providers-check-management.component.css'],
  providers: [ProvidersCheckManagementService, UtilsService]
})
export class LoadManualProvidersCheckManagementComponent implements OnInit {

  @Input() detail: ProvidersCheckManagementDetail = new ProvidersCheckManagementDetail();
  isDisableAdd: boolean;
  isEdit: boolean;
  index: number;
  detailPerPage: ProvidersCheckManagementSpreadsheetsResponse[] = [];
  @Input() requestId: ProvidersCheckManagementSpreadsheetsRequest;
  @Output() action = new EventEmitter();
  @Input() disabled = false;

  constructor(private ProvidersCheckManagementService: ProvidersCheckManagementService,
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
      this.ProvidersCheckManagementService.getForms(this.requestId)
        .subscribe((response: ProvidersCheckManagementSpreadsheetsResponse[]) => {
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
    this.detail.detail.push(new ProvidersCheckManagementSpreadsheetsResponse({ isEdit: true }));
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
