import { Component, OnInit, ViewChild } from '@angular/core';
import { MassivePaymentsSpreadsheetsDto } from '../../../Services/mass-payments/Models/massive-payments-spreadsheets-dto';
import { MassivePaymentsPreviousFormResult } from '../../../Services/mass-payments/Models/massive-payments-previous-form-result';
import { AccountDto } from '../../../Services/accounts/models/account-dto';
import { TicketDto } from '../../../Services/tickets/models/ticket-dto';
import { Router } from '@angular/router';
import { GlobalService } from '../../../Services/shared/global.service';
import { ExchangeRatesService } from '../../../Services/exchange-rates/exchange-rates.service';
import { UtilsService } from '../../../Services/shared/utils.service';
import { OperationType } from '../../../Services/shared/enums/operation-type';
import { AccountUse } from '../../../Services/shared/enums/account-use';
import { Roles } from '../../../Services/shared/enums/roles';
import { TicketModel } from '../../../Services/shared/models/ticket-model';
import { CurrencyAndAmount } from '../../../Services/transfers/models/currency-and-amount';
import { DateFutureModel } from '../../../Services/shared/models/date-future-model';
import { DebitForOperationModel } from '../../../Services/shared/models/debit-for-operation-model';
import { EmailInputModel } from '../../../Services/shared/models/email-input-model';
import { ApproversAndControllers } from '../../../Services/approvers-and-controllers/models/approvers-and-controllers';
import { ProcessBatchResult } from '../../../Services/shared/models/process-batch-result';
import { AccountResult } from '../../../Services/balances-and-movements/models/account-result';
import { SalariesPaymentsService } from '../../../Services/mass-payments/salaries-payments.service';
import { SalariesPaymentData } from '../../../Services/mass-payments/Models/salaries-payments/salaries-payment-data';
import { SalariesPaymentDetail } from '../../../Services/mass-payments/Models/salaries-payments/salaries-payment-detail';
import { TicketsService } from '../../../Services/tickets/tickets.service';
import { TokenCredentials } from '../../../Services/tokens/models/token-credentials';
import { InputApprovers } from '../../../Services/approvers-and-controllers/models/input-approvers';
import { ApproversAndControllersComponent } from '../../shared/components/approvers-and-controllers/approvers-and-controllers.component';

@Component({
  selector: 'app-salaries-payments',
  templateUrl: './salaries-payments.component.html',
  styleUrls: ['./salaries-payments.component.css'],
  providers: [SalariesPaymentsService, ExchangeRatesService, UtilsService, TicketsService]
})
export class SalariesPaymentsComponent implements OnInit {
  requestId: MassivePaymentsSpreadsheetsDto = new MassivePaymentsSpreadsheetsDto();
  approversRequest: InputApprovers = new InputApprovers();
  isValid: boolean;
  isVisible: number;
  typeDetailSelected: number;
  response: MassivePaymentsPreviousFormResult;
  salariesPaymentData: SalariesPaymentData = new SalariesPaymentData();
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
  detail: SalariesPaymentDetail = new SalariesPaymentDetail();
  isDisabledFormAccount: boolean;
  isDisabledAfterSave: boolean;
  @ViewChild(ApproversAndControllersComponent) approversComponent: ApproversAndControllersComponent;

  constructor(router: Router, private salariesPaymentsService: SalariesPaymentsService,
    private messageService: GlobalService,
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
    this.salariesPaymentData.amount = 0;
    this.isVisibleAuthandControllers = false;
    router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

  }
  ngOnInit() {
    this.salariesPaymentData.description = '';
    this.sourceAccountDto = new AccountDto({
      accountUse: String.fromCharCode(AccountUse.debit),
      roleId: Roles.initiator,
      operationTypeId: [OperationType.pagoHaberes],
      types: this.types
    });
  }
  handleObtainedTicket($event: TicketModel) {
    this.salariesPaymentData.preferentialExchange = $event.ticket.exchangeRate;
    this.salariesPaymentData.indicatorBuyOrSale = $event.ticket.operationType;
    this.salariesPaymentData.numberTicket = $event.ticket.ticket;
    this.salariesPaymentData.isTicket = $event.isTicketSelected;
  }
  handleCurrencyAndAmountChanged($event: CurrencyAndAmount) {
    this.salariesPaymentData.currency = $event.currency;
    this.salariesPaymentData.amount = $event.amount;
    if (this.salariesPaymentData.amount === 0 || this.salariesPaymentData.amount === undefined) {
      this.verifyAmount = false;
    } else {
      this.verifyAmount = true;
      this.isVisibleAuthandControllers = true;
    }
    this.salariesPaymentData.fundDestination = $event.fundDestination;
    this.salariesPaymentData.fundSource = $event.fundSource;
  }

  handleDateFuture($event: DateFutureModel) {
    this.salariesPaymentData.isScheduledProcess = $event.isDateFuture;
    this.salariesPaymentData.scheduledProcess = $event.date;
  }

  handleDebitForOperation($event: DebitForOperationModel) {
    this.salariesPaymentData.isMultipleDebits = $event.isMultipleDebit;
    this.salariesPaymentData.operationNumberDebitHost = '';
  }

