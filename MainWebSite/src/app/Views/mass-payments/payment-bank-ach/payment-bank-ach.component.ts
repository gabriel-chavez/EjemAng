import { CurrencyAndAmount } from '../../../Services/transfers/models/currency-and-amount';
import { DebitForOperationModel } from '../../../Services/shared/models/debit-for-operation-model';
import { MassivePaymentsPreviousFormResult } from '../../../Services/mass-payments/Models/massive-payments-previous-form-result';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ProcessBatchResult } from '../../../Services/shared/models/process-batch-result';
import { AccountResult } from '../../../Services/balances-and-movements/models/account-result';
import { OperationType } from '../../../Services/shared/enums/operation-type';
import { ApproversAndControllers } from '../../../Services/approvers-and-controllers/models/approvers-and-controllers';
import { EmailInputModel } from '../../../Services/shared/models/email-input-model';
import { DateFutureModel } from '../../../Services/shared/models/date-future-model';
import { TicketModel } from '../../../Services/shared/models/ticket-model';
import { AccountDto } from '../../../Services/accounts/models/account-dto';
import { AccountUse } from '../../../Services/shared/enums/account-use';
import { Roles } from '../../../Services/shared/enums/roles';
import { UtilsService } from '../../../Services/shared/utils.service';
import { ExchangeRatesService } from '../../../Services/exchange-rates/exchange-rates.service';
import { GlobalService } from '../../../Services/shared/global.service';
import { Router } from '@angular/router';
import { PaymentAchService } from '../../../Services/mass-payments/payment-ach.service';
import { PaymentAchData } from '../../../Services/mass-payments/Models/payment-ach/payment-ach-data';
import { TicketDto } from '../../../Services/tickets/models/ticket-dto';
import { MassivePaymentsSpreadsheetsDto } from '../../../Services/mass-payments/Models/massive-payments-spreadsheets-dto';
import { PaymentAchDetail } from '../../../Services/mass-payments/Models/payment-ach/payment-ach-detail';
import { RowPaymentAchComponent } from '../components/payment-bank-ach/row-payment-ach/row-payment-ach.component';
import { TicketsService } from '../../../Services/tickets/tickets.service';
import { TokenCredentials } from '../../../Services/tokens/models/token-credentials';
import { AccountInfoAch } from '../../../Services/mass-payments/Models/payment-ach/account-info-ach';
import { AccountDtoAch } from '../../../Services/mass-payments/Models/payment-ach/account-dto-ach';
import { InputApprovers } from '../../../Services/approvers-and-controllers/models/input-approvers';
import { ApproversAndControllersComponent } from '../../shared/components/approvers-and-controllers/approvers-and-controllers.component';


@Component({
  selector: 'app-payment-bank-ach',
  templateUrl: './payment-bank-ach.component.html',
  styleUrls: ['./payment-bank-ach.component.css'],
  providers: [PaymentAchService, ExchangeRatesService, UtilsService, TicketsService]
})
export class PaymentBankAchComponent implements OnInit {
  requestId: MassivePaymentsSpreadsheetsDto = new MassivePaymentsSpreadsheetsDto();
  approversRequest: InputApprovers = new InputApprovers();
  isValid: boolean;
  isVisible: number;
  typeDetailSelected: number;
  response: MassivePaymentsPreviousFormResult;
  paymentAchData: PaymentAchData = new PaymentAchData();
  previousForm: any;
  sourceAccountDto: AccountDto = new AccountDto();
  ticketRequest: TicketDto = new TicketDto();
  isDisabled: boolean;
  verifyamount: boolean;
  amounttotal: number;
  isVisibleToken: boolean;
  processBatchNumber: number;
  isRemoveModalVisible: boolean;
  isPaymentSuccessful: boolean;
  isCompVisible: boolean;
  sourceAccount: AccountResult;
  saleExchangeRate: number;
  excedeedAmount = false;
  types: string[] = ['P'];
  isVisibleAuthandControllers: boolean;
  isDisabledFormAccount: boolean;
  isDisabledAfterSave: boolean;
  detail: PaymentAchDetail = new PaymentAchDetail();
  isTokenFormDisabled = false;
  infoAccountAch: AccountInfoAch = new AccountInfoAch();
  accountDtoUnique: AccountDtoAch = new AccountDtoAch();
  flagPanel: Boolean;
  @ViewChild(RowPaymentAchComponent) rowPaymentachComponent: RowPaymentAchComponent;
  @ViewChild(ApproversAndControllersComponent) approversComponent: ApproversAndControllersComponent;

