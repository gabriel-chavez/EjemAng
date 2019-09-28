import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AccountDto } from '../../../Services/accounts/models/account-dto';
import { AccountOwnerResult } from '../../../Services/accounts/models/account-owner-result';
import { ApproversAndControllers } from '../../../Services/approvers-and-controllers/models/approvers-and-controllers';
import { AccountResult } from '../../../Services/balances-and-movements/models/account-result';
import { AccountTypes } from '../../../Services/shared/enums/account-types';
import { AccountUse } from '../../../Services/shared/enums/account-use';
import { Constants } from '../../../Services/shared/enums/constants';
import { OperationType } from '../../../Services/shared/enums/operation-type';
import { Roles } from '../../../Services/shared/enums/roles';
import { GlobalService } from '../../../Services/shared/global.service';
import { DateFutureModel } from '../../../Services/shared/models/date-future-model';
import { EmailInputModel } from '../../../Services/shared/models/email-input-model';
import { SaveFavorite } from '../../../Services/shared/models/save-favorite';
import { TicketModel } from '../../../Services/shared/models/ticket-model';
import { UtilsService } from '../../../Services/shared/utils.service';
import { TicketDto } from '../../../Services/tickets/models/ticket-dto';
import { TicketsService } from '../../../Services/tickets/tickets.service';
import { TokenCredentials } from '../../../Services/tokens/models/token-credentials';
import { CurrencyAndAmount } from '../../../Services/transfers/models/currency-and-amount';
import { FavoriteTransferResponse } from '../../../Services/transfers/models/favorite-transfer-response';
import { TransfersService } from '../../../Services/transfers/transfers.service';
import { TransferData } from './../../../Services/transfers/models/transfer-data';
import { InputApprovers } from '../../../Services/approvers-and-controllers/models/input-approvers';
import { ApproversAndControllersComponent } from '../../shared/components/approvers-and-controllers/approvers-and-controllers.component';

@Component({
  selector: 'app-third-party-transfers',
  templateUrl: './third-party-transfers.component.html',
  styleUrls: ['./third-party-transfers.component.css'],
  providers: [TransfersService, UtilsService, TicketsService]
})

export class ThirdPartyTransfersComponent implements OnInit {
  selectedAccountId: number;
  successfulTransferMessage: string;
  isTransferSuccessful = false;
  isTokenFormDisabled = false;
  isVisibleToken = false;
  excedeedAmount = false;
  isDisabledForm = false;
  processBatchNumber = 0;
  sourceAccount: AccountResult = new AccountResult();
  approversDto: InputApprovers = new InputApprovers();
  transferData: TransferData = new TransferData();
  accountDto: AccountDto = new AccountDto();
  @ViewChild(ApproversAndControllersComponent) approversComponent: ApproversAndControllersComponent;

  constructor(router: Router, private messageService: GlobalService,
    private ticketsService: TicketsService,
    private transfersService: TransfersService,
    private utilsService: UtilsService) {
    this.successfulTransferMessage = Constants.successfulTransferMessage;
    router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }

  ngOnInit() {
    this.accountDto = new AccountDto({
      operationTypeId: [OperationType.transferenciasCuentasTerceros],
      types: [String.fromCharCode(AccountTypes.passive)],
      accountUse: String.fromCharCode(AccountUse.debit),
      roleId: Roles.initiator
    });
    this.transferData.operationTypeId = OperationType.transferenciasCuentasTerceros;
  }

  handleSourceAccountChanged($event) {
    this.approversDto = new InputApprovers({
      operationTypeId: OperationType.transferenciasCuentasTerceros,
      isAuthorizerControl: $event.isAuthorizerControl,
      accountId: $event.id,
      accountNumber: $event.formattedNumber
    });
    this.transferData.sourceAccount = $event.number;
    this.transferData.sourceAccountId = $event.id;
    this.transferData.sourceCurrency = $event.currency;
    this.sourceAccount = $event;
  }

  handleCurrencyAndAmountChanged($event: CurrencyAndAmount) {
    this.transferData.fundDestination = $event.fundDestination;
    this.transferData.fundSource = $event.fundSource;
    this.transferData.currency = $event.currency;
    this.transferData.amount = $event.amount;
  }

