import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { OperationType } from '../../../Services/shared/enums/operation-type';
import { DateFutureModel } from '../../../Services/shared/models/date-future-model';
import { EmailInputModel } from '../../../Services/shared/models/email-input-model';
import { CashPaymentsService } from '../../../Services/mass-payments/cash-payments.service';
import { MassivePaymentsPreviousFormResult } from '../../../Services/mass-payments/Models/massive-payments-previous-form-result';
import { ExchangeRatesService } from '../../../Services/exchange-rates/exchange-rates.service';
import { TicketsService } from '../../../Services/tickets/tickets.service';
import { TicketModel } from '../../../Services/shared/models/ticket-model';
import { TicketDto } from '../../../Services/tickets/models/ticket-dto';
import { GlobalService } from '../../../Services/shared/global.service';
import { CurrencyAndAmount } from '../../../Services/transfers/models/currency-and-amount';
import { DebitForOperationModel } from '../../../Services/shared/models/debit-for-operation-model';
import { MassivePaymentsSpreadsheetsDto } from '../../../Services/mass-payments/Models/massive-payments-spreadsheets-dto';
import { AccountDto } from '../../../Services/accounts/models/account-dto';
import { ApproversAndControllers } from '../../../Services/approvers-and-controllers/models/approvers-and-controllers';
import { UtilsService } from '../../../Services/shared/utils.service';
import { AccountResult } from '../../../Services/balances-and-movements/models/account-result';
import { Roles } from '../../../Services/shared/enums/roles';
import { AccountUse } from '../../../Services/shared/enums/account-use';
import { ProcessBatchResult } from '../../../Services/shared/models/process-batch-result';
import { Router, NavigationEnd } from '@angular/router';
import { CashPaymentData } from '../../../Services/mass-payments/Models/cash-payments/cash-payment-data';
import { CashPaymentDetail } from '../../../Services/mass-payments/Models/cash-payments/cash-payment-detail';
import { TokenCredentials } from '../../../Services/tokens/models/token-credentials';
import { InputApprovers } from '../../../Services/approvers-and-controllers/models/input-approvers';
import { ApproversAndControllersComponent } from '../../shared/components/approvers-and-controllers/approvers-and-controllers.component';

@Component({
  selector: 'app-cash-payments',
  templateUrl: './cash-payments.component.html',
  styleUrls: ['./cash-payments.component.css'],
  providers: [CashPaymentsService, ExchangeRatesService, UtilsService, TicketsService]
})
export class CashPaymentsComponent implements OnInit {
  requestId: MassivePaymentsSpreadsheetsDto = new MassivePaymentsSpreadsheetsDto();
  approversRequest: InputApprovers = new InputApprovers();
  isValid: boolean;
  isVisible: number;
  typeDetailSelected: number;
  response: MassivePaymentsPreviousFormResult;
  cashPaymentData: CashPaymentData = new CashPaymentData();
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
  detail: CashPaymentDetail = new CashPaymentDetail();
  isDisabledFormAccount: boolean;
  isDisabledAfterSave: boolean;
  @ViewChild(ApproversAndControllersComponent) approversComponent: ApproversAndControllersComponent;

  constructor(router: Router, private cashPaymentsService: CashPaymentsService,
    private messageService: GlobalService,
    private utilsService: UtilsService,
    private ticketsService: TicketsService,
    private cdRef: ChangeDetectorRef) {
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
    this.cashPaymentData.amount = 0;
    this.isVisibleAuthandControllers = false;
    router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }
  ngOnInit() {
    this.cashPaymentData.description = '';
    this.approversRequest = {
      operationTypeId: OperationType.pagoProveedoresEfe
    };
    this.sourceAccountDto = new AccountDto({
      accountUse: String.fromCharCode(AccountUse.debit),
      roleId: Roles.initiator,
      operationTypeId: [OperationType.pagoProveedoresEfe],
      types: this.types
    });
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }
  handleObtainedTicket($event: TicketModel) {
    this.cashPaymentData.preferentialExchange = $event.ticket.exchangeRate;
    this.cashPaymentData.indicatorBuyOrSale = $event.ticket.operationType;
    this.cashPaymentData.numberTicket = $event.ticket.ticket;
    this.cashPaymentData.isTicket = $event.isTicketSelected;
  }
  handleCurrencyAndAmountChanged($event: CurrencyAndAmount) {
    this.cashPaymentData.currency = $event.currency;
    this.cashPaymentData.amount = $event.amount;
    if (this.cashPaymentData.amount === 0 || this.cashPaymentData.amount === undefined) {
      this.verifyAmount = false;
    } else {
      this.verifyAmount = true;
      this.isVisibleAuthandControllers = true;
    }
    this.cashPaymentData.fundDestination = $event.fundDestination;
    this.cashPaymentData.fundSource = $event.fundSource;
  }

  handleDateFuture($event: DateFutureModel) {
    this.cashPaymentData.isScheduledProcess = $event.isDateFuture;
    this.cashPaymentData.scheduledProcess = $event.date;
  }

  handleDebitForOperation($event: DebitForOperationModel) {
    this.cashPaymentData.isMultipleDebits = $event.isMultipleDebit;
    this.cashPaymentData.operationNumberDebitHost = '';
  }

