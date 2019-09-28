import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CreditCardsService } from '../../../../Services/credit-cards/credit-cards.service';
import { DomSanitizer } from '@angular/platform-browser';
import { GlobalService } from '../../../../Services/shared/global.service';
import { CreditCardsAccountByIdDto } from '../../../../Services/credit-cards/models/credit-cards-by-id-dto';
import { CreditCardsMovementsDto } from '../../../../Services/credit-cards/models/credit-cards-movements-dto';
import { CreditCardsMovementsResult } from '../../../../Services/credit-cards/models/credit-cards-movements-result';
import { CreditCardsAccountResult } from '../../../../Services/credit-cards/models/credit-cards-account-result';
import { MonthsResult } from '../../../../Services/parameters/models/months-result';

@Component({
  selector: 'app-search-credit-cards-movements-per-month',
  templateUrl: './search-credit-cards-movements-per-month.component.html',
  styleUrls: ['./search-credit-cards-movements-per-month.component.css'],
  providers: [CreditCardsService]
})
export class SearchCreditCardsMovementsPerMonthComponent implements OnInit {
  months: any;
  @Input() request: CreditCardsAccountByIdDto;
  account: any;
  requestmovements: CreditCardsMovementsDto = new CreditCardsMovementsDto();
  totalCredit: number;
  totalDebit: number;
  url: any;
  movements: CreditCardsMovementsResult[] = [];
  show: boolean;
  isVisible: boolean;
  isVisibleComp: boolean;
  file: File;
  exportFile: FileReader;
  numberOfMonths: number;
  monthName: string;
  isVisibleComponents: boolean;
  numberOfRows: number;
  currentPage = 0;
  allSelected = false;
  movementsToControl: CreditCardsMovementsResult[] = [];
  pageItems = 10;
  totalMovements: number;
  constructor(private creditCardsService: CreditCardsService, private domSanitizer: DomSanitizer,
    private messageService: GlobalService) {
      this.numberOfMonths = 4;
      this.isVisibleComponents = false;
      this.numberOfRows = 5;
    }
  ngOnInit() {
    this.creditCardsService
      .getAccountsCreditCardsById(this.request)
      .subscribe((resp: CreditCardsAccountResult) => {
        this.account = resp;
        this.requestmovements.userName = this.account.userName;
        this.requestmovements.currentBalance = this.account.availableBalance;
        this.requestmovements.numberAccount = this.account.accountNumber;
        this.requestmovements.accountCardNumber = this.account.accountNumber;
        this.requestmovements.typeAccountCard = this.account.typeAccount;
        this.requestmovements.estateAccountCard = this.account.estateAccount;
        this.requestmovements.currency = this.account.currency;
        this.requestmovements.availableBalance = this.account.availableBalance;
      }, (error) => this.messageService.danger('Servicio de cuentas no disponible: ', error.message));
  }

  handleGetMonths($event: MonthsResult) {
    this.requestmovements.initialDate = $event.initial;
    this.requestmovements.initialDateSample = $event.initial;
    this.requestmovements.endDate = $event.final;
    this.requestmovements.endDataSample = $event.final;
    this.monthName = $event.description;
    this.isVisibleComponents = true;
  }

  handlePageChanged($event) {
    this.allSelected = false;
    this.movements = this.movementsToControl.slice((($event - 1) * this.pageItems), this.pageItems * $event);
  }

  getMovements() {
    this.creditCardsService.getMovementsCreditCards(this.requestmovements)
      .subscribe((resp: CreditCardsMovementsResult[]) => {
        if (resp.length > 2) {
          this.totalMovements = resp.length;
          this.movementsToControl = resp;
          this.totalDebit = resp[0].totalDebit;
          this.totalCredit = resp[0].totalCredit;
          this.isVisible = true;
          this.isVisibleComp = false;
        } else {
          this.totalDebit = resp[0].totalDebit;
          this.totalCredit = resp[0].totalCredit;
          this.isVisible = false;
          this.isVisibleComp = true;
        }
      }, (error) => this.messageService.danger('Fallo del Servicio: ', error.message));
  }
  getReport() {
    this.creditCardsService.getReportMovements(this.requestmovements)
      .subscribe((resp: Blob) => {
        if (navigator.msSaveBlob) {
          return navigator.msSaveOrOpenBlob(resp, 'Reporte de Tarjetas de Crédito');
      }
        const data = window.URL.createObjectURL(resp);
        const link = document.createElement('a');
        link.href = data;
        link.download = 'Reporte de Tarjetas de Crédito';
        link.click();
      }, (error) => this.messageService.danger('Fallo del Servicio: ', error.message));
  }
  handleChanges() {
    this.isVisible = false;
    this.isVisibleComp = false;
  }
}

