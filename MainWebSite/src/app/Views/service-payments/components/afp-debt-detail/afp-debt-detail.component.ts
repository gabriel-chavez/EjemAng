import { Component, OnInit, OnChanges, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { ResponseModelsAfpquery } from '../../../../Services/AFP/Models/response-models-afpquery';
import { GlobalService } from '../../../../Services/shared/global.service';
import { PaymentAFP } from '../../../../Services/AFP/Models/PaymentAFP';
import { DetailAFPDto } from '../../../../Services/AFP/Models/response-models-afpquery';

@Component({
  selector: 'app-afp-debt-detail',
  templateUrl: './afp-debt-detail.component.html',
  styleUrls: ['./afp-debt-detail.component.css']
})
export class AfpDebtDetailComponent implements OnInit, OnChanges {
  
  @Input() ResponseModelsAfp: ResponseModelsAfpquery;
  @Input() disabled: boolean;
  public periodo: string;
  public TCI: Number;
  public numberFeeTCI: Number;
  public TVP: Number;
  public numberFeeTVP: Number;
  public TVL: Number;
  public numberFeeTVL: Number;
  public TSOL: Number;
  public numberFeeTSOL: Number;
  public Total: number;
  public isvisible:boolean;


  constructor(private globalService: GlobalService) {
    this.disabled=false;
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.periodo = this.ResponseModelsAfp.detail.detailDpaymentAFP[0].expirationDate;

    if (this.ResponseModelsAfp.detail.detailDpaymentAFP[0].accountNumberAFP == 1) {
      this.TCI = this.ResponseModelsAfp.detail.detailDpaymentAFP[0].amounts;
      this.numberFeeTCI = 1;

    }
    if (this.ResponseModelsAfp.detail.detailDpaymentAFP[1].accountNumberAFP == 2) {
      this.TVP = this.ResponseModelsAfp.detail.detailDpaymentAFP[1].amounts;
      this.numberFeeTVP = 2;
    }
    if (this.ResponseModelsAfp.detail.detailDpaymentAFP[2].accountNumberAFP == 4) {
      this.TVL = this.ResponseModelsAfp.detail.detailDpaymentAFP[2].amounts;
      this.numberFeeTVL = 4;
      this.isvisible=true;
    }
    else
    {
      if (this.ResponseModelsAfp.detail.detailDpaymentAFP[2].accountNumberAFP == 3) {
      this.TSOL = this.ResponseModelsAfp.detail.detailDpaymentAFP[2].amounts;
      this.numberFeeTSOL = 3;
      this.isvisible=false;
      }
    }
    this.Total = this.ResponseModelsAfp.detail.amountTotal;
  }

}