  handleDescription($event: string) {
    this.cashPaymentData.description = $event;
  }

  handleEmails($event: EmailInputModel) {
    this.cashPaymentData.sendVouchers = $event.isEmailInputSelected ? $event.emails : '';
  }

  handleFirstVerify(isDescriptionValid: boolean) {
    const isValidCurrency = this.cashPaymentData.currency === undefined ? false : true;
    if (isDescriptionValid && isValidCurrency) {
      this.isDisabled = true;
      this.isDisabledFormAccount = true;
      this.isValid = true;
    } else {
      this.messageService.warning('Error de Validación', !isDescriptionValid ? 'en el campo Descripción' : 'en el campo Moneda');
    }
  }
  getPreviousForm() {
    this.cashPaymentsService
      .getPreviousForm().subscribe((response: MassivePaymentsPreviousFormResult[]) => {
        this.previousForm = response;
      }, (error) => this.messageService.danger('No se pueden obtener los datos de planillas anteriores: ', error));
  }
  handleFile($event: FormData) {
    this.cashPaymentsService.chargeForm($event).subscribe(response => {
      this.detail.detail = response;
      this.typeDetailSelected = 3;
    }, (error) => this.messageService.danger('No se pudo cargar el archivo: ', error));
  }

  handleActionRow($event: any) {
    this.cashPaymentData.speeadsheet = $event.detail;
    if ($event.totalamount !== 0) {
      this.cashPaymentData.amount = $event.totalamount;
      this.verifyAmount = true;
      this.isVisibleAuthandControllers = true;
    } else {
      this.cashPaymentData.amount = $event.totalamount;
      this.verifyAmount = false;
      this.isVisibleAuthandControllers = false;
    }
    const message = `Se actualizó el monto actual es de : ${this.cashPaymentData.amount}
    ${this.cashPaymentData.currency}`;
    this.messageService.success('Actualización:', message);
    for (let i = 0; i < this.cashPaymentData.speeadsheet.length; i++) {
      if (this.cashPaymentData.speeadsheet[i].isEdit) {
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
      operationTypeId: OperationType.pagoProveedoresEfe,
      isAuthorizerControl: $event.isAuthorizerControl,
      accountId: $event.id,
      accountNumber: $event.formattedNumber
    });
    this.sourceAccount = $event;
    this.cashPaymentData.sourceAccount = $event.number;
    this.cashPaymentData.sourceAccountId = $event.id;
  }
  handleApproversOrControllersChanged($event: ApproversAndControllers) {
    this.cashPaymentData.approvers = $event.approvers;
    this.cashPaymentData.controllers = $event.controllers;
    this.cashPaymentData.cismartApprovers = $event.cismartApprovers;
  }
  handleSubmit() {
    this.showToken();
  }

  handleTokenSubmit($event: TokenCredentials) {
    this.cashPaymentData.tokenCode = $event.code;
    this.cashPaymentData.tokenName = $event.name;
    this.savePayment();
  }
  savePayment() {
    this.cashPaymentsService.save(this.cashPaymentData).subscribe(
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
    approversLimitValidation: boolean, sourceAccountValidation:boolean) {
    if (currencyAndAmountValidation && futureDateValidation && ticketValidation && approversAndControllersValidation
      && approversLimitValidation && sourceAccountValidation) {
      if (this.utilsService.validateRows(this.cashPaymentData.speeadsheet)) {
        return this.messageService.danger('Error en la planilla de pagos', 'lo pagos deben ser completos y no deben estar en estado editable');
      }
      if (!this.cashPaymentData.isTicket) {
        this.validateAmounts();
      } else {
        this.validateGMESATicket();
      }
    }
  }
  validateAmounts() {
    if (this.utilsService.validateAmount(this.sourceAccount.currency, this.sourceAccount.availableBalance,
      this.cashPaymentData.currency, this.cashPaymentData.amount)) {
      this.excedeedAmount = true;
    } else {
      this.showToken();
    }
  }
  validateGMESATicket() {
    if (!this.cashPaymentData.isTicket) {
      if (this.utilsService.validateAmount(this.sourceAccount.currency, this.sourceAccount.availableBalance,
        this.cashPaymentData.currency, this.cashPaymentData.amount)) {
        this.excedeedAmount = true;
      } else {
        this.showToken();
      }
    } else {
      this.ticketsService.verifyGMESATicket(new TicketDto({
        destinationCurrency: this.cashPaymentData.currency,
        sourceCurrency: this.sourceAccount.currency,
        number: this.cashPaymentData.numberTicket,
        amount: this.cashPaymentData.amount
      })).subscribe(resp => {
        if (resp.isValid) {
          this.cashPaymentData.preferentialExchange = resp.exchangeRate;
          this.cashPaymentData.indicatorBuyOrSale = resp.operationType;
          this.handleSubmit();
        } else {
          this.messageService.warning('Ticket preferencial incorrecto', resp.errorMessage, true);
        }
      }, error => this.messageService.warning('Servicio Mesa de Dinero', error.message));
    }
  }

  showToken() {
    this.approversComponent.validationCismart()
      .subscribe(res => {
        if (res) {
          this.isVisibleToken = true;
        }
      });
  }

  getAmounts() {
    return this.cashPaymentData.speeadsheet.map(x => +x.amount);
  }
}
