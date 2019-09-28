import { Router, NavigationEnd } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { OperationType } from '../../../Services/shared/enums/operation-type';
import { AccountTypes } from '../../../Services/shared/enums/account-types';
import { AccountUse } from '../../../Services/shared/enums/account-use';
import { Constants } from '../../../Services/shared/enums/constants';
import { Roles } from '../../../Services/shared/enums/roles';
import { ApproversAndControllers } from '../../../Services/approvers-and-controllers/models/approvers-and-controllers';
import { AccountResult } from '../../../Services/balances-and-movements/models/account-result';
import { CurrencyAndAmount } from '../../../Services/transfers/models/currency-and-amount';
import { TokenCredentials } from '../../../Services/tokens/models/token-credentials';
import { DateFutureModel } from '../../../Services/shared/models/date-future-model';
import { EmailInputModel } from '../../../Services/shared/models/email-input-model';
import { TransferData } from './../../../Services/transfers/models/transfer-data';
import { AccountDto } from '../../../Services/accounts/models/account-dto';
import { TicketModel } from '../../../Services/shared/models/ticket-model';
import { TicketDto } from '../../../Services/tickets/models/ticket-dto';
import { TransfersService } from '../../../Services/transfers/transfers.service';
import { TicketsService } from '../../../Services/tickets/tickets.service';
import { GlobalService } from '../../../Services/shared/global.service';
import { UtilsService } from '../../../Services/shared/utils.service';
import { InputApprovers } from '../../../Services/approvers-and-controllers/models/input-approvers';
import { ApproversAndControllersComponent } from '../../shared/components/approvers-and-controllers/approvers-and-controllers.component';

@Component({
  selector: 'app-internal-transfers',
  templateUrl: './internal-transfers.component.html',
  styleUrls: ['./internal-transfers.component.css'],
  providers: [TransfersService, UtilsService, TicketsService]
})

export class InternalTransfersComponent implements OnInit {

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
  sourceAccountDto: AccountDto = new AccountDto();
  targetAccountDto: AccountDto = new AccountDto();
  @ViewChild(ApproversAndControllersComponent) approversComponent: ApproversAndControllersComponent;

  constructor(private messageService: GlobalService,
    private transfersService: TransfersService,
    private ticketsService: TicketsService,
    private utilsService: UtilsService, ) {
    this.successfulTransferMessage = Constants.successfulTransferMessage;
  }

  ngOnInit() {
    this.sourceAccountDto = new AccountDto({
      operationTypeId: [OperationType.transferenciasCuentasPropias],
      types: [String.fromCharCode(AccountTypes.passive)],
      accountUse: String.fromCharCode(AccountUse.debit),
      roleId: Roles.initiator
    });
    this.targetAccountDto = new AccountDto({
      accountUse: String.fromCharCode(AccountUse.debit),
      types: [String.fromCharCode(AccountTypes.passive)]
    });
    this.transferData.operationTypeId = OperationType.transferenciasCuentasPropias;
  }

  validateAccounts(): boolean {
    if (this.transferData.sourceAccount === this.transferData.destinationAccount) {
      this.messageService.warning('Cuentas incorrectas', 'Las cuentas de origen y destino deben ser diferentes', true);
      return false;
    }
    return true;
  }

  handleSourceAccountChanged($event: AccountResult) {
    this.approversDto = new InputApprovers({
      accountId: $event.id,
      operationTypeId: OperationType.transferenciasCuentasPropias,
      isAuthorizerControl: $event.isAuthorizerControl,
      accountNumber: $event.formattedNumber
    });
    this.transferData.sourceAccount = $event.number;
    this.transferData.sourceAccountId = $event.id;
    this.transferData.sourceCurrency = $event.currency;
    this.sourceAccount = $event;
  }

  handleDestinationAccountChanged($event: AccountResult) {
    this.transferData.targetAccountCurrency = $event.currency;
    this.transferData.destinationAccount = $event.formattedNumber;
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

  handleApproversOrControllersChanged($event: ApproversAndControllers) {
    this.transferData.controllers = $event.controllers;
    this.transferData.approvers = $event.approvers;
    this.transferData.cismartApprovers = $event.cismartApprovers;
  }

  handleObtainedTicket($event: TicketModel) {
    this.transferData.preferentialExchange = $event.ticket.exchangeRate;
    this.transferData.indicatorBuyOrSale = $event.ticket.operationType;
    this.transferData.numberTicket = $event.ticket.ticket;
    this.transferData.isTicket = $event.isTicketSelected;
  }

  handleTokenSubmit($event: TokenCredentials) {
    this.transferData.tokenCode = $event.code;
    this.transferData.tokenName = $event.name;
    this.saveTransfer();
  }

  handleValidate(currencyAndAmountValidation: boolean,
    futureDateValidation: boolean, ticketValidation: boolean,
    approversAndControllersValidation: boolean,
    approversLimitValidation: boolean, emailValidation: boolean, sourceAccountValidation: boolean) {
    if (currencyAndAmountValidation && futureDateValidation && ticketValidation && approversAndControllersValidation &&
      this.validateAccounts() && approversLimitValidation && emailValidation && sourceAccountValidation) {
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
      .subscribe(response => {
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
    if (this.utilsService.validateAmount(this.sourceAccount.currency, +this.sourceAccount.availableBalance, this.transferData.currency, +this.transferData.amount)) {
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
