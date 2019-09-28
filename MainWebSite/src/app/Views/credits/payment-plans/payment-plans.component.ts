import { Component, OnInit } from '@angular/core';
import { AccountDto } from '../../../Services/accounts/models/account-dto';
import { VouchersCreditsDto } from '../../../Services/credits/models/vouchers-credits-dto';
import { CreditsService } from '../../../Services/credits/credits.service';
import { GlobalService } from '../../../Services/shared/global.service';
import { UtilsService } from '../../../Services/shared/utils.service';
import { AccountUse } from '../../../Services/shared/enums/account-use';
import { Roles } from '../../../Services/shared/enums/roles';

@Component({
  selector: 'app-payment-plans',
  templateUrl: './payment-plans.component.html',
  styleUrls: ['./payment-plans.component.css'],
  providers: [CreditsService, UtilsService]
})
export class PaymentPlansComponent implements OnInit {
  sourceAccountDto: AccountDto;
  types: string[] = ['A'];
  currencyAccount: string;
  flagCurrency: string;
  message: string;
  emptyData = false;
  report: Blob;
  isVisibleModal= false;
  request: VouchersCreditsDto = new VouchersCreditsDto();
  constructor(private creditsService: CreditsService, private utilsService: UtilsService, private messageService: GlobalService) {
    this.request.typeReport = false;
  }

  ngOnInit() {
    this.sourceAccountDto = new AccountDto({
      accountUse: String.fromCharCode(AccountUse.debit),
      roleId: Roles.consultant,
      applicationTypes: ['COL'],
      types: this.types
    });
  }

  handleAccounts($event) {
    this.currencyAccount = $event.currencyDescription;
    this.request.accountNumber = $event.number;
    this.request.currency = $event.currency;
    this.creditsService.GetPaymentPlan(this.request).subscribe(resp => {
      if (resp.size === 0) {
        this.emptyData = true;
        this.message = 'No se encontraron registros en la cuenta ' + this.request.accountNumber;
      } else {
        this.emptyData = false;
        this.report = resp;
      }
    }, (error) => this.messageService.danger('No se pudo generar el reporte: ', error));
  }

  donwloadReport() {
    this.utilsService.donwloadReport('ComprobantePlanPagos' , this.report);
  }

  previewVist() {
    this.isVisibleModal = true;
    const iframe = document.querySelector('iframe');
    iframe.src = URL.createObjectURL(this.report);
  }
}
