import { Component, OnInit, Input } from '@angular/core';
import { TransferAbroadSwiftResult } from '../../../../Services/transfers-abroad/models/transfer-abroad-swift-result';
import { TransfersAbroadService } from '../../../../Services/transfers-abroad/transfer-abroad.service';
import { TransferAbroadSwiftReportDto } from '../../../../Services/transfers-abroad/models/transfer-abroad-swift-report-dto';
import { GlobalService } from '../../../../Services/shared/global.service';

@Component({
  selector: 'app-list-swift-sent',
  templateUrl: './list-swift-sent.component.html',
  styleUrls: ['./list-swift-sent.component.css'],
  providers: [TransfersAbroadService]
})
export class ListSwiftSentComponent implements OnInit {

  @Input() swifts: TransferAbroadSwiftResult[] = [];

  constructor(private transfersAbroadService: TransfersAbroadService, private globalService: GlobalService) { }

  ngOnInit() {
  }

  handleGetReport(detail: TransferAbroadSwiftResult) {
    const dataReport: TransferAbroadSwiftReportDto = new TransferAbroadSwiftReportDto();
    dataReport.processBatchId = detail.processBatchId;
    dataReport.operationNumber = detail.referenceSender;

    this.transfersAbroadService.getReportSender(dataReport)
      .subscribe((resp: Blob) => {
        if (navigator.msSaveBlob) {
          return navigator.msSaveOrOpenBlob(resp, 'Reporte Swift');
        }
        const data = window.URL.createObjectURL(resp);
        const link = document.createElement('a');
        link.href = data;
        link.download = 'Swift';
        link.click();
      }, (error) => this.globalService.danger('Fallo del Servicio: ', error.message));
  }
}
