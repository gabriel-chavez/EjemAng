import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { BatchIdDto } from '../../../../Services/service-payments/models/batch-id-dto';
import { ServicePaymentsService } from '../../../../Services/service-payments/service-payments.service';
import { GlobalService } from '../../../../Services/shared/global.service';
import { Constants } from '../../../../Services/shared/enums/constants';

@Component({
  selector: 'app-service-payment-batch-detail',
  templateUrl: './service-payment-batch-detail.component.html',
  styleUrls: ['./service-payment-batch-detail.component.css'],
  providers: [ServicePaymentsService]
})
export class ServicePaymentBatchDetailComponent implements OnInit, OnChanges {

  batch: any;
  constants: Constants = new Constants();
  @Input() batchId: number;
  @Input() service: string;

  constructor(private servicePaymentService: ServicePaymentsService, private globalService: GlobalService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.service !== this.constants.afpService) {
      this.servicePaymentService.getBatchDetail(new BatchIdDto({ processBatchId: this.batchId, service: this.service }))
        .subscribe(response => this.batch = response, error => this.globalService.danger('Pago de servicios', error));
    }
  }

}
