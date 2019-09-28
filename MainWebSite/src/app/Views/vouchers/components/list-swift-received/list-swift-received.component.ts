import { Component, OnInit, Input } from '@angular/core';
import { OperationReceivedResult } from '../../../../Services/transfers-abroad/models/operation-received-result';
import { TransferAbroadSwiftReportReceivedDto } from '../../../../Services/transfers-abroad/models/transfer-abroad-swift-report-received-dto';
import { TransfersAbroadService } from '../../../../Services/transfers-abroad/transfer-abroad.service';
import { GlobalService } from '../../../../Services/shared/global.service';

@Component({
  selector: 'app-list-swift-received',
  templateUrl: './list-swift-received.component.html',
  styleUrls: ['./list-swift-received.component.css']
})
export class ListSwiftReceivedComponent implements OnInit {

  @Input() received: OperationReceivedResult[];
  @Input() message: string;
  constructor(private transfersAbroadService: TransfersAbroadService,
    private globalService: GlobalService) { }

  ngOnInit() {
  }

  handleGetReport($event: OperationReceivedResult) {
    const request: TransferAbroadSwiftReportReceivedDto = {
      account: $event.beneficiaryClientTwoOfFive,
      clientOrderingOneOfFive: $event.clientOrderingOneOfFive,
      messageId: $event.messageId,
      reference: $event.reference
    };
    this.transfersAbroadService.getReportReceived(request)
      .subscribe((resp: Blob) => {
        if (navigator.msSaveBlob) {
          return navigator.msSaveOrOpenBlob(resp, 'Reporte de Tarjetas de Crédito');
        }
        const data = window.URL.createObjectURL(resp);
        const link = document.createElement('a');
        link.href = data;
        link.download = 'SwiftReceived';
        link.click();
      }, (error) => this.globalService.danger('Fallo del Servicio: ', error.message));
  }
}
