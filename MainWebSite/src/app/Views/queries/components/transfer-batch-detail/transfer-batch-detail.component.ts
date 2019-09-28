import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TransfersService } from '../../../../Services/transfers/transfers.service';
import { TransferDetail } from '../../../../Services/transfers/models/transfer-detail';
import { BatchIdDto } from '../../../../Services/transfers/models/batch-id-dto';
import { GlobalService } from '../../../../Services/shared/global.service';

@Component({
  selector: 'app-transfer-batch-detail',
  templateUrl: './transfer-batch-detail.component.html',
  styleUrls: ['./transfer-batch-detail.component.css'],
  providers: [TransfersService]
})
export class TransferBatchDetailComponent implements OnInit, OnChanges {

  detail: TransferDetail = new TransferDetail();
  @Input() batchId: number;

  constructor(private transfersService: TransfersService, private globalService: GlobalService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.transfersService.getDetail(new BatchIdDto({ batchId: this.batchId }))
      .subscribe(response => this.detail = response, error => this.globalService.danger("Transferencias", error.message));
  }

}