  constructor(router: Router, private paymentAchService: PaymentAchService,
    private messageService: GlobalService,
    private utilsService: UtilsService,
    private ticketsService: TicketsService) {
    this.isValid = false;
    this.typeDetailSelected = 0;
    this.isDisabledFormAccount = false;
    this.isDisabled = false;
    this.verifyamount = false;
    this.amounttotal = 0;
    this.isVisibleToken = false;
    this.processBatchNumber = 0;
    this.isRemoveModalVisible = false;
    this.isPaymentSuccessful = false;
    this.isCompVisible = false;
    this.paymentAchData.amount = 0;
    this.isVisibleAuthandControllers = false;

    router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

  }
  ngOnInit() {
    this.paymentAchData.description = '';
    this.approversRequest = {
      operationTypeId: OperationType.pagoProveedoresAch
    };
    this.sourceAccountDto = new AccountDto({
      accountUse: String.fromCharCode(AccountUse.debit),
      roleId: Roles.initiator,
      operationTypeId: [OperationType.pagoProveedoresAch],
      types: this.types
    });
  }
  handleFile($event: FormData) {
    this.paymentAchService.chargeForm($event).subscribe((response: any) => {
      this.detail.detail = response;
      this.typeDetailSelected = 3;
    }, (error) => this.messageService.warning('No se pudo cargar el archivo: ', error));
  }
  handleObtainedTicket($event: TicketModel) {
    this.paymentAchData.preferentialExchange = $event.ticket.exchangeRate;
    this.paymentAchData.indicatorBuyOrSale = $event.ticket.operationType;
    this.paymentAchData.numberTicket = $event.ticket.ticket;
    this.paymentAchData.isTicket = $event.isTicketSelected;
  }
  handleCurrencyAndAmountChanged($event: CurrencyAndAmount) {
    this.paymentAchData.currency = $event.currency;
    this.paymentAchData.fundDestination = $event.fundDestination;
    this.paymentAchData.fundSource = $event.fundSource;
  }

  handleDateFuture($event: DateFutureModel) {
    this.paymentAchData.isScheduledProcess = $event.isDateFuture;
    this.paymentAchData.scheduledProcess = $event.date;
  }

  handleDebitForOperation($event: DebitForOperationModel) {
    this.paymentAchData.isMultipleDebits = $event.isMultipleDebit;
    this.paymentAchData.operationNumberDebitHost = '';
  }

  handleDescription($event: string) {
    this.paymentAchData.description = $event;
  }

  handleEmails($event: EmailInputModel) {
    this.paymentAchData.sendVouchers = $event.isEmailInputSelected ? $event.emails : '';
  }

  handleFirstVerify($event) {
    if (!this.paymentAchData.currency) {
      this.messageService.warning('Error de validación:', 'Debe especificar el tipo de moneda');
      return;
    } else {
      if (this.paymentAchData.description === '') {
        this.messageService.warning('Error de validación:', 'Debe introducir una descripcion');
        return;
      } else {
        this.isDisabled = true;
        this.isDisabledFormAccount = true;
        this.isValid = true;
      }
    }
  }
  getPreviousForm() {
    this.paymentAchService
      .getPreviousForm().subscribe((response: MassivePaymentsPreviousFormResult[]) => {
        this.previousForm = response;
      }, (error) => this.messageService.warning('', error));
  }

  handleActionRow($event: PaymentAchDetail) {
    this.paymentAchData.spreadsheet = $event.detail;
    if ($event.totalamount !== 0) {
      this.paymentAchData.amount = $event.totalamount;
      this.verifyamount = true;
      this.isVisibleAuthandControllers = true;
    } else {
      this.verifyamount = false;
      this.isVisibleAuthandControllers = false;
    }
    this.paymentAchData.amount = $event.totalamount;
    const message = `Se actualizo el monto actual es de : ${this.paymentAchData.amount}
    ${this.paymentAchData.currency}`;
    this.messageService.success('Actualizacion:', message);
  }
  handleSendId($event) {
    this.requestId.id = $event;
    this.typeDetailSelected = 3;
  }