  handleDateFuture($event: DateFutureModel) {
    this.transferData.isScheduledProcess = $event.isDateFuture;
    this.transferData.scheduledProcess = $event.date;
  }

  handleEmails($event: EmailInputModel) {
    this.transferData.sendVouchers = $event.isEmailInputSelected ? $event.emails : '';
  }

  handleObtainedTicket($event: TicketModel) {
    this.transferData.preferentialExchange = $event.ticket.exchangeRate;
    this.transferData.indicatorBuyOrSale = $event.ticket.operationType;
    this.transferData.numberTicket = $event.ticket.ticket;
    this.transferData.isTicket = $event.isTicketSelected;
  }

  handleSearchAccountChanged($event: AccountOwnerResult) {
    if ($event.accountNumber !== undefined) {
      this.transferData.destinationAccount = $event.accountNumber;
      this.transferData.targetAccountCurrency = $event.currency;
      this.transferData.beneficiary = $event.owner;
    }
  }

  handleApproversOrControllersChanged($event: ApproversAndControllers) {
    this.transferData.controllers = $event.controllers;
    this.transferData.approvers = $event.approvers;
    this.transferData.cismartApprovers = $event.cismartApprovers;
  }

  handleSaveFavoriteChanged($event: SaveFavorite) {
    this.transferData.isFavorite = $event.isFavorite;
    this.transferData.favoriteName = $event.name;
  }

  handleTokenSubmit($event: TokenCredentials) {
    this.transferData.tokenCode = $event.code;
    this.transferData.tokenName = $event.name;
    this.saveTransfer();
  }

  handleChangedFavoriteTransfer($event: FavoriteTransferResponse) {
    this.transferData.destinationAccount = $event.destinationAccountNumber;
    this.selectedAccountId = $event.sourceAccountId;
    this.transferData.currency = $event.currency;
    this.transferData.amount = $event.amount;
  }

  handleValidate(currencyAndAmountValidation: boolean,
    futureDateValidation: boolean, emailValidation: boolean, ticketValidation: boolean,
    approversAndControllersValidation: boolean, favoritesValidation: boolean,
    approversLimitValidation: boolean, searchAccountsValidation: boolean, sourceAccountValidation: boolean) {
    if (currencyAndAmountValidation && futureDateValidation && ticketValidation && approversAndControllersValidation &&
      favoritesValidation && approversLimitValidation && searchAccountsValidation && sourceAccountValidation && emailValidation) {
      if (!this.transferData.isTicket) {
        this.validateAmounts();
      } else {
        this.validateGMESATicket();
      }
    }
  }

  saveTransfer() {
    this.isTokenFormDisabled = true;
    this.transfersService.save(this.transferData)
      .subscribe((response: any) => {
        this.processBatchNumber = response.processBatchId;
        this.messageService.info('Operación realizada', this.successfulTransferMessage + ' ' + this.processBatchNumber + '.', true);
        this.isDisabledForm = this.isTransferSuccessful = true;
        this.isVisibleToken = this.isTokenFormDisabled = false;
      }, error => {
        this.messageService.danger('Transacción fallida', error);
        this.isTokenFormDisabled = false;
      });
  }

  validateAmounts() {
    if (this.utilsService.validateAmount(this.sourceAccount.currency, this.sourceAccount.availableBalance, this.transferData.currency, this.transferData.amount)) {
      this.excedeedAmount = true;
    } else {
      this.showToken();
    }
  }

  validateGMESATicket() {
    this.ticketsService.verifyGMESATicket(new TicketDto({
      destinationCurrency: this.transferData.currency,
      sourceCurrency: this.sourceAccount.currency,
      number: this.transferData.numberTicket,
      amount: this.transferData.amount
    })).subscribe(resp => {
      if (resp.isValid) {
        this.transferData.preferentialExchange = resp.exchangeRate;
        this.transferData.indicatorBuyOrSale = resp.operationType;
        this.validateAmounts();
      } else {
        this.messageService.warning('Ticket preferencial incorrecto', resp.errorMessage, true);
      }
    }, error => this.messageService.warning('Servicio Mesa de Dinero', error.message));
  }

  showToken() {
    this.approversComponent.validationCismart()
      .subscribe(res => {
        if (res) {
          this.isVisibleToken = true;
        }
      });
  }
}
