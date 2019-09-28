import { Component, OnInit, ViewChild } from '@angular/core';
import { ProvidersPaymentData } from '../../../Services/mass-payments/Models/providers-payments/providers-payment-data';
import { MassivePaymentsPreviousFormResult } from '../../../Services/mass-payments/Models/massive-payments-previous-form-result';
import { MassivePaymentsSpreadsheetsDto } from '../../../Services/mass-payments/Models/massive-payments-spreadsheets-dto';
import { AccountDto } from '../../../Services/accounts/models/account-dto';
import { TicketDto } from '../../../Services/tickets/models/ticket-dto';
import { AccountResult } from '../../../Services/balances-and-movements/models/account-result';
import { ProvidersPaymentDetail } from '../../../Services/mass-payments/Models/providers-payments/providers-payment-detail';
import { ProvidersPaymentsService } from '../../../Services/mass-payments/providers-payments.service';
import { Router } from '@angular/router';
import { GlobalService } from '../../../Services/shared/global.service';
import { ExchangeRatesService } from '../../../Services/exchange-rates/exchange-rates.service';
import { UtilsService } from '../../../Services/shared/utils.service';
import { TicketsService } from '../../../Services/tickets/tickets.service';
import { OperationType } from '../../../Services/shared/enums/operation-type';
import { AccountUse } from '../../../Services/shared/enums/account-use';
import { Roles } from '../../../Services/shared/enums/roles';
import { TicketModel } from '../../../Services/shared/models/ticket-model';
import { CurrencyAndAmount } from '../../../Services/transfers/models/currency-and-amount';
import { DateFutureModel } from '../../../Services/shared/models/date-future-model';
import { DebitForOperationModel } from '../../../Services/shared/models/debit-for-operation-model';
import { EmailInputModel } from '../../../Services/shared/models/email-input-model';
import { ApproversAndControllers } from '../../../Services/approvers-and-controllers/models/approvers-and-controllers';
import { TokenCredentials } from '../../../Services/tokens/models/token-credentials';
import { ProcessBatchResult } from '../../../Services/shared/models/process-batch-result';
import { InputApprovers } from '../../../Services/approvers-and-controllers/models/input-approvers';
import { ApproversAndControllersComponent } from '../../shared/components/approvers-and-controllers/approvers-and-controllers.component';

@Component({
  selector: 'app-providers-payments',
  templateUrl: './providers-payments.component.html',
  styleUrls: ['./providers-payments.component.css'],
  providers: [ProvidersPaymentsService, ExchangeRatesService, UtilsService, TicketsService]
})
export class ProvidersPaymentsComponent implements OnInit {
  requestId: MassivePaymentsSpreadsheetsDto = new MassivePaymentsSpreadsheetsDto();
  approversRequest: InputApprovers = new InputApprovers();
  isValid: boolean;
  isVisible: number;
  typeDetailSelected: number;
  response: MassivePaymentsPreviousFormResult;
  providersPaymentData: ProvidersPaymentData = new ProvidersPaymentData();
  previousForm: any;
  sourceAccountDto: AccountDto = new AccountDto();
  ticketRequest: TicketDto = new TicketDto();
  isDisabled: boolean;
  verifyAmount: boolean;
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
  detail: ProvidersPaymentDetail = new ProvidersPaymentDetail();
  isDisabledFormAccount: boolean;
  isDisabledAfterSave: boolean;
  @ViewChild(ApproversAndControllersComponent) approversComponent: ApproversAndControllersComponent;

