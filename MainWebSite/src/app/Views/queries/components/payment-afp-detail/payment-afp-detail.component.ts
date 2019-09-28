import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { PaymentAfpDetailResult } from '../../../../Services/AFP/Models/payment-afp-detail-result';
import { AfpService } from '../../../../Services/AFP/afp.service';
import { PaymentAfpDetailDto } from '../../../../Services/AFP/Models/payment-afp-detail-dto';
import { GlobalService } from '../../../../Services/shared/global.service';

@Component({
  selector: 'app-payment-afp-detail',
  templateUrl: './payment-afp-detail.component.html',
  styleUrls: ['./payment-afp-detail.component.css'],
  providers: [AfpService]
})
export class PaymentAfpDetailComponent implements OnInit, OnChanges {

  @Input() batchId: number;
  detail: PaymentAfpDetailResult = new PaymentAfpDetailResult();
  constructor(private afpService: AfpService, private globalService: GlobalService) { }

  ngOnInit() {
  }

  ngOnChanges(): void {
    const dto: PaymentAfpDetailDto = {
      processBatchId: this.batchId
    };
    this.afpService.getPaymetAfpDetail(dto)
      .subscribe(res => {
        this.detail = res;
      }, error => this.globalService.danger('Pago de AFPs', error));
  }
}