  handleDescription($event: string) {
    this.salariesPaymentData.description = $event;
  }

  handleEmails($event: EmailInputModel) {
    this.salariesPaymentData.sendVouchers = $event.isEmailInputSelected ? $event.emails : '';
  }

  handleFirstVerify(isDescriptionValid: boolean) {
    const isValidCurrency = this.salariesPaymentData.currency === undefined ? false : true;
    if (isDescriptionValid && isValidCurrency) {
      this.isDisabled = true;
      this.isDisabledFormAccount = true;
      this.isValid = true;
    } else {
      this.messageService.warning('Error de Validación', !isDescriptionValid ? 'en el campo Descripción' : 'en el campo Moneda');
    }
  }
  getPreviousForm() {
    this.salariesPaymentsService
      .getPreviousForm().subscribe((response: MassivePaymentsPreviousFormResult[]) => {
        this.previousForm = response;
      }, (error) => this.messageService.info('Busqueda Inexistente', error));
  }

  handleFile($event: FormData) {
    this.salariesPaymentsService.chargeForm($event).subscribe((response: any) => {
      this.detail.detail = response;
      this.typeDetailSelected = 3;
    });
  }

  handleActionRow($event: any) {
    this.salariesPaymentData.speeadsheet = $event.detail;
    if ($event.totalamount !== 0) {
      this.salariesPaymentData.amount = $event.totalamount;
      this.verifyAmount = true;
      this.isVisibleAuthandControllers = true;
    } else {
      this.salariesPaymentData.amount = $event.totalamount;
      this.verifyAmount = false;
      this.isVisibleAuthandControllers = false;
    }
    const message = `Se actualizo el monto actual es de : ${this.salariesPaymentData.amount}
    ${this.salariesPaymentData.currency}`;
    this.messageService.success('Actualizacion:', message);
    if (this.salariesPaymentData.speeadsheet.find(x => x.isEdit)) {
      this.messageService.warning('Advertencia', 'No podra finalizar este proceso, hasta que todos los registros esten correctamente llenados');
      this.verifyAmount = false;
    }
  }
  handleSendId($event) {
    this.requestId.id = $event;
    this.typeDetailSelected = 3;
  }
  handleSourceAccountChanged($event: AccountResult) {
    this.approversRequest = new InputApprovers({
      operationTypeId: OperationType.pagoHaberes,
      isAuthorizerControl: $event.isAuthorizerControl,
      accountId: $event.id,
      accountNumber: $event.formattedNumber
    });
    this.sourceAccount = $event;
    this.salariesPaymentData.sourceAccount = $event.number;
    this.salariesPaymentData.sourceAccountId = $event.id;
  }
  handleApproversOrControllersChanged($event: ApproversAndControllers) {
    this.salariesPaymentData.approvers = $event.approvers;
    this.salariesPaymentData.controllers = $event.controllers;
    this.salariesPaymentData.cismartApprovers = $event.cismartApprovers;
  }
  handleSubmit() {
    this.showToken();
  }

  handleTokenSubmit($event: TokenCredentials) {
    this.salariesPaymentData.tokenCode = $event.code;
    this.salariesPaymentData.tokenName = $event.name;
    this.savePayment();
  }
  savePayment() {
    this.salariesPaymentsService.save(this.salariesPaymentData).subscribe(
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
      if (this.utilsService.validateRows(this.salariesPaymentData.speeadsheet)) {
        return this.messageService.danger('Error en la planilla de pagos', 'lo pagos deben ser completos y no deben estar en estado editable');
      }
      if (!this.salariesPaymentData.isTicket) {
        this.validateAmounts();
      } else {
        this.validateGMESATicket();
      }
    }
  }

  validateAmounts() {
    if (this.utilsService.validateAmount(this.sourceAccount.currency, this.sourceAccount.availableBalance,
      this.salariesPaymentData.currency, this.salariesPaymentData.amount)) {
      this.excedeedAmount = true;
    } else {
      this.showToken();
    }
  }
  validateGMESATicket() {
    if (!this.salariesPaymentData.isTicket) {
      if (this.utilsService.validateAmount(this.sourceAccount.currency, this.sourceAccount.availableBalance,
        this.salariesPaymentData.currency, this.salariesPaymentData.amount)) {
        this.excedeedAmount = true;
      } else {
        this.showToken();
      }
    } else {
      this.ticketsService.verifyGMESATicket(new TicketDto({
        destinationCurrency: this.salariesPaymentData.currency,
        sourceCurrency: this.sourceAccount.currency,
        number: this.salariesPaymentData.numberTicket,
        amount: this.salariesPaymentData.amount
      })).subscribe(resp => {
        if (resp.isValid) {
          this.salariesPaymentData.preferentialExchange = resp.exchangeRate;
          this.salariesPaymentData.indicatorBuyOrSale = resp.operationType;
          this.handleSubmit();
        } else {
          this.messageService.warning('Ticket preferencial incorrecto', resp.errorMessage, true);
        }
      }, error => this.messageService.warning('Servicio Mesa de Dinero', error.message));
    }
  }

  getAmounts() {
    return this.salariesPaymentData.speeadsheet.map(x => +x.amount);
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