  handleSourceAccountChanged($event: AccountResult) {
    this.approversRequest = new InputApprovers({
      operationTypeId: OperationType.pagoProveedoresAch,
      isAuthorizerControl: $event.isAuthorizerControl,
      accountId: $event.id,
      accountNumber: $event.formattedNumber
    });
    this.sourceAccount = $event;
    this.paymentAchData.sourceAccount = $event.number;
    this.paymentAchData.sourceAccountId = $event.id;
    this.validateAccount($event);
  }

  handleApproversOrControllersChanged($event: ApproversAndControllers) {
    this.paymentAchData.approvers = $event.approvers;
    this.paymentAchData.controllers = $event.controllers;
    this.paymentAchData.cismartApprovers = $event.cismartApprovers;
  }
  handleSubmit() {
    this.showToken();
  }
  handleTokenSubmit($event: TokenCredentials) {
    if ($event) {
      this.paymentAchData.tokenCode = $event.code;
      this.paymentAchData.tokenName = $event.name;
      this.isVisibleToken = false;
      this.savePayment();
    }
  }

  savePayment() {
    this.paymentAchService.save(this.paymentAchData).subscribe(
      (response: ProcessBatchResult) => {
        this.processBatchNumber = response.processBatchId;
        this.isRemoveModalVisible = true;
        this.isVisibleToken = false;
        this.isPaymentSuccessful = true;
        this.isDisabledAfterSave = true;
      }, (error) => this.messageService.warning('Operacion save.', error.message));
  }
  reload() {
    window.location.reload(true);
  }
// && sourceAccountValidation
  handleValidate(currencyAndAmountValidation: boolean,
    futureDateValidation: boolean, ticketValidation: boolean,
    approversAndControllersValidation: boolean, sourceAccountValidation: boolean) {
    if (currencyAndAmountValidation && futureDateValidation && ticketValidation && approversAndControllersValidation && sourceAccountValidation ) {
      if (this.utilsService.validateRows(this.paymentAchData.spreadsheet)) {
        return this.messageService.warning('', 'lo pagos deben ser completos y no deben estar en estado editable');
      }
      if (!this.paymentAchData.isTicket) {
        this.validateAmounts();
      } else {
        this.validateGMESATicket();
      }
    }
  }

  validateAmounts() {
    if (this.utilsService.validateAmount(this.sourceAccount.currency, this.sourceAccount.availableBalance,
      this.paymentAchData.currency, this.paymentAchData.amount)) {
      this.excedeedAmount = true;
    } else {
      this.showToken();
    }
  }

  validateGMESATicket() {
    if (!this.paymentAchData.isTicket) {
      if (this.utilsService.validateAmount(this.sourceAccount.currency, this.sourceAccount.availableBalance,
        this.paymentAchData.currency, this.paymentAchData.amount)) {
        this.excedeedAmount = true;
      } else {
        this.showToken();
      }
    } else {
      this.ticketsService.verifyGMESATicket(new TicketDto({
        destinationCurrency: this.paymentAchData.currency,
        sourceCurrency: this.sourceAccount.currency,
        number: this.paymentAchData.numberTicket,
        amount: this.paymentAchData.amount
      })).subscribe(resp => {
        if (resp.isValid) {
          this.paymentAchData.preferentialExchange = resp.exchangeRate;
          this.paymentAchData.indicatorBuyOrSale = resp.operationType;
          this.handleSubmit();
        } else {
          this.messageService.warning('Ticket preferencial incorrecto, ', resp.errorMessage, true);
        }
      }, error => this.messageService.warning('', error.message));
    }
  }
  validateAccount(accountSelected: AccountResult) {
    this.flagPanel = false;
    this.accountDtoUnique.formattedAccount = accountSelected.formattedNumber;
    if (accountSelected) {
      this.paymentAchService
        .getAccountInfoAch(this.accountDtoUnique).subscribe((response: any) => {
          this.infoAccountAch = response;
          this.flagPanel = true;
        }, (error) => this.messageService.warning('', error.message));
    }
  }

  getAmounts() {
    return this.paymentAchData.spreadsheet.map(x => +x.amount);
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
