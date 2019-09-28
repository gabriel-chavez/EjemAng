import { Component, OnInit, Input } from '@angular/core';
import { PaymentAchService } from '../../../../../Services/mass-payments/payment-ach.service';
import { GlobalService } from '../../../../../Services/shared/global.service';
import { AccountDtoAch } from '../../../../../Services/mass-payments/Models/payment-ach/account-dto-ach';
import { AccountInfoAch } from '../../../../../Services/mass-payments/Models/payment-ach/account-info-ach';



@Component({
  selector: 'app-form-account-client',
  templateUrl: './form-account-client.component.html',
  styleUrls: ['./form-account-client.component.css'],
  providers: [PaymentAchService]
})
export class FormAccountClientComponent implements OnInit {
  @Input() details: AccountInfoAch = new AccountInfoAch();

  constructor(private paymentAchService: PaymentAchService,
    private globalService: GlobalService) { }

  ngOnInit() {
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngOnChanges(accountFormated: AccountDtoAch)  {
    if (this.details.documentType != null) {
      switch (this.details.documentType.trim()) {
        case 'T':
          this.details.documentType = 'NIT';
        break;
        case 'O':
          this.details.documentType = 'OTRO';
        break;
        case 'P':
          this.details.documentType = 'PASAPORTE';
        break;
        case 'Q':
          this.details.documentType = 'C.I.';
        break;
        case 'R':
          this.details.documentType = 'RUC';
        break;
        case 'U':
          this.details.documentType = 'RUN';
        break;
        case 'W':
          this.details.documentType = 'I.D. FISCAL';
        break;
        case 'Y':
          this.details.documentType = 'COD.GEN.BANCO';
        break;
      }
    }
  }
}
