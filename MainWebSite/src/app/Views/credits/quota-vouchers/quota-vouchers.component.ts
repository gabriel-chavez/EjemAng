import { Component, OnInit } from '@angular/core';
import { AccountDto } from '../../../Services/accounts/models/account-dto';
import { AccountUse } from '../../../Services/shared/enums/account-use';
import { Roles } from '../../../Services/shared/enums/roles';
import { CreditsService } from '../../../Services/credits/credits.service';
import { VouchersCreditsDto } from '../../../Services/credits/models/vouchers-credits-dto';
import { GetPaymentListCreditResult } from '../../../Services/credits/models/get-payment-list-credit-result';
import { UtilsService } from '../../../Services/shared/utils.service';
import { GlobalService } from '../../../Services/shared/global.service';

@Component({
  selector: 'app-quota-vouchers',
  templateUrl: './quota-vouchers.component.html',
  styleUrls: ['./quota-vouchers.component.css'],
  providers: [CreditsService, UtilsService]
})
export class QuotaVouchersComponent implements OnInit {
  sourceAccountDto: AccountDto;
  types: string[] = ['A'];
  currencyAccount: string;
  flagCurrency: string;
  message: string;
  emptyData: boolean;
  response: GetPaymentListCreditResult[] = [];
  responsePerPage: GetPaymentListCreditResult[] = [];
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
    this.creditsService.GetPaymentsListCredit(this.request).subscribe(resp => {
      this.response = resp;
      this.emptyData = false;
    }, (error) => {
      this.emptyData = true;
      this.message = 'No se encontraron registros en la cuenta ' +  this.request.accountNumber;
    });
  }

  getDetail($eventDate: string, $eventHour: string) {
    this.request.movementDate = $eventDate;
    this.request.movementHour = $eventHour;
    this.request.typeReport = false;
    this.creditsService.GetDetailPaymentCreditReport(this.request).subscribe(resp => {
      this.utilsService.donwloadReport('ReporteFacturaOnLine', resp);
    }, (error) => this.messageService.danger('No se pudo generar el reporte: ', error));
  }

  handleExportList() {
    this.creditsService.GetPaymentsListCreditReport(this.request).subscribe(resp => {
      this.utilsService.donwloadReport('ComprobanteCuotas', resp);
    }, (error) => this.messageService.danger('No se pudo generar el reporte: ', error));
  }

  handlePageChanged($event) {
    this.responsePerPage = this.response.slice((($event - 1) * 10), 10 * $event);
  }

}