  constructor(router: Router, private providersPaymentsService: ProvidersPaymentsService,
    private messageService: GlobalService,
    private exchangeRatesService: ExchangeRatesService,
    private utilsService: UtilsService,
    private ticketsService: TicketsService) {
    this.isValid = false;
    this.typeDetailSelected = 0;
    this.isDisabledFormAccount = false;
    this.isDisabled = false;
    this.verifyAmount = false;
    this.amounttotal = 0;
    this.isVisibleToken = false;
    this.processBatchNumber = 0;
    this.isRemoveModalVisible = false;
    this.isPaymentSuccessful = false;
    this.isCompVisible = false;
    this.providersPaymentData.amount = 0;
    this.isVisibleAuthandControllers = false;
    router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

  }
  ngOnInit() {
    this.providersPaymentData.description = '';
    this.approversRequest = {
      operationTypeId: OperationType.pagoProveedores
    };
    this.sourceAccountDto = new AccountDto({
      accountUse: String.fromCharCode(AccountUse.debit),
      roleId: Roles.initiator,
      operationTypeId: [OperationType.pagoProveedores],
      types: this.types
    });
  }
  handleObtainedTicket($event: TicketModel) {
    this.providersPaymentData.preferentialExchange = $event.ticket.exchangeRate;
    this.providersPaymentData.indicatorBuyOrSale = $event.ticket.operationType;
    this.providersPaymentData.numberTicket = $event.ticket.ticket;
    this.providersPaymentData.isTicket = $event.isTicketSelected;
  }
  handleCurrencyAndAmountChanged($event: CurrencyAndAmount) {
    this.providersPaymentData.currency = $event.currency;
    this.providersPaymentData.amount = $event.amount;
    if (this.providersPaymentData.amount === 0 || this.providersPaymentData.amount === undefined) {
      this.verifyAmount = false;
    } else {
      this.verifyAmount = true;
      this.isVisibleAuthandControllers = true;
    }
    this.providersPaymentData.fundDestination = $event.fundDestination;
    this.providersPaymentData.fundSource = $event.fundSource;
  }

  handleDateFuture($event: DateFutureModel) {
    this.providersPaymentData.isScheduledProcess = $event.isDateFuture;
    this.providersPaymentData.scheduledProcess = $event.date;
  }

  handleDebitForOperation($event: DebitForOperationModel) {
    this.providersPaymentData.isMultipleDebits = $event.isMultipleDebit;
    this.providersPaymentData.operationNumberDebitHost = '';
  }

  handleDescription($event: string) {
    this.providersPaymentData.description = $event;
  }

  handleEmails($event: EmailInputModel) {
    this.providersPaymentData.sendVouchers = $event.isEmailInputSelected ? $event.emails : '';
  }

  handleFirstVerify(isDescriptionValid: boolean) {
    const isValidCurrency = this.providersPaymentData.currency === undefined ? false : true;
    if (isDescriptionValid && isValidCurrency) {
      this.isDisabled = true;
      this.isDisabledFormAccount = true;
      this.isValid = true;
    } else {
      this.messageService.warning('Error de Validación', !isDescriptionValid ? 'en el campo Descripción' : 'en el campo Moneda');
    }
  }
  getPreviousForm() {
    this.providersPaymentsService
      .getPreviousForm().subscribe((response: MassivePaymentsPreviousFormResult[]) => {
        this.previousForm = response;
      }, (error) => this.messageService.info('Busqueda Inexistente', error));
  }
  handleFile($event: FormData) {
    this.providersPaymentsService.chargeForm($event).subscribe((response: any) => {
      this.detail.detail = response;
      this.typeDetailSelected = 3;
    });
  }

