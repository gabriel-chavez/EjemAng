import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ProvidersCheckManagementData } from '../../../../Services/providersCheckManagement/models/providers-check-management-data';
import { ProvidersCheckManagementSpreadsheetsRequest } from '../../../../Services/providersCheckManagement/models/providers-check-management-spreadsheets-request';
import { ProvidersCheckManagementService } from '../../../../Services/providersCheckManagement/providers-check-management.service';
import { GlobalService } from '../../../../Services/shared/global.service';

@Component({
  selector: 'app-providers-check-management-detail',
  templateUrl: './providers-check-management-detail.component.html',
  styleUrls: ['./providers-check-management-detail.component.css'],
  providers: [ProvidersCheckManagementService]
})
export class ProvidersCheckManagementDetailComponent implements OnInit, OnChanges {
  @Input() batchId: number;
  detail: ProvidersCheckManagementData = new ProvidersCheckManagementData();
  payments: ProvidersCheckManagementData = new ProvidersCheckManagementData();

  constructor(private providersCheckManagementService: ProvidersCheckManagementService, private globalService: GlobalService) { }

  ngOnInit() {
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngOnChanges(changes: SimpleChanges): void {
    this.providersCheckManagementService.getDetail(new ProvidersCheckManagementSpreadsheetsRequest({ id: this.batchId }))
      .subscribe(response => {
        this.detail = response;
        this.payments.speeadsheet = this.detail.speeadsheet.slice(0, 3);
      }, error => this.globalService.danger('Proveedores Cheque Gerencia', error.message));
  }

  handlePageChanged($event: number) {
    this.payments.speeadsheet = this.detail.speeadsheet.slice((($event - 1) * 3), 3 * $event);
  }
}
