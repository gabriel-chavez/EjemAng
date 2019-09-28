import { Component, OnInit } from '@angular/core';
import { VouchersCreditsDto } from '../../../Services/credits/models/vouchers-credits-dto';
import { AccountDto } from '../../../Services/accounts/models/account-dto';
import { UtilsService } from '../../../Services/shared/utils.service';
import { CreditsService } from '../../../Services/credits/credits.service';
import { GlobalService } from '../../../Services/shared/global.service';
import { AccountUse } from '../../../Services/shared/enums/account-use';
import { Roles } from '../../../Services/shared/enums/roles';
import { GetPaymentListCreditResult } from '../../../Services/credits/models/get-payment-list-credit-result';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-disbursement-vouchers',
  templateUrl: './disbursement-vouchers.component.html',
  styleUrls: ['./disbursement-vouchers.component.css'],
  providers: [CreditsService, UtilsService]
})
export class DisbursementVouchersComponent implements OnInit {
  sourceAccountDto: AccountDto;
  types: string[] = ['A'];
  currencyAccount: string;
  flagCurrency: string;
  message: string;
  emptyData = false;
  isVisibleModal = false;
  report: Blob;
  request: VouchersCreditsDto = new VouchersCreditsDto();
  response: GetPaymentListCreditResult[] = [];
  responsePerPage: GetPaymentListCreditResult[] = [];
  constructor(private creditsService: CreditsService, private utilsService: UtilsService, private messageService: GlobalService,
    private domSanitizer: DomSanitizer) {
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
    this.creditsService.GetDisbursements(this.request).subscribe(resp => {
      this.response = resp;
      this.emptyData = false;
    }, (error) => {
      this.emptyData = true;
      this.message = 'No se encontraron registros en la cuenta ' +  this.request.accountNumber;
    });
  }

  donwloadDetail($eventDate: string, $eventHour: string) {
    this.request.movementDate = $eventDate;
    this.request.movementHour = $eventHour;
    this.request.typeReport = false;
    this.creditsService.GetDisbursementsHeaderReport(this.request).subscribe(resp => {
      this.utilsService.donwloadReport('Desembolso', resp);
    }, (error) => this.messageService.danger('No se pudo generar el reporte: ', error));
  }

  seeDetail($eventDate: string, $eventHour: string) {
    this.request.movementDate = $eventDate;
    this.request.movementHour = $eventHour;
    this.request.typeReport = false;
    this.creditsService.GetDisbursementsHeaderReport(this.request).subscribe(resp => {
      this.isVisibleModal = true;
      this.report = resp;
      const iframe = document.querySelector('iframe');
      iframe.src = URL.createObjectURL(resp);
    }, (error) => this.messageService.danger('No se pudo generar el reporte: ', error));
  }

  downloadReport() {
    this.utilsService.donwloadReport('Desembolso', this.report);
  }

  handleExportList() {
    this.creditsService.GetDisbursementsListReport(this.request).subscribe(resp => {
      this.utilsService.donwloadReport('ComprobanteDesembolsoDeCredito', resp);
    }, (error) => this.messageService.danger('No se pudo generar el reporte: ', error));
  }

  handlePageChanged($event) {
     this.responsePerPage = this.response.slice((($event - 1) * 10), 10 * $event);
  }

}