  handleActionRow($event: any) {
    this.providersPaymentData.speeadsheet = $event.detail;
    if ($event.totalamount !== 0) {
      this.providersPaymentData.amount = $event.totalamount;
      this.verifyAmount = true;
      this.isVisibleAuthandControllers = true;
    } else {
      this.providersPaymentData.amount = $event.totalamount;
      this.verifyAmount = false;
      this.isVisibleAuthandControllers = false;
    }
    const message = `Se actualizo el monto actual es de : ${this.providersPaymentData.amount}
    ${this.providersPaymentData.currency}`;
    this.messageService.success('Actualizacion:', message);
    for (let i = 0; i < this.providersPaymentData.speeadsheet.length; i++) {
      if (this.providersPaymentData.speeadsheet[i].isEdit) {
        this.messageService.warning('Advertencia', 'No podra finalizar este proceso, hasta que todos los registros esten correctamente llenados');
        this.verifyAmount = false;
      }
    }
  }
  handleSendId($event) {
    this.requestId.id = $event;
    this.typeDetailSelected = 3;
  }
  handleSourceAccountChanged($event: AccountResult) {
    this.approversRequest = new InputApprovers({
      operationTypeId: OperationType.pagoProveedores,
      isAuthorizerControl: $event.isAuthorizerControl,
      accountId: $event.id,
      accountNumber: $event.formattedNumber
    });
    this.sourceAccount = $event;
    this.providersPaymentData.sourceAccount = $event.number;
    this.providersPaymentData.sourceAccountId = $event.id;
  }
  handleApproversOrControllersChanged($event: ApproversAndControllers) {
    this.providersPaymentData.approvers = $event.approvers;
    this.providersPaymentData.controllers = $event.controllers;
    this.providersPaymentData.cismartApprovers = $event.cismartApprovers;
  }
  handleSubmit() {
    this.showToken();
  }

  handleTokenSubmit($event: TokenCredentials) {
    this.providersPaymentData.tokenCode = $event.code;
    this.providersPaymentData.tokenName = $event.name;
    this.savePayment();
  }
  savePayment() {
    this.providersPaymentsService.save(this.providersPaymentData).subscribe(
      (response: ProcessBatchResult) => {
        this.processBatchNumber = response.processBatchId;
        this.isRemoveModalVisible = true;
        this.isVisibleToken = false;
        this.isPaymentSuccessful = true;
        this.isDisabledAfterSave = true;
      }, (error) => this.messageService.danger('Operación Fallida', error.message));
  }
  handleValidate(currencyAndAmountValidation: boolean,
    futureDateValidation: boolean, ticketValidation: boolean,
    approversAndControllersValidation: boolean,
    approversLimitValidation: boolean, sourceAccountValidation: boolean) {
    if (currencyAndAmountValidation && futureDateValidation && ticketValidation && approversAndControllersValidation
      && approversLimitValidation && sourceAccountValidation) {
      if (this.utilsService.validateRows(this.providersPaymentData.speeadsheet)) {
        return this.messageService.danger('Error en la planilla de pagos', 'lo pagos deben ser completos y no deben estar en estado editable');
      }
      if (!this.providersPaymentData.isTicket) {
        this.validateAmounts();
      } else {
        this.validateGMESATicket();
      }
    }
  }
  validateAmounts() {
    if (this.utilsService.validateAmount(this.sourceAccount.currency, this.sourceAccount.availableBalance,
      this.providersPaymentData.currency, this.providersPaymentData.amount)) {
      this.excedeedAmount = true;
    } else {
      this.showToken();
    }
  }
  validateGMESATicket() {
    if (!this.providersPaymentData.isTicket) {
      if (this.utilsService.validateAmount(this.sourceAccount.currency, this.sourceAccount.availableBalance,
        this.providersPaymentData.currency, this.providersPaymentData.amount)) {
        this.excedeedAmount = true;
      } else {
        this.showToken();
      }
    } else {
      this.ticketsService.verifyGMESATicket(new TicketDto({
        destinationCurrency: this.providersPaymentData.currency,
        sourceCurrency: this.sourceAccount.currency,
        number: this.providersPaymentData.numberTicket,
        amount: this.providersPaymentData.amount
      })).subscribe(resp => {
        if (resp.isValid) {
          this.providersPaymentData.preferentialExchange = resp.exchangeRate;
          this.providersPaymentData.indicatorBuyOrSale = resp.operationType;
          this.handleSubmit();
        } else {
          this.messageService.warning('Ticket preferencial incorrecto', resp.errorMessage, true);
        }
      }, error => this.messageService.warning('Servicio Mesa de Dinero', error.message));
    }
  }

  getAmounts() {
    return this.providersPaymentData.speeadsheet.map(x => +x.amount);
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
