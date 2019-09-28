import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { TransferAbroadResult } from '../../../../Services/transfers-abroad/models/transfer-abroad-result';
import { TransfersAbroadService } from '../../../../Services/transfers-abroad/transfer-abroad.service';
import { GetTransferAbroadDto } from '../../../../Services/transfers-abroad/models/get-transfer-abroad-dto';
import { GlobalService } from '../../../../Services/shared/global.service';

@Component({
  selector: 'app-transfer-abroad-batch-detail',
  templateUrl: './transfer-abroad-batch-detail.component.html',
  styleUrls: ['./transfer-abroad-batch-detail.component.css'],
  providers: [TransfersAbroadService]
})
export class TransferAbroadBatchDetailComponent implements OnInit, OnChanges {

  @Input() batchId: number;
  isVisibleFormDetail = false;
  transfer: TransferAbroadResult = new TransferAbroadResult();
  constructor(
    private transfersAbroadService: TransfersAbroadService,
    private globalService: GlobalService) { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.isVisibleFormDetail = false;
    this.LoadTransferAbroadResult();
  }

  LoadTransferAbroadResult() {
    const transfer: GetTransferAbroadDto = new GetTransferAbroadDto({ batch: this.batchId });
    this.transfersAbroadService
      .getTransferAbroad(transfer)
      .subscribe((res: TransferAbroadResult) => {
        this.transfer = res;
      }, error => {
        this.globalService.danger('Servicio de Transferencias al Exterior', error.message);
      });
  }

  handleSubmit() {
    this.isVisibleFormDetail = true;
  }

  handleCloseFormDetail() {
    this.isVisibleFormDetail = false;
  }
}
